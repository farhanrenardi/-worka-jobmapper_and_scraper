/**
 * Technology Stack Page — Worka 2.0 Technical Architecture, Dependencies, and Setup Guide.
 * Strictly zero emojis. Theme-consistent with dark-gold styling.
 */
function renderTechStackPage() {
    return `
        <div class="animate-in">
            <h1>Technology Stack &amp; Infrastructure</h1>
            <p class="page-lead">
                Worka 2.0 combines an enterprise-grade ELT data pipeline with modern AI services 
                and high-throughput REST serving—built for complete execution on zero-cost infrastructure.
            </p>

            <h2>Technology Stack Breakdown</h2>
            <div class="doc-table-wrapper">
                <table class="doc-table">
                    <thead>
                        <tr>
                            <th>Architectural Layer</th>
                            <th>Technology Component</th>
                            <th>Purpose &amp; Implementation Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>API &amp; Serving Engine</strong></td>
                            <td>Python 3.9+ / FastAPI</td>
                            <td>High-performance asynchronous REST API v2 serving dimensional job queries, skill aggregations, and CV uploads.</td>
                        </tr>
                        <tr>
                            <td><strong>Transformation &amp; Modeling</strong></td>
                            <td>dbt Core (1.7+)</td>
                            <td>Kimball star schema transformations, deduplication staging views, and surrogate key generation.</td>
                        </tr>
                        <tr>
                            <td><strong>LLM Intelligence</strong></td>
                            <td>Google Gemini Flash (3.7 / 3.6 / 3.5)</td>
                            <td>Hierarchical model cascade for role categorization, company type inference, and self-healing DOM extraction.</td>
                        </tr>
                        <tr>
                            <td><strong>Semantic Vector Engine</strong></td>
                            <td>Google Gemini Embedding 1</td>
                            <td>768-dimensional dense vector embeddings (<code>text-embedding-004</code>) powering hybrid candidate-job ranking.</td>
                        </tr>
                        <tr>
                            <td><strong>Database &amp; Vector Store</strong></td>
                            <td>PostgreSQL 16 + pgvector</td>
                            <td>Relational storage for dimensional marts and indexed embedding vectors running in containerized Docker.</td>
                        </tr>
                        <tr>
                            <td><strong>Web Ingestion &amp; Automation</strong></td>
                            <td>Playwright (Python) + BeautifulSoup 4</td>
                            <td>Browser automation with persistent user context, visible CDP escalation, and 7+ anti-bot evasion patches.</td>
                        </tr>
                        <tr>
                            <td><strong>Raw Landing Lake</strong></td>
                            <td>Immutable Local JSON Storage</td>
                            <td>Source- and date-partitioned landing zone with composite SHA256 content hashing for idempotency.</td>
                        </tr>
                        <tr>
                            <td><strong>Presentation Layer</strong></td>
                            <td>Vanilla JS + CSS (SPA)</td>
                            <td>Zero-build single-page application loaded natively from static files on GitHub Pages.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2>Setup &amp; Execution Guide</h2>

            <h3>Step 1 — Environment Initialization</h3>
            <pre><code># Clone the master repository
git clone https://github.com/farhanrenardi/worka-jobmapper_and_scraper.git
cd worka-jobmapper_and_scraper

# Initialize and activate Python virtual environment
python3 -m venv venv
source venv/bin/activate

# Install backend dependencies
pip install -r backend/requirements.txt
playwright install</code></pre>

            <h3>Step 2 — Environment Configuration</h3>
            <p>Create or update the <code>.env</code> file in the project root:</p>
            <pre><code>GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/jobmapper
RAW_DATA_DIR=./data/raw
DBT_PROJECT_DIR=./dbt_worka
HOST=0.0.0.0
PORT=8000</code></pre>

            <h3>Step 3 — Launch via 1-Command Runner</h3>
            <p>Spin up the PostgreSQL 16 pgvector container and FastAPI server with a single command:</p>
            <pre><code>chmod +x start stop
./start</code></pre>

            <h3>Step 4 — Trigger Master ELT Pipeline via CLI</h3>
            <p>Run the 5-stage ELT pipeline directly from the command line:</p>
            <pre><code>python backend/pipeline_runner.py --keywords "data engineer" "data scientist" --pages 1</code></pre>

            <h3>Step 5 — Graceful Shutdown</h3>
            <pre><code>./stop</code></pre>

            <h2>Environment Variables Reference</h2>
            <div class="doc-table-wrapper">
                <table class="doc-table">
                    <thead>
                        <tr>
                            <th>Variable Name</th>
                            <th>Default Value</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td><code>GEMINI_API_KEY</code></td><td><em>empty</em></td><td>Google AI Studio API key for Gemini Flash and Embedding models.</td></tr>
                        <tr><td><code>DATABASE_URL</code></td><td><code>postgresql://...</code></td><td>Connection string for PostgreSQL 16 database.</td></tr>
                        <tr><td><code>RAW_DATA_DIR</code></td><td><code>./data/raw</code></td><td>Root directory path for immutable raw JSON batch lake.</td></tr>
                        <tr><td><code>DBT_PROJECT_DIR</code></td><td><code>./dbt_worka</code></td><td>Path to dbt-core dimensional modeling project.</td></tr>
                        <tr><td><code>HOST</code></td><td><code>0.0.0.0</code></td><td>FastAPI server network bind host.</td></tr>
                        <tr><td><code>PORT</code></td><td><code>8000</code></td><td>FastAPI server network port.</td></tr>
                    </tbody>
                </table>
            </div>

            <h2>Architecture Principles</h2>
            <div class="callout callout-gold">
                <div class="callout-title"><i data-lucide="shield" class="callout-icon"></i> Zero-Cost Operational Budget</div>
                <p>
                    Worka 2.0 is designed from the ground up to operate with <strong>$0.00 infrastructure spend</strong>:
                </p>
                <ul>
                    <li><strong>Google AI Studio Free Tier:</strong> 15 RPM / 1M TPM for Gemini Flash and 1,500 RPM for Gemini Embedding.</li>
                    <li><strong>Local Docker Container:</strong> PostgreSQL 16 + pgvector runs entirely on local development hardware.</li>
                    <li><strong>Static Hosting:</strong> This interactive documentation SPA is deployed cost-free on GitHub Pages via automated GitHub Actions.</li>
                </ul>
            </div>
        </div>
    `;
}
