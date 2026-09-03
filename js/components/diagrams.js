/**
 * Shared SVG Diagram Components for Worka Documentation
 * Theme-consistent (Dark Gray + Muted Gold Accent, Zero Emojis)
 */

function renderPipelineFlowSvg() {
    return `
    <div class="diagram-wrapper" style="margin: var(--space-xl) 0; overflow-x: auto; background: var(--bg-surface); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: var(--space-lg);">
        <svg viewBox="0 0 920 380" width="100%" height="100%" style="min-width: 760px; font-family: var(--font-body);" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#C9A84C" />
                    <stop offset="100%" stop-color="#8a7230" />
                </linearGradient>
                <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#B8973A" />
                </marker>
                <marker id="arrowSubtle" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#6b6b6b" />
                </marker>
            </defs>

            <!-- Stage 1: Multi-Source Ingestion -->
            <g transform="translate(20, 20)">
                <rect width="160" height="340" rx="8" fill="#1e1e1e" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
                <rect width="160" height="36" rx="8" fill="#242424" />
                <text x="80" y="24" text-anchor="middle" fill="#C9A84C" font-size="12" font-weight="600" letter-spacing="0.5">STAGE 1: INGESTION</text>
                
                <!-- Sub-items -->
                <g transform="translate(12, 50)">
                    <rect width="136" height="52" rx="6" fill="#2a2a2a" stroke="rgba(255,255,255,0.06)" />
                    <text x="68" y="22" text-anchor="middle" fill="#f0f0f0" font-size="12" font-weight="500">Multi-Portal Scrapers</text>
                    <text x="68" y="38" text-anchor="middle" fill="#9a9a9a" font-size="10">Glints / JobStreet / LinkedIn</text>
                </g>
                <g transform="translate(12, 115)">
                    <rect width="136" height="60" rx="6" fill="#2a2a2a" stroke="rgba(184,151,58,0.3)" />
                    <text x="68" y="22" text-anchor="middle" fill="#C9A84C" font-size="12" font-weight="500">Self-Healing Adapter</text>
                    <text x="68" y="38" text-anchor="middle" fill="#9a9a9a" font-size="10">Fast CSS Selector</text>
                    <text x="68" y="50" text-anchor="middle" fill="#5bb8ce" font-size="9">Gemini Flash Fallback</text>
                </g>
                <g transform="translate(12, 190)">
                    <rect width="136" height="55" rx="6" fill="#2a2a2a" stroke="rgba(255,255,255,0.06)" />
                    <text x="68" y="22" text-anchor="middle" fill="#f0f0f0" font-size="12" font-weight="500">Stealth Engine</text>
                    <text x="68" y="38" text-anchor="middle" fill="#9a9a9a" font-size="10">Playwright Persistent</text>
                    <text x="68" y="48" text-anchor="middle" fill="#9a9a9a" font-size="9">7+ Browser Patches</text>
                </g>
                <g transform="translate(12, 260)">
                    <rect width="136" height="65" rx="6" fill="#2a2a2a" stroke="rgba(255,255,255,0.06)" />
                    <text x="68" y="22" text-anchor="middle" fill="#f0f0f0" font-size="12" font-weight="500">Human-in-the-Loop</text>
                    <text x="68" y="38" text-anchor="middle" fill="#9a9a9a" font-size="10">Visible CDP Pop-up</text>
                    <text x="68" y="50" text-anchor="middle" fill="#9a9a9a" font-size="9">Login / CAPTCHA Solver</text>
                </g>
            </g>

            <!-- Connector 1 -> 2 -->
            <line x1="180" y1="145" x2="208" y2="145" stroke="#B8973A" stroke-width="2" marker-end="url(#arrow)" />

            <!-- Stage 2: Raw Landing Lake -->
            <g transform="translate(210, 20)">
                <rect width="150" height="340" rx="8" fill="#1e1e1e" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
                <rect width="150" height="36" rx="8" fill="#242424" />
                <text x="75" y="24" text-anchor="middle" fill="#C9A84C" font-size="12" font-weight="600" letter-spacing="0.5">STAGE 2: RAW LAKE</text>

                <g transform="translate(12, 60)">
                    <rect width="126" height="70" rx="6" fill="#2a2a2a" stroke="rgba(255,255,255,0.06)" />
                    <text x="63" y="22" text-anchor="middle" fill="#f0f0f0" font-size="12" font-weight="500">SHA256 Hash</text>
                    <text x="63" y="40" text-anchor="middle" fill="#9a9a9a" font-size="10">url | title | company</text>
                    <text x="63" y="55" text-anchor="middle" fill="#5fba8a" font-size="9">Idempotency Guard</text>
                </g>

                <g transform="translate(12, 155)">
                    <rect width="126" height="90" rx="6" fill="#2a2a2a" stroke="rgba(184,151,58,0.3)" />
                    <text x="63" y="22" text-anchor="middle" fill="#C9A84C" font-size="12" font-weight="500">Immutable Storage</text>
                    <text x="63" y="42" text-anchor="middle" fill="#9a9a9a" font-size="10">Partitioned by Source</text>
                    <text x="63" y="58" text-anchor="middle" fill="#9a9a9a" font-size="10">&amp; UTC Ingestion Date</text>
                    <text x="63" y="76" text-anchor="middle" fill="#9b87d4" font-size="9">JSON Batches</text>
                </g>
                <text x="75" y="295" text-anchor="middle" fill="#5a5a5a" font-size="10" font-style="italic">Replayable Raw Data</text>
            </g>

            <!-- Connector 2 -> 3 -->
            <line x1="360" y1="180" x2="388" y2="180" stroke="#B8973A" stroke-width="2" marker-end="url(#arrow)" />

            <!-- Stage 3: dbt Dimensional Modeling -->
            <g transform="translate(390, 20)">
                <rect width="160" height="340" rx="8" fill="#1e1e1e" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
                <rect width="160" height="36" rx="8" fill="#242424" />
                <text x="80" y="24" text-anchor="middle" fill="#C9A84C" font-size="12" font-weight="600" letter-spacing="0.5">STAGE 3: DBT CORE</text>

                <g transform="translate(12, 50)">
                    <rect width="136" height="45" rx="6" fill="#2a2a2a" stroke="rgba(255,255,255,0.06)" />
                    <text x="68" y="20" text-anchor="middle" fill="#f0f0f0" font-size="11" font-weight="500">stg_job_postings</text>
                    <text x="68" y="34" text-anchor="middle" fill="#9a9a9a" font-size="9">Deduplicated View</text>
                </g>

                <g transform="translate(12, 105)">
                    <rect width="136" height="130" rx="6" fill="#2a2a2a" stroke="rgba(184,151,58,0.3)" />
                    <text x="68" y="20" text-anchor="middle" fill="#C9A84C" font-size="12" font-weight="600">Kimball Star Schema</text>
                    
                    <rect x="8" y="30" width="120" height="24" rx="4" fill="#1e1e1e" />
                    <text x="68" y="46" text-anchor="middle" fill="#e8e8e8" font-size="10">fact_job_postings</text>
                    
                    <rect x="8" y="58" width="120" height="20" rx="4" fill="#242424" />
                    <text x="68" y="72" text-anchor="middle" fill="#9a9a9a" font-size="9">dim_companies</text>

                    <rect x="8" y="81" width="120" height="20" rx="4" fill="#242424" />
                    <text x="68" y="95" text-anchor="middle" fill="#9a9a9a" font-size="9">dim_skills</text>

                    <rect x="8" y="104" width="120" height="20" rx="4" fill="#242424" />
                    <text x="68" y="118" text-anchor="middle" fill="#9a9a9a" font-size="9">dim_locations</text>
                </g>

                <g transform="translate(12, 250)">
                    <rect width="136" height="50" rx="6" fill="#2a2a2a" stroke="rgba(255,255,255,0.06)" />
                    <text x="68" y="20" text-anchor="middle" fill="#f0f0f0" font-size="11" font-weight="500">Deterministic Keys</text>
                    <text x="68" y="36" text-anchor="middle" fill="#9a9a9a" font-size="9">Surrogate MD5 Hashes</text>
                </g>
            </g>

            <!-- Connector 3 -> 4 -->
            <line x1="550" y1="180" x2="578" y2="180" stroke="#B8973A" stroke-width="2" marker-end="url(#arrow)" />

            <!-- Stage 4: AI Vector Enrichment -->
            <g transform="translate(580, 20)">
                <rect width="150" height="340" rx="8" fill="#1e1e1e" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
                <rect width="150" height="36" rx="8" fill="#242424" />
                <text x="75" y="24" text-anchor="middle" fill="#C9A84C" font-size="12" font-weight="600" letter-spacing="0.5">STAGE 4: AI ENRICH</text>

                <g transform="translate(12, 55)">
                    <rect width="126" height="75" rx="6" fill="#2a2a2a" stroke="rgba(184,151,58,0.3)" />
                    <text x="63" y="22" text-anchor="middle" fill="#C9A84C" font-size="12" font-weight="500">Gemini Flash</text>
                    <text x="63" y="40" text-anchor="middle" fill="#9a9a9a" font-size="10">Primary: 3.7</text>
                    <text x="63" y="55" text-anchor="middle" fill="#9a9a9a" font-size="9">Fallback: 3.6 &gt; 3.5</text>
                    <text x="63" y="68" text-anchor="middle" fill="#5bb8ce" font-size="9">Role &amp; Co. Classify</text>
                </g>

                <g transform="translate(12, 150)">
                    <rect width="126" height="75" rx="6" fill="#2a2a2a" stroke="rgba(184,151,58,0.3)" />
                    <text x="63" y="22" text-anchor="middle" fill="#C9A84C" font-size="12" font-weight="500">Gemini Embedding 1</text>
                    <text x="63" y="40" text-anchor="middle" fill="#9a9a9a" font-size="10">text-embedding</text>
                    <text x="63" y="55" text-anchor="middle" fill="#5fba8a" font-size="9">768-Dim Dense Vectors</text>
                    <text x="63" y="68" text-anchor="middle" fill="#9a9a9a" font-size="9">Semantics Extraction</text>
                </g>

                <g transform="translate(12, 245)">
                    <rect width="126" height="55" rx="6" fill="#2a2a2a" stroke="rgba(255,255,255,0.06)" />
                    <text x="63" y="22" text-anchor="middle" fill="#f0f0f0" font-size="11" font-weight="500">Vector Catalog</text>
                    <text x="63" y="38" text-anchor="middle" fill="#9a9a9a" font-size="9">Pre-computed Index</text>
                </g>
            </g>

            <!-- Connector 4 -> 5 -->
            <line x1="730" y1="180" x2="758" y2="180" stroke="#B8973A" stroke-width="2" marker-end="url(#arrow)" />

            <!-- Stage 5: FastAPI Serving -->
            <g transform="translate(760, 20)">
                <rect width="140" height="340" rx="8" fill="#1e1e1e" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
                <rect width="140" height="36" rx="8" fill="#242424" />
                <text x="70" y="24" text-anchor="middle" fill="#C9A84C" font-size="12" font-weight="600" letter-spacing="0.5">STAGE 5: SERVING</text>

                <g transform="translate(10, 50)">
                    <rect width="120" height="48" rx="6" fill="#2a2a2a" stroke="rgba(255,255,255,0.06)" />
                    <text x="60" y="20" text-anchor="middle" fill="#f0f0f0" font-size="11" font-weight="500">FastAPI REST v2</text>
                    <text x="60" y="35" text-anchor="middle" fill="#9a9a9a" font-size="9">High-throughput API</text>
                </g>

                <g transform="translate(10, 108)">
                    <rect width="120" height="65" rx="6" fill="#2a2a2a" stroke="rgba(184,151,58,0.3)" />
                    <text x="60" y="20" text-anchor="middle" fill="#C9A84C" font-size="11" font-weight="500">Hybrid Matcher</text>
                    <text x="60" y="36" text-anchor="middle" fill="#9a9a9a" font-size="9">60% Cosine Vector</text>
                    <text x="60" y="50" text-anchor="middle" fill="#9a9a9a" font-size="9">40% Skill Jaccard</text>
                </g>

                <g transform="translate(10, 183)">
                    <rect width="120" height="50" rx="6" fill="#2a2a2a" stroke="rgba(255,255,255,0.06)" />
                    <text x="60" y="20" text-anchor="middle" fill="#f0f0f0" font-size="11" font-weight="500">Analytics Marts</text>
                    <text x="60" y="36" text-anchor="middle" fill="#9a9a9a" font-size="9">Skills &amp; Benchmarks</text>
                </g>

                <g transform="translate(10, 243)">
                    <rect width="120" height="55" rx="6" fill="#2a2a2a" stroke="rgba(255,255,255,0.06)" />
                    <text x="60" y="20" text-anchor="middle" fill="#f0f0f0" font-size="11" font-weight="500">SPA Interface</text>
                    <text x="60" y="36" text-anchor="middle" fill="#9a9a9a" font-size="9">Vanilla JS / CSS</text>
                    <text x="60" y="48" text-anchor="middle" fill="#5fba8a" font-size="8">Zero-Build Static</text>
                </g>
            </g>
        </svg>
    </div>
    `;
}

