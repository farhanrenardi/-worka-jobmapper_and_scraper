/**
 * Architecture Page — System design, module breakdown, data flow.
 */
function renderArchitecturePage() {
    return `
        <div class="animate-in">
            <h1>System Architecture</h1>
            <p class="page-lead">
                Worka is designed as a modular pipeline — each stage processes data independently 
                and passes it downstream. The system is optimized for local execution with 
                browser-based scraping that requires a real Chrome instance.
            </p>

            <h2>High-Level Architecture</h2>
            <div class="arch-diagram">
                <div class="arch-row">
                    <div class="arch-box">
                        <div class="arch-box-icon"><i data-lucide="globe" class="arch-box-icon"></i></div>
                        <div class="arch-box-label">LinkedIn</div>
                        <div class="arch-box-sub">Visible CDP</div>
                    </div>
                    <div class="arch-box">
                        <div class="arch-box-icon"><i data-lucide="globe" class="arch-box-icon"></i></div>
                        <div class="arch-box-label">Glints</div>
                        <div class="arch-box-sub">GraphQL API</div>
                    </div>
                    <div class="arch-box">
                        <div class="arch-box-icon"><i data-lucide="globe" class="arch-box-icon"></i></div>
                        <div class="arch-box-label">JobStreet</div>
                        <div class="arch-box-sub">HTTP + Browser</div>
                    </div>
                    <div class="arch-box">
                        <div class="arch-box-icon"><i data-lucide="globe" class="arch-box-icon"></i></div>
                        <div class="arch-box-label">Kalibrr</div>
                        <div class="arch-box-sub">REST API</div>
                    </div>
                    <div class="arch-box">
                        <div class="arch-box-icon"><i data-lucide="globe" class="arch-box-icon"></i></div>
                        <div class="arch-box-label">Talentics</div>
                        <div class="arch-box-sub">REST API</div>
                    </div>
                    <div class="arch-box">
                        <div class="arch-box-icon"><i data-lucide="globe" class="arch-box-icon"></i></div>
                        <div class="arch-box-label">Indeed</div>
                        <div class="arch-box-sub">Browser Only</div>
                    </div>
                </div>

                <div class="arch-arrow-row">▼ ▼ ▼ ▼ ▼ ▼</div>

                <div class="arch-row">
                    <div class="arch-box gold-border" style="min-width:200px">
                        <div class="arch-box-icon"><i data-lucide="monitor" class="arch-box-icon"></i></div>
                        <div class="arch-box-label">Playwright Engine</div>
                        <div class="arch-box-sub">Stealth + Persistent Context</div>
                    </div>
                    <div class="arch-box gold-border" style="min-width:200px">
                        <div class="arch-box-icon"><i data-lucide="user" class="arch-box-icon"></i></div>
                        <div class="arch-box-label">Login/CAPTCHA Handler</div>
                        <div class="arch-box-sub">Human-in-the-Loop</div>
                    </div>
                </div>

                <div class="arch-arrow-row">▼</div>

                <div class="arch-row">
                    <div class="arch-box gold-border" style="min-width:280px">
                        <div class="arch-box-icon"><i data-lucide="bot" class="arch-box-icon"></i></div>
                        <div class="arch-box-label">AI Pipeline</div>
                        <div class="arch-box-sub">OpenAI gpt-4o-mini + Tavily Search</div>
                    </div>
                </div>

                <div class="arch-arrow-row">▼</div>

                <div class="arch-row">
                    <div class="arch-box" style="min-width:180px">
                        <div class="arch-box-icon"><i data-lucide="database" class="flow-node-icon"></i></div>
                        <div class="arch-box-label">Database</div>
                        <div class="arch-box-sub">PostgreSQL / SQLite</div>
                    </div>
                    <div class="arch-box" style="min-width:180px">
                        <div class="arch-box-icon"><i data-lucide="server" class="arch-box-icon"></i></div>
                        <div class="arch-box-label">FastAPI Server</div>
                        <div class="arch-box-sub">REST API + SSE</div>
                    </div>
                    <div class="arch-box" style="min-width:180px">
                        <div class="arch-box-icon"><i data-lucide="bar-chart-2" class="arch-box-icon"></i></div>
                        <div class="arch-box-label">SPA Dashboard</div>
                        <div class="arch-box-sub">Vanilla JS/CSS</div>
                    </div>
                </div>
            </div>

            <h2>Core Modules</h2>

            <h3>Module 1 — Crawling & Scraping Engine</h3>
            <p>
                The scraping engine uses a <strong>two-phase strategy</strong> for maximum reliability:
            </p>
            <ol>
                <li><strong>Phase 1 (Headless):</strong> Fast, stealthed headless browser — or direct API/HTTP requests where possible. Resource-blocking (images, fonts, media) is enabled for speed.</li>
                <li><strong>Phase 2 (Visible CDP):</strong> If Phase 1 fails (anti-bot, CAPTCHA, login wall), a visible Chrome window opens for manual user intervention.</li>
            </ol>
            <p>
                All scrapers share a <strong>persistent browser context</strong> (<code>launch_persistent_context</code>) 
                so login cookies are preserved across sources and sessions.
            </p>

            <h3>Module 2 — Data Parsing & AI Classification</h3>
            <p>
                Raw scraped data is streamed into the AI pipeline for classification:
            </p>
            <ul>
                <li><strong>Job Role Classification</strong> — Maps each job to one of 5 categories: Data Analyst, Data Scientist, Management Trainee, Consultant, or Other</li>
                <li><strong>Company Type Classification</strong> — Determines if the company's primary business is IT (tech/software) or Non-IT, with web search enrichment via Tavily</li>
            </ul>

            <h3>Module 3 — Storage & Deduplication</h3>
            <p>
                Processed results are stored in a <strong>PostgreSQL</strong> database (with SQLite fallback for development). 
                Before inserting, each job's link is checked against existing records to prevent duplicates across 
                multiple scraping sessions.
            </p>

            <h3>Module 4 — AI Prospecting & Assessment</h3>
            <p>
                An optional assessment module evaluates each job opportunity by:
            </p>
            <ul>
                <li>Searching the web for salary reviews and company culture information (via Tavily)</li>
                <li>Using GPT-4o-mini to estimate salary range, workload score (1–10), and prospect level (Low/Medium/High)</li>
                <li>Results stream to the UI in real-time via NDJSON</li>
            </ul>

            <h3>Module 5 — Dashboard & Visualization</h3>
            <p>
                The frontend is a <strong>Single Page Application</strong> (vanilla JS) served directly by FastAPI. 
                It features summary metrics, classification charts, top hiring company rankings, 
                prospect leaderboards, and a fully filterable/searchable data table.
            </p>

            <h2>Project Structure</h2>
            <pre><code>worka/
├── backend/
│   ├── main.py              # FastAPI server (API + frontend serving)
│   ├── config.py             # Configuration loader (.env)
│   ├── database.py           # SQLAlchemy models
│   ├── scrapers/
│   │   ├── base.py           # Abstract base scraper
│   │   ├── linkedin.py       # LinkedIn (always visible CDP)
│   │   ├── glints.py         # Glints (GraphQL API → browser fallback)
│   │   ├── jobstreet.py      # JobStreet (HTTP → browser fallback)
│   │   ├── kalibrr.py        # Kalibrr (REST API → browser fallback)
│   │   ├── talentics.py      # Talentics (REST API → browser fallback)
│   │   ├── indeed.py         # Indeed (browser only)
│   │   └── manager.py        # Orchestrator — contexts + login popup
│   ├── ai/
│   │   ├── classifier.py     # LLM classification (role + company)
│   │   └── prospector.py     # AI salary/workload assessment
│   └── requirements.txt
├── frontend/
│   ├── index.html            # SPA entry point
│   ├── css/styles.css        # Design system
│   └── js/
│       ├── app.js            # SPA router
│       ├── api.js            # API client
│       ├── pages/            # Home, Results, Dashboard
│       └── components/       # Card, Table, Charts
├── .env                      # Environment variables
└── README.md</code></pre>

            <h2>API Endpoints</h2>
            <div class="doc-table-wrapper">
                <table class="doc-table">
                    <thead>
                        <tr>
                            <th>Method</th>
                            <th>Endpoint</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td><code>GET</code></td><td><code>/api/config/status</code></td><td>Check API key configuration status</td></tr>
                        <tr><td><code>POST</code></td><td><code>/api/scrape</code></td><td>Start a new scraping session</td></tr>
                        <tr><td><code>GET</code></td><td><code>/api/scrape/progress</code></td><td>Real-time progress + login popup signal</td></tr>
                        <tr><td><code>POST</code></td><td><code>/api/scrape/cancel</code></td><td>Cancel running scraping session</td></tr>
                        <tr><td><code>POST</code></td><td><code>/api/scrape/login-continue</code></td><td>Signal login continue/skip</td></tr>
                        <tr><td><code>GET</code></td><td><code>/api/jobs</code></td><td>List jobs with filters & pagination</td></tr>
                        <tr><td><code>GET</code></td><td><code>/api/jobs/{id}</code></td><td>Single job detail</td></tr>
                        <tr><td><code>DELETE</code></td><td><code>/api/jobs</code></td><td>Clear all jobs</td></tr>
                        <tr><td><code>GET</code></td><td><code>/api/dashboard</code></td><td>Aggregated analytics data</td></tr>
                        <tr><td><code>POST</code></td><td><code>/api/assess</code></td><td>Run AI assessment (NDJSON stream)</td></tr>
                        <tr><td><code>GET</code></td><td><code>/api/export/csv</code></td><td>Export all data as CSV</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
