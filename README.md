# Worka 2.0 — Automated Labor Market Data Pipeline & Self-Healing Ingestion Platform

> An enterprise-grade, end-to-end ELT (Extract-Load-Transform) data engineering pipeline and self-healing ingestion platform designed to collect, model, enrich, and serve technical labor market intelligence across Southeast Asia.

---

## Table of Contents

1. [Executive Overview & Strategic Positioning](#1-executive-overview--strategic-positioning)
2. [End-to-End System Architecture](#2-end-to-end-system-architecture)
3. [Star Schema Dimensional Modeling & ERD](#3-star-schema-dimensional-modeling--erd)
4. [Two-Tier Self-Healing Web Ingestion](#4-two-tier-self-healing-web-ingestion)
5. [AI Vector Enrichment & Hybrid CV Matching](#5-ai-vector-enrichment--hybrid-cv-matching)
6. [REST API v2 Endpoint Reference](#6-rest-api-v2-endpoint-reference)
7. [Quickstart & Pipeline Execution](#7-quickstart--pipeline-execution)
8. [Live Interactive Documentation](#8-live-interactive-documentation)

---

## 1. Executive Overview & Strategic Positioning

Job market data across tech portals (Glints, JobStreet, LinkedIn, Kalibrr, Talentics) is fragmented, unstructured, and volatile due to frequent front-end DOM changes, class name hashing, and anti-bot measures. Worka 2.0 addresses these operational challenges with modern Data Engineering and AI automation:

- **Two-Tier Adaptive Self-Healing Ingestion:** High-speed deterministic CSS parsing that seamlessly cascades to Google Gemini Flash models (Gemini Flash 3.7 with fallback to 3.6 and 3.5) whenever front-end class name mutations or DOM drift are detected.
- **Immutable Raw Data Lake:** Every batch is partitioned by source portal and UTC ingestion date, computing a composite SHA256 content hash (`url|title|company`) to guarantee strict idempotency, schema replayability, and zero data loss.
- **Kimball Star Schema Dimensional Modeling:** Implemented in `dbt-core`, transforming raw semi-structured JSON payloads into conformed fact and dimension marts (`fact_job_postings`, `dim_companies`, `dim_skills`, `dim_locations`).
- **Semantic Vector Enrichment & Hybrid CV Matching:** Generates 768-dimensional dense vectors using Gemini Embedding 1 (`text-embedding-004`) to power a calibrated hybrid matching algorithm combining vector cosine similarity (60%) and skill taxonomy Jaccard overlap (40%).
- **Strict $0.00 Operational Budget:** Built to execute completely within free-tier quotas (Google AI Studio free tier for Gemini models, PostgreSQL 16 + pgvector containerized locally, and static GitHub Pages hosting).

---

## 2. End-to-End System Architecture

```mermaid
flowchart TD
    subgraph S1["Stage 1: Multi-Source Ingestion & Self-Healing"]
        P1["Glints / JobStreet / LinkedIn / Kalibrr / Talentics"] --> S_ADAPT["SelfHealingScraperAdapter"]
        S_ADAPT -->|"Fast Path (sub-20ms)"| CSS_PARSE["Deterministic CSS / XPath Parser"]
        S_ADAPT -->|"DOM Drift Detected (0 records)"| AI_CASCADE["Gemini Flash Cascade: 3.7 > 3.6 > 3.5"]
    end

    subgraph S2["Stage 2: Immutable Raw Landing Lake"]
        CSS_PARSE --> HASH["Compute SHA256 Content Hash (url|title|company)"]
        AI_CASCADE --> HASH
        HASH --> LAKE["./data/raw/{source}/{YYYY-MM-DD}/{batch_id}.json"]
    end

    subgraph S3["Stage 3: dbt Core Dimensional Modeling"]
        LAKE --> STG["stg_job_postings (Deduplicated Views via Window Functions)"]
        STG --> DIM_C["dim_companies (MD5 Surrogate Keys)"]
        STG --> DIM_S["dim_skills (Unnested Tokenized Taxonomy)"]
        STG --> DIM_L["dim_locations (Normalized Work Type Tagging)"]
        DIM_C --> FACT["fact_job_postings (Star Schema Fact Mart)"]
        DIM_S --> FACT
        DIM_L --> FACT
    end

    subgraph S4["Stage 4: AI Enrichment & Vector Generation"]
        FACT --> GEM_EMBED["Gemini Embedding 1 (768-dim Dense Vectors)"]
        GEM_EMBED --> EMBED_STORE["Vectorized Job Catalog"]
    end

    subgraph S5["Stage 5: FastAPI Serving & Presentation"]
        EMBED_STORE --> FASTAPI["FastAPI REST API v2"]
        FASTAPI --> EP_JOBS["GET /api/v2/jobs (Paginated & Filtered)"]
        FASTAPI --> EP_ANALYTICS["GET /api/v2/analytics/skills (Aggregations)"]
        FASTAPI --> EP_MATCH["POST /api/v2/match-cv (Hybrid Semantic Matcher)"]
        FASTAPI --> EP_TRIGGER["POST /api/v2/pipeline/trigger (ELT Orchestrator)"]
        FASTAPI --> UI["Vanilla JS SPA Dashboard & Documentation"]
    end
```

---

## 3. Star Schema Dimensional Modeling & ERD

Worka 2.0 adheres to standard Kimball dimensional modeling principles. Staging models deduplicate incoming raw batches via window functions over `scraped_at`, while downstream marts generate deterministic surrogate keys using MD5 hashing (`dbt_utils.generate_surrogate_key`).

### Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    fact_job_postings {
        string job_pk PK "MD5(job_url, scraped_at)"
        string content_hash "SHA256(url|title|company)"
        string company_id FK "MD5(company_name)"
        string location_id FK "MD5(location_name)"
        string job_title "Standardized Role Title"
        string job_url "Canonical Job Posting URL"
        string source_portal "Source Portal (glints, jobstreet, etc.)"
        string raw_skills "Comma-separated Skill Taxonomy"
        timestamp scraped_at "Ingestion Timestamp"
        boolean is_active "Active Posting Flag"
    }

    dim_companies {
        string company_id PK "MD5(company_name)"
        string company_name "Normalized Employer Name"
        timestamp created_at "Record Creation Timestamp"
    }

    dim_skills {
        string skill_id PK "MD5(skill_name)"
        string skill_name "Standardized Skill Name (SQL, Python, dbt, etc.)"
        timestamp created_at "Record Creation Timestamp"
    }

    dim_locations {
        string location_id PK "MD5(location_name)"
        string location_name "Normalized Location String"
        string work_type "Classification: Remote | Hybrid | On-site"
        timestamp created_at "Record Creation Timestamp"
    }

    dim_companies ||--o{ fact_job_postings : "employs"
    dim_locations ||--o{ fact_job_postings : "located_at"
```

### Table Definitions & Grain

| Table Name | Type | Grain | Key Columns | Description |
|---|---|---|---|---|
| `fact_job_postings` | Fact | 1 row per active job posting | `job_pk` (PK), `company_id` (FK), `location_id` (FK) | Central fact table containing core posting metrics, source metadata, raw skill taxonomy, and active status flag. |
| `dim_companies` | Dimension | 1 row per unique employer entity | `company_id` (PK), `company_name` | Conformed dimension for employer entities supporting company hiring volume analysis. |
| `dim_skills` | Dimension | 1 row per standardized skill | `skill_id` (PK), `skill_name` | Normalized skill taxonomy dimension derived via tokenization and unnesting. |
| `dim_locations` | Dimension | 1 row per unique location | `location_id` (PK), `location_name`, `work_type` | Normalized geographic dimension with automated work type tagging (`Remote`, `Hybrid`, `On-site`). |

---

## 4. Two-Tier Self-Healing Web Ingestion

Web scraping for labor market data is notoriously fragile. Worka 2.0 solves parser degradation through an adaptive two-tier pattern:

1. **Tier 1 (Fast-Path Deterministic CSS Parsing):** Pages are initially processed with optimized BeautifulSoup CSS selectors. This executes in under 20 milliseconds per page with zero LLM operational cost.
2. **DOM Drift Detection:** When targeted websites refactor class names or DOM structures, CSS selectors yield 0 records despite valid HTML content.
3. **Tier 2 (Gemini Flash AI Cascade Fallback):** The `SelfHealingScraperAdapter` automatically extracts structured job cards from the raw HTML snippet using a multi-level model cascade:
   - Primary: **Google Gemini Flash 3.7**
   - Secondary: **Google Gemini Flash 3.6**
   - Tertiary: **Google Gemini Flash 3.5**

### Anti-Bot Evasion & Human-in-the-Loop

- **7+ Stealth Patches:** Overrides `navigator.webdriver`, mocks `window.chrome` runtime, intercepts Permissions API queries, fakes `navigator.plugins`, and configures standard browser display dimensions.
- **Persistent Context:** Uses `launch_persistent_context` to retain authentication cookies, session headers, and Cloudflare tokens across scraping sessions.
- **Visible CDP Escalation:** If a login wall or CAPTCHA appears, a visible Chrome window opens and signals the user via a UI modal to complete verification without terminating the pipeline.

---

## 5. AI Vector Enrichment & Hybrid CV Matching

Worka 2.0 bridges candidate resume profiles with indexed job opportunities using a weighted hybrid matching architecture.

### Hybrid Matching Formula

```
MatchScore = (0.60 * CosineSimilarity(V_cv, V_job)) + (0.40 * JaccardSimilarity(S_cv, S_job))
```

- **Vector Cosine Similarity (60% Weight):** Measures semantic alignment between 768-dimensional dense vectors generated by **Gemini Embedding 1** (`text-embedding-004`). Captures contextual experience, seniority nuances, and domain relationships.
- **Skill Taxonomy Jaccard Overlap (40% Weight):** Calculates exact technical overlap: `|S_cv ∩ S_job| / |S_cv ∪ S_job|`. Ensures hard prerequisite skills (e.g. SQL, dbt, Python) are strictly validated.
- **Actionable Diagnostics:** Every match returns a percentage score, an array of `matched_skills`, and an array of `missing_skills` to guide candidate preparation.

---

## 6. REST API v2 Endpoint Reference

The FastAPI backend exposes high-performance RESTful interfaces:

| Method | Endpoint | Query / Body Parameters | Description | Response Payload |
|---|---|---|---|---|
| `GET` | `/api/v2/jobs` | `skill` (opt), `location` (opt), `limit` (int), `offset` (int) | Query dimensional job postings from star schema with filtering and pagination. | `{"status": "success", "count": 10, "total": 2007, "data": [...]}` |
| `GET` | `/api/v2/analytics/skills` | None | Retrieve aggregated top technical skill demands and average salary benchmarks. | `{"status": "success", "top_skills": [{"skill_name": "SQL", "demand_count": 142}, ...]}` |
| `POST` | `/api/v2/match-cv` | File upload (PDF or DOCX multipart) | Parse resume, extract technical skills, generate 768-dim embeddings, and rank matching jobs. | `{"status": "success", "candidate": {...}, "matches": [{"match_score": 88, ...}]}` |
| `POST` | `/api/v2/pipeline/trigger` | `{"keywords": ["data engineer"], "max_pages": 1}` | Trigger unified 5-stage master pipeline runner asynchronously. | `{"status": "success", "telemetry": {"status": "SUCCESS", "jobs_ingested": 45}}` |
| `GET` | `/api/jobs` | `page`, `page_size`, `search` | (v1 Legacy) Paginated job list for backward compatibility. | `{"total": 2007, "data": [...]}` |
| `GET` | `/api/dashboard` | None | (v1 Legacy) Aggregated summary metrics for roles and employers. | `{"total_jobs": 2007, "by_classification": {...}}` |
| `GET` | `/api/export/csv` | None | (v1 Legacy) Stream all indexed records as a downloadable CSV. | `text/csv` stream attachment |

---

## 7. Quickstart & Pipeline Execution

### Prerequisites

- Python 3.9+
- Docker & Docker Compose
- Google Chrome browser
- Google Gemini API Key

### Step 1: Clone Repository & Set Up Environment

```bash
git clone https://github.com/farhanrenardi/worka-jobmapper_and_scraper.git
cd worka-jobmapper_and_scraper

python3 -m venv venv
source venv/bin/activate

pip install -r backend/requirements.txt
playwright install
```

### Step 2: Configure Environment Variables

Create `.env` in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/jobmapper
RAW_DATA_DIR=./data/raw
DBT_PROJECT_DIR=./dbt_worka
HOST=0.0.0.0
PORT=8000
```

### Step 3: Start Services via 1-Command Runner

```bash
chmod +x start stop
./start
```

The runner spins up the PostgreSQL 16 container, initializes schemas, and starts the FastAPI backend server.

### Step 4: Run the Master ELT Pipeline

```bash
python backend/pipeline_runner.py --keywords "data engineer" "data scientist" --pages 1
```

### Step 5: Graceful Shutdown

```bash
./stop
```

---

## 8. Live Interactive Documentation

The full documentation and interactive demonstration dashboard can be viewed live on GitHub Pages:

- **Live Documentation & Demo:** [https://farhanrenardi.github.io/-worka-jobmapper_and_scraper/](https://farhanrenardi.github.io/-worka-jobmapper_and_scraper/)
- **Main Codebase Repository:** [https://github.com/farhanrenardi/worka-jobmapper_and_scraper](https://github.com/farhanrenardi/worka-jobmapper_and_scraper)