function renderStarSchemaErdSvg() {
    return `
    <div class="diagram-wrapper" style="margin: var(--space-xl) 0; overflow-x: auto; background: var(--bg-surface); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: var(--space-lg);">
        <svg viewBox="0 0 860 400" width="100%" height="100%" style="min-width: 720px; font-family: var(--font-body);" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <marker id="erdArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#B8973A" />
                </marker>
                <marker id="crowFoot" viewBox="0 0 12 12" refX="0" refY="6" markerWidth="8" markerHeight="8" orient="auto">
                    <path d="M 12 0 L 0 6 L 12 12 M 0 6 L 12 6" fill="none" stroke="#B8973A" stroke-width="1.5" />
                </marker>
            </defs>

            <!-- Central Fact Table: fact_job_postings -->
            <g transform="translate(290, 60)">
                <rect width="280" height="280" rx="8" fill="#1e1e1e" stroke="#B8973A" stroke-width="2" />
                <rect width="280" height="38" rx="8" fill="#242424" />
                <text x="140" y="24" text-anchor="middle" fill="#C9A84C" font-size="14" font-weight="700" letter-spacing="0.5">fact_job_postings</text>
                
                <g transform="translate(16, 50)" font-family="var(--font-mono)" font-size="11">
                    <text x="0" y="16" fill="#5bb8ce" font-weight="600">PK  job_pk</text>
                    <text x="140" y="16" fill="#9a9a9a">VARCHAR (MD5)</text>

                    <text x="0" y="36" fill="#C9A84C" font-weight="600">FK  company_id</text>
                    <text x="140" y="36" fill="#9a9a9a">VARCHAR (MD5)</text>

                    <text x="0" y="56" fill="#C9A84C" font-weight="600">FK  location_id</text>
                    <text x="140" y="56" fill="#9a9a9a">VARCHAR (MD5)</text>

                    <text x="0" y="76" fill="#e8e8e8">    content_hash</text>
                    <text x="140" y="76" fill="#9a9a9a">VARCHAR (SHA256)</text>

                    <text x="0" y="96" fill="#e8e8e8">    job_title</text>
                    <text x="140" y="96" fill="#9a9a9a">VARCHAR</text>

                    <text x="0" y="116" fill="#e8e8e8">    job_url</text>
                    <text x="140" y="116" fill="#9a9a9a">VARCHAR</text>

                    <text x="0" y="136" fill="#e8e8e8">    source_portal</text>
                    <text x="140" y="136" fill="#9a9a9a">VARCHAR</text>

                    <text x="0" y="156" fill="#e8e8e8">    raw_skills</text>
                    <text x="140" y="156" fill="#9a9a9a">TEXT (CSV)</text>

                    <text x="0" y="176" fill="#e8e8e8">    scraped_at</text>
                    <text x="140" y="176" fill="#9a9a9a">TIMESTAMP</text>

                    <text x="0" y="196" fill="#5fba8a">    is_active</text>
                    <text x="140" y="196" fill="#9a9a9a">BOOLEAN</text>
                </g>
            </g>

            <!-- Dimension: dim_companies -->
            <g transform="translate(30, 40)">
                <rect width="210" height="130" rx="8" fill="#1e1e1e" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
                <rect width="210" height="32" rx="8" fill="#242424" />
                <text x="105" y="21" text-anchor="middle" fill="#f0f0f0" font-size="12" font-weight="600">dim_companies</text>
                
                <g transform="translate(14, 45)" font-family="var(--font-mono)" font-size="11">
                    <text x="0" y="18" fill="#5bb8ce" font-weight="600">PK  company_id</text>
                    <text x="110" y="18" fill="#9a9a9a">VARCHAR</text>

                    <text x="0" y="38" fill="#e8e8e8">    company_name</text>
                    <text x="110" y="38" fill="#9a9a9a">VARCHAR</text>

                    <text x="0" y="58" fill="#e8e8e8">    created_at</text>
                    <text x="110" y="58" fill="#9a9a9a">TIMESTAMP</text>
                </g>
            </g>

            <!-- Connector dim_companies -> fact_job_postings -->
            <path d="M 240 105 L 290 105" stroke="#B8973A" stroke-width="1.8" fill="none" marker-end="url(#erdArrow)" />
            <text x="265" y="98" text-anchor="middle" fill="#9a9a9a" font-size="9">1:N</text>

            <!-- Dimension: dim_locations -->
            <g transform="translate(30, 230)">
                <rect width="210" height="145" rx="8" fill="#1e1e1e" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
                <rect width="210" height="32" rx="8" fill="#242424" />
                <text x="105" y="21" text-anchor="middle" fill="#f0f0f0" font-size="12" font-weight="600">dim_locations</text>
                
                <g transform="translate(14, 45)" font-family="var(--font-mono)" font-size="11">
                    <text x="0" y="18" fill="#5bb8ce" font-weight="600">PK  location_id</text>
                    <text x="110" y="18" fill="#9a9a9a">VARCHAR</text>

                    <text x="0" y="38" fill="#e8e8e8">    location_name</text>
                    <text x="110" y="38" fill="#9a9a9a">VARCHAR</text>

                    <text x="0" y="58" fill="#5fba8a">    work_type</text>
                    <text x="110" y="58" fill="#9a9a9a">VARCHAR</text>

                    <text x="0" y="78" fill="#e8e8e8">    created_at</text>
                    <text x="110" y="78" fill="#9a9a9a">TIMESTAMP</text>
                </g>
            </g>

            <!-- Connector dim_locations -> fact_job_postings -->
            <path d="M 240 295 L 290 295" stroke="#B8973A" stroke-width="1.8" fill="none" marker-end="url(#erdArrow)" />
            <text x="265" y="288" text-anchor="middle" fill="#9a9a9a" font-size="9">1:N</text>

            <!-- Dimension: dim_skills -->
            <g transform="translate(620, 130)">
                <rect width="210" height="135" rx="8" fill="#1e1e1e" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
                <rect width="210" height="32" rx="8" fill="#242424" />
                <text x="105" y="21" text-anchor="middle" fill="#f0f0f0" font-size="12" font-weight="600">dim_skills</text>
                
                <g transform="translate(14, 45)" font-family="var(--font-mono)" font-size="11">
                    <text x="0" y="18" fill="#5bb8ce" font-weight="600">PK  skill_id</text>
                    <text x="100" y="18" fill="#9a9a9a">VARCHAR</text>

                    <text x="0" y="38" fill="#e8e8e8">    skill_name</text>
                    <text x="100" y="38" fill="#9a9a9a">VARCHAR</text>

                    <text x="0" y="58" fill="#e8e8e8">    created_at</text>
                    <text x="100" y="58" fill="#9a9a9a">TIMESTAMP</text>
                </g>
            </g>

            <!-- Connector fact_job_postings <-> dim_skills -->
            <path d="M 570 195 L 620 195" stroke="#B8973A" stroke-width="1.8" fill="none" stroke-dasharray="4,4" marker-end="url(#erdArrow)" />
            <text x="595" y="188" text-anchor="middle" fill="#9a9a9a" font-size="9">Taxonomy</text>
        </svg>
    </div>
    `;
}

