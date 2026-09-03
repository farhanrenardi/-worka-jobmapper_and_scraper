/**
 * Overview Page — Worka 2.0 Strategic Positioning, Motivation, and Architecture Flow.
 * Strictly zero emojis. Theme-consistent with dark-gold styling.
 */
function renderOverviewPage() {
    return `
        <div class="animate-in">
            <h1>Worka 2.0 — Automated Labor Market Data Pipeline</h1>
            <p class="page-lead">
                An enterprise-grade, end-to-end ELT (Extract-Load-Transform) data engineering pipeline 
                and self-healing ingestion platform designed to collect, model, enrich, and serve 
                technical labor market intelligence across Southeast Asia.
            </p>

            <div class="card-grid stagger">
                <div class="stat-card animate-in">
                    <div class="stat-number">2,007</div>
                    <div class="stat-label">Indexed Job Records</div>
                </div>
                <div class="stat-card animate-in">
                    <div class="stat-number">768</div>
                    <div class="stat-label">Vector Dimensions</div>
                </div>
                <div class="stat-card animate-in">
                    <div class="stat-number">4 Marts</div>
                    <div class="stat-label">Kimball Star Schema</div>
                </div>
                <div class="stat-card animate-in">
                    <div class="stat-number">&lt; 5 Min</div>
                    <div class="stat-label">End-to-End Pipeline</div>
                </div>
            </div>

            <h2>Background &amp; Motivation</h2>
            <p>
                Labor market data across major tech portals (Glints, JobStreet, LinkedIn, Kalibrr, Talentics) 
                is fragmented, unstructured, and volatile. Scraping scripts frequently fail due to front-end DOM changes, 
                dynamic class name hashing, and anti-bot measures. Moreover, raw web scrape data lacks formal 
                dimensional modeling, making quantitative career planning and skill benchmarking unreliable.
            </p>

            <div class="callout callout-gold">
                <div class="callout-title"><i data-lucide="help-circle" class="callout-icon"></i> The Strategic Problem</div>
                <p>
                    <strong>"How can data professionals and job seekers accurately track verified technical skill demands, 
                    market compensation benchmarks, and semantic role fits without manual data collection?"</strong>
                </p>
                <p>
                    Worka 2.0 answers this quantitatively by automating the full data lifecycle: from two-tier self-healing 
                    crawling to Kimball star schema data transformation and vector-assisted semantic candidate matching.
                </p>
            </div>

            <h2>End-to-End System Pipeline Flow</h2>
            <p>
                Worka 2.0 replaces ad-hoc scraping scripts with a structured 5-stage ELT architecture:
            </p>

            ${renderPipelineFlowSvg()}

            <h2>Core Capabilities</h2>
            <div class="card-grid">
                <div class="doc-card">
                    <h3><i data-lucide="shield-alert" class="inline-icon"></i> Two-Tier Self-Healing Ingestion</h3>
                    <p>High-speed deterministic CSS parsing that automatically cascades to Google Gemini Flash models (3.7 &gt; 3.6 &gt; 3.5) whenever front-end class name mutations or DOM drift are detected.</p>
                </div>
                <div class="doc-card">
                    <h3><i data-lucide="database" class="inline-icon"></i> Immutable Raw Data Lake</h3>
                    <p>Every batch lands immutably partitioned by source portal and UTC ingestion date. A composite SHA256 hash (<code>url|title|company</code>) guarantees strict idempotency and zero data loss.</p>
                </div>
                <div class="doc-card">
                    <h3><i data-lucide="layers" class="inline-icon"></i> Kimball Star Schema via dbt Core</h3>
                    <p>Transforms raw payloads into an enterprise star schema consisting of central fact postings (<code>fact_job_postings</code>) and conformed dimensions (<code>dim_companies</code>, <code>dim_skills</code>, <code>dim_locations</code>).</p>
                </div>
                <div class="doc-card">
                    <h3><i data-lucide="cpu" class="inline-icon"></i> Hybrid Semantic CV Matching</h3>
                    <p>Computes 768-dimensional embeddings via Gemini Embedding 1 to power a weighted hybrid ranking algorithm: 60% vector cosine similarity and 40% skill taxonomy Jaccard overlap.</p>
                </div>
                <div class="doc-card">
                    <h3><i data-lucide="user-check" class="inline-icon"></i> Human-in-the-Loop Stealth Session</h3>
                    <p>Browser automation maintains persistent Chrome context with 7+ anti-bot patches. If a login wall or CAPTCHA appears, a visible CDP session triggers a UI prompt allowing manual intervention.</p>
                </div>
                <div class="doc-card">
                    <h3><i data-lucide="zap" class="inline-icon"></i> High-Throughput FastAPI Serving</h3>
                    <p>Exposes REST API v2 endpoints for dimensional job queries, skill aggregations, and on-demand CV resume parsing served to this zero-build Vanilla JS single-page interface.</p>
                </div>
            </div>

            <h2>Documentation Navigation</h2>
            <p>Explore the following deep-dive sections:</p>
            <ul>
                <li><strong>Architecture</strong> — Full ELT pipeline, Kimball star schema ERD, and REST API v2 specification</li>
                <li><strong>Scraping Engine</strong> — Two-tier self-healing logic, anti-bot stealth patches, and CDP sessions</li>
                <li><strong>AI Pipeline</strong> — Gemini Flash cascade (3.7 &gt; 3.6 &gt; 3.5), Gemini Embedding 1, and hybrid matching</li>
                <li><strong>Manual vs Worka</strong> — Quantitative benchmarking of manual job hunting vs automated pipeline</li>
                <li><strong>Interactive Demo</strong> — Live client-side exploration of 2,007 indexed job postings</li>
                <li><strong>Technology Stack</strong> — Complete technical specifications and environment configuration</li>
            </ul>
        </div>
    `;
}
