/**
 * Architecture Page — Worka 2.0 System Design, Kimball Star Schema ERD, and API v2 Reference.
 * Strictly zero emojis. Theme-consistent with dark-gold styling.
 */
function renderArchitecturePage() {
    return `
        <div class="animate-in">
            <h1>System Architecture</h1>
            <p class="page-lead">
                Worka 2.0 is engineered as a modern ELT (Extract-Load-Transform) data pipeline. 
                Raw payloads are immutably preserved in a partitioned landing zone before dbt-core 
                transforms them into Kimball star schema marts, followed by Gemini vector enrichment 
                and FastAPI serving.
            </p>

            <h2>End-to-End System Pipeline</h2>
            <p>
                The following diagram illustrates data progression from multi-source web crawlers 
                through the immutable raw lake, dbt dimensional modeling, AI vector generation, and API serving:
            </p>

            ${renderPipelineFlowSvg()}

            <h2>Kimball Star Schema &amp; ERD</h2>
            <p>
                Worka 2.0 applies Kimball dimensional modeling principles. Ingestion batches are 
                deduplicated in staging views, and downstream marts generate deterministic MD5 surrogate keys 
                (<code>dbt_utils.generate_surrogate_key</code>) to connect the central fact table to conformed dimensions:
            </p>

            ${renderStarSchemaErdSvg()}

            <h3>Table Definitions &amp; Grain</h3>
            <div class="doc-table-wrapper">
                <table class="doc-table">
                    <thead>
                        <tr>
                            <th>Table Name</th>
                            <th>Type</th>
                            <th>Grain</th>
                            <th>Primary / Foreign Keys</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>fact_job_postings</code></td>
                            <td>Fact Mart</td>
                            <td>1 row per active job posting</td>
                            <td>PK: <code>job_pk</code><br>FK: <code>company_id</code><br>FK: <code>location_id</code></td>
                            <td>Central fact table storing core job attributes, source portal, composite SHA256 content hash, raw skills, and active status flag.</td>
                        </tr>
                        <tr>
                            <td><code>dim_companies</code></td>
                            <td>Dimension</td>
                            <td>1 row per unique employer entity</td>
                            <td>PK: <code>company_id</code></td>
                            <td>Conformed dimension for hiring companies, supporting employer concentration analytics and industry classification.</td>
                        </tr>
                        <tr>
                            <td><code>dim_skills</code></td>
                            <td>Dimension</td>
                            <td>1 row per standardized technical skill</td>
                            <td>PK: <code>skill_id</code></td>
                            <td>Tokenized and unnested skill taxonomy dimension (SQL, Python, dbt, Apache Spark, etc.) used for granular demand benchmarking.</td>
                        </tr>
                        <tr>
                            <td><code>dim_locations</code></td>
                            <td>Dimension</td>
                            <td>1 row per geographic location</td>
                            <td>PK: <code>location_id</code></td>
                            <td>Normalized geographic entity with automated work model classification (Remote, Hybrid, On-site).</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2>Core Pipeline Stages</h2>

            <h3>Stage 1 — Multi-Source Ingestion &amp; Self-Healing</h3>
            <p>
                The ingestion layer collects postings across Glints, JobStreet, LinkedIn, Kalibrr, and Talentics. 
                To withstand volatile web markup, the <code>SelfHealingScraperAdapter</code> attempts high-speed 
                deterministic CSS extraction. If front-end DOM drift is detected (0 records extracted), it triggers 
                an AI fallback cascade to Google Gemini Flash (3.7 &gt; 3.6 &gt; 3.5) to parse unstructured job cards. 
                All browser sessions utilize persistent Chrome contexts and 7+ stealth patches to prevent bot detection.
            </p>

            <h3>Stage 2 — Immutable Raw Landing Lake</h3>
            <p>
                Before any data transformation takes place, raw scraped batches land immutably in 
                <code>./data/raw/{source}/{YYYY-MM-DD}/{batch_id}.json</code>. 
                Each job record is assigned a composite SHA256 hash (<code>url|title|company</code>). 
                This design prevents data loss on downstream parser failure and ensures complete idempotency 
                across repeated scraping runs.
            </p>

            <h3>Stage 3 — dbt Core Dimensional Modeling</h3>
            <p>
                The transformation layer is executed by <code>dbt-core</code>:
            </p>
            <ul>
                <li><strong>Staging (<code>stg_job_postings</code>):</strong> Deduplicates incoming raw batches via window functions over <code>scraped_at</code>.</li>
                <li><strong>Marts:</strong> Populates the Kimball star schema (<code>fact_job_postings</code>, <code>dim_companies</code>, <code>dim_skills</code>, <code>dim_locations</code>) with deterministic MD5 surrogate keys.</li>
            </ul>

            <h3>Stage 4 — AI Vector Enrichment</h3>
            <p>
                Cleaned job descriptions are passed to <strong>Gemini Embedding 1</strong> to generate 768-dimensional dense vectors. 
                These embeddings capture latent semantics, contextual relationships, and domain concepts that keyword matching misses.
            </p>

            <h3>Stage 5 — FastAPI Serving &amp; Hybrid CV Matching</h3>
            <p>
                The serving layer exposes high-performance RESTful endpoints for analytics and candidate matching. 
                The hybrid matcher scores candidate CVs against indexed jobs by combining vector cosine similarity (60%) 
                with skill taxonomy Jaccard overlap (40%).
            </p>

            <h2>REST API v2 Endpoint Reference</h2>
            <div class="doc-table-wrapper">
                <table class="doc-table">
                    <thead>
                        <tr>
                            <th>Method</th>
                            <th>Endpoint</th>
                            <th>Parameters</th>
                            <th>Description</th>
                            <th>Response Sample</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>GET</code></td>
                            <td><code>/api/v2/jobs</code></td>
                            <td><code>skill</code>, <code>location</code>, <code>limit</code>, <code>offset</code></td>
                            <td>Retrieve paginated, filtered job postings from the dimensional star schema.</td>
                            <td><code>{"status": "success", "count": 10, "total": 2007, "data": [...]}</code></td>
                        </tr>
                        <tr>
                            <td><code>GET</code></td>
                            <td><code>/api/v2/analytics/skills</code></td>
                            <td>None</td>
                            <td>Retrieve top technical skills ranked by aggregate market demand and salary benchmarks.</td>
                            <td><code>{"status": "success", "top_skills": [{"skill_name": "SQL", "demand_count": 142}, ...]}</code></td>
                        </tr>
                        <tr>
                            <td><code>POST</code></td>
                            <td><code>/api/v2/match-cv</code></td>
                            <td>File upload (PDF or DOCX)</td>
                            <td>Parse candidate resume, extract skills, compute 768-dim embedding, and rank matching jobs.</td>
                            <td><code>{"status": "success", "candidate": {...}, "matches": [{"match_score": 88, ...}]}</code></td>
                        </tr>
                        <tr>
                            <td><code>POST</code></td>
                            <td><code>/api/v2/pipeline/trigger</code></td>
                            <td><code>{"keywords": [...], "max_pages": 1}</code></td>
                            <td>Trigger unified 5-stage master pipeline execution and return structured telemetry.</td>
                            <td><code>{"status": "success", "telemetry": {"jobs_ingested": 45, "status": "SUCCESS"}}</code></td>
                        </tr>
                        <tr>
                            <td><code>GET</code></td>
                            <td><code>/api/jobs</code></td>
                            <td><code>page</code>, <code>page_size</code>, <code>search</code></td>
                            <td>(v1 Legacy) Filtered job listings compatible with older client integrations.</td>
                            <td><code>{"total": 2007, "data": [...]}</code></td>
                        </tr>
                        <tr>
                            <td><code>GET</code></td>
                            <td><code>/api/dashboard</code></td>
                            <td>None</td>
                            <td>(v1 Legacy) Aggregated job role, company type, and employer breakdown.</td>
                            <td><code>{"total_jobs": 2007, "by_classification": {...}}</code></td>
                        </tr>
                        <tr>
                            <td><code>GET</code></td>
                            <td><code>/api/export/csv</code></td>
                            <td>None</td>
                            <td>(v1 Legacy) Stream all indexed job listings as downloadable CSV spreadsheet.</td>
                            <td>CSV file stream</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