function renderSelfHealingDecisionSvg() {
    return `
    <div class="diagram-wrapper" style="margin: var(--space-xl) 0; overflow-x: auto; background: var(--bg-surface); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: var(--space-lg);">
        <svg viewBox="0 0 860 320" width="100%" height="100%" style="min-width: 720px; font-family: var(--font-body);" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <marker id="shArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#B8973A" />
                </marker>
            </defs>

            <!-- Input Node -->
            <g transform="translate(30, 130)">
                <rect width="130" height="60" rx="8" fill="#1e1e1e" stroke="rgba(255,255,255,0.12)" />
                <text x="65" y="26" text-anchor="middle" fill="#f0f0f0" font-size="12" font-weight="600">Scraped HTML</text>
                <text x="65" y="44" text-anchor="middle" fill="#9a9a9a" font-size="10">Raw Portal DOM</text>
            </g>

            <!-- Connector -> Tier 1 -->
            <line x1="160" y1="160" x2="208" y2="160" stroke="#B8973A" stroke-width="2" marker-end="url(#shArrow)" />

            <!-- Tier 1: Fast CSS Path -->
            <g transform="translate(210, 120)">
                <rect width="180" height="80" rx="8" fill="#242424" stroke="rgba(184,151,58,0.4)" stroke-width="1.5" />
                <text x="90" y="24" text-anchor="middle" fill="#C9A84C" font-size="12" font-weight="700">Tier 1: Fast CSS Path</text>
                <text x="90" y="44" text-anchor="middle" fill="#f0f0f0" font-size="11">Deterministic Selectors</text>
                <text x="90" y="62" text-anchor="middle" fill="#5fba8a" font-size="10">Sub-20ms Execution</text>
            </g>

            <!-- Decision Diamond -->
            <g transform="translate(430, 120)">
                <polygon points="60,0 120,40 60,80 0,40" fill="#2a2a2a" stroke="#C9A84C" stroke-width="1.5" />
                <text x="60" y="38" text-anchor="middle" fill="#f0f0f0" font-size="11" font-weight="600">Records &gt; 0?</text>
                <text x="60" y="52" text-anchor="middle" fill="#9a9a9a" font-size="9">DOM Drift?</text>
            </g>

            <!-- Line Tier 1 -> Decision -->
            <line x1="390" y1="160" x2="428" y2="160" stroke="#B8973A" stroke-width="2" marker-end="url(#shArrow)" />

            <!-- YES Path -> Raw Lake -->
            <g>
                <line x1="550" y1="160" x2="688" y2="160" stroke="#5fba8a" stroke-width="2" marker-end="url(#shArrow)" />
                <text x="605" y="152" text-anchor="middle" fill="#5fba8a" font-size="11" font-weight="600">YES (Nominal)</text>
            </g>

            <!-- NO Path (DOM Drift) -> Tier 2 Fallback -->
            <g>
                <path d="M 490 200 L 490 260 L 538 260" stroke="#d47a87" stroke-width="2" fill="none" marker-end="url(#shArrow)" />
                <text x="445" y="240" text-anchor="middle" fill="#d47a87" font-size="11" font-weight="600">NO (Drift)</text>
            </g>

            <!-- Tier 2 Fallback: Gemini Cascade -->
            <g transform="translate(540, 215)">
                <rect width="210" height="90" rx="8" fill="#242424" stroke="rgba(212,122,135,0.4)" stroke-width="1.5" />
                <text x="105" y="24" text-anchor="middle" fill="#d47a87" font-size="12" font-weight="700">Tier 2: Gemini Flash Cascade</text>
                <text x="105" y="44" text-anchor="middle" fill="#e8e8e8" font-size="11">1. Gemini Flash 3.7 (Primary)</text>
                <text x="105" y="60" text-anchor="middle" fill="#9a9a9a" font-size="10">2. Fallback to Flash 3.6</text>
                <text x="105" y="76" text-anchor="middle" fill="#9a9a9a" font-size="10">3. Fallback to Flash 3.5</text>
            </g>

            <!-- Line Tier 2 -> Success Terminal -->
            <path d="M 750 260 L 780 260 L 780 200" stroke="#B8973A" stroke-width="2" fill="none" marker-end="url(#shArrow)" />

            <!-- Success Terminal: Raw Lake Landing -->
            <g transform="translate(690, 125)">
                <rect width="140" height="70" rx="8" fill="#1e1e1e" stroke="#5fba8a" stroke-width="2" />
                <text x="70" y="26" text-anchor="middle" fill="#5fba8a" font-size="12" font-weight="700">Raw Lake Landing</text>
                <text x="70" y="44" text-anchor="middle" fill="#e8e8e8" font-size="10">Compute SHA256</text>
                <text x="70" y="58" text-anchor="middle" fill="#9a9a9a" font-size="9">Immutable JSON Batch</text>
            </g>
        </svg>
    </div>
    `;
}

function renderHybridMatcherSvg() {
    return `
    <div class="diagram-wrapper" style="margin: var(--space-xl) 0; overflow-x: auto; background: var(--bg-surface); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: var(--space-lg);">
        <svg viewBox="0 0 860 300" width="100%" height="100%" style="min-width: 720px; font-family: var(--font-body);" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <marker id="matchArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#B8973A" />
                </marker>
            </defs>

            <!-- Candidate Profile Input -->
            <g transform="translate(30, 105)">
                <rect width="160" height="90" rx="8" fill="#1e1e1e" stroke="rgba(255,255,255,0.12)" />
                <text x="80" y="24" text-anchor="middle" fill="#C9A84C" font-size="12" font-weight="700">Candidate Profile</text>
                <text x="80" y="44" text-anchor="middle" fill="#f0f0f0" font-size="11">Parsed Resume / CV</text>
                <text x="80" y="60" text-anchor="middle" fill="#9a9a9a" font-size="10">Skills Taxonomy List</text>
                <text x="80" y="74" text-anchor="middle" fill="#5bb8ce" font-size="9">Dense Profile Text</text>
            </g>

            <!-- Fork Arrows -->
            <path d="M 190 135 L 240 75 L 278 75" stroke="#B8973A" stroke-width="2" fill="none" marker-end="url(#matchArrow)" />
            <path d="M 190 165 L 240 225 L 278 225" stroke="#B8973A" stroke-width="2" fill="none" marker-end="url(#matchArrow)" />

            <!-- Branch A: Vector Semantic Embedding -->
            <g transform="translate(280, 30)">
                <rect width="250" height="90" rx="8" fill="#242424" stroke="rgba(184,151,58,0.4)" stroke-width="1.5" />
                <text x="125" y="24" text-anchor="middle" fill="#C9A84C" font-size="12" font-weight="700">Branch A: Vector Semantics (60%)</text>
                <text x="125" y="44" text-anchor="middle" fill="#f0f0f0" font-size="11">Gemini Embedding 1 (768-dim)</text>
                <text x="125" y="60" text-anchor="middle" fill="#9a9a9a" font-size="10">Cosine Similarity: dot(A, B) / (|A| * |B|)</text>
                <text x="125" y="76" text-anchor="middle" fill="#5fba8a" font-size="9">Captures contextual &amp; cross-domain intent</text>
            </g>

            <!-- Branch B: Skill Taxonomy Jaccard Overlap -->
            <g transform="translate(280, 180)">
                <rect width="250" height="90" rx="8" fill="#242424" stroke="rgba(184,151,58,0.4)" stroke-width="1.5" />
                <text x="125" y="24" text-anchor="middle" fill="#C9A84C" font-size="12" font-weight="700">Branch B: Skill Taxonomy (40%)</text>
                <text x="125" y="44" text-anchor="middle" fill="#f0f0f0" font-size="11">dbt dim_skills Taxonomy</text>
                <text x="125" y="60" text-anchor="middle" fill="#9a9a9a" font-size="10">Jaccard Index: |S_cv ∩ S_job| / |S_cv ∪ S_job|</text>
                <text x="125" y="76" text-anchor="middle" fill="#5bb8ce" font-size="9">Guarantees exact required technical keywords</text>
            </g>

            <!-- Converge to Scoring Node -->
            <path d="M 530 75 L 570 125 L 608 125" stroke="#B8973A" stroke-width="2" fill="none" marker-end="url(#matchArrow)" />
            <path d="M 530 225 L 570 175 L 608 175" stroke="#B8973A" stroke-width="2" fill="none" marker-end="url(#matchArrow)" />

            <!-- Composite Scoring Node -->
            <g transform="translate(610, 95)">
                <rect width="220" height="110" rx="8" fill="#1e1e1e" stroke="#B8973A" stroke-width="2" />
                <text x="110" y="24" text-anchor="middle" fill="#C9A84C" font-size="13" font-weight="700">Hybrid Match Engine</text>
                <text x="110" y="46" text-anchor="middle" fill="#e8e8e8" font-size="11" font-family="var(--font-mono)">Score = (0.6 * Vec) +</text>
                <text x="110" y="62" text-anchor="middle" fill="#e8e8e8" font-size="11" font-family="var(--font-mono)">(0.4 * Jaccard)</text>
                <text x="110" y="84" text-anchor="middle" fill="#5fba8a" font-size="10">Ranked Top-K Job Recommendations</text>
                <text x="110" y="98" text-anchor="middle" fill="#9a9a9a" font-size="9">Matched &amp; Missing Skills Diagnostics</text>
            </g>
        </svg>
    </div>
    `;
}
