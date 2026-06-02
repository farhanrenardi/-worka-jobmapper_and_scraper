/**
 * Technology Stack Page — Full technical details and setup guide.
 */
function renderTechStackPage() {
    return `
        <div class="animate-in">
            <h1>Technology Stack</h1>
            <p class="page-lead">
                Worka is built with a focus on <strong>local-first execution</strong> — the scraping engine 
                requires a real Chrome browser instance, making it best suited for running on a local machine 
                rather than cloud hosting.
            </p>

            <h2>Stack Overview</h2>
            <div class="doc-table-wrapper">
                <table class="doc-table">
                    <thead>
                        <tr>
                            <th>Layer</th>
                            <th>Technology</th>
                            <th>Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Web Server</strong></td>
                            <td>Python / FastAPI</td>
                            <td>REST API endpoints + static file serving + SSE/NDJSON streams</td>
                        </tr>
                        <tr>
                            <td><strong>Scraping</strong></td>
                            <td>Playwright (Python)</td>
                            <td>Headless + visible browser automation with persistent contexts</td>
                        </tr>
                        <tr>
                            <td><strong>HTTP Client</strong></td>
                            <td>httpx (async)</td>
                            <td>Direct API/HTTP requests (API-first scrapers, Tavily calls)</td>
                        </tr>
                        <tr>
                            <td><strong>HTML Parsing</strong></td>
                            <td>BeautifulSoup 4</td>
                            <td>Parse scraped HTML → extract job data from DOM</td>
                        </tr>
                        <tr>
                            <td><strong>LLM / AI</strong></td>
                            <td>OpenAI API (<code>gpt-4o-mini</code>)</td>
                            <td>Job role classification, company type classification, prospect assessment</td>
                        </tr>
                        <tr>
                            <td><strong>Web Search</strong></td>
                            <td>Tavily Search API</td>
                            <td>Enrich company context for more accurate LLM classification</td>
                        </tr>
                        <tr>
                            <td><strong>Database</strong></td>
                            <td>PostgreSQL / SQLite</td>
                            <td>PostgreSQL for production; SQLite fallback for development</td>
                        </tr>
                        <tr>
                            <td><strong>ORM</strong></td>
                            <td>SQLAlchemy</td>
                            <td>Database models, session management, queries</td>
                        </tr>
                        <tr>
                            <td><strong>Frontend</strong></td>
                            <td>Vanilla JS + CSS</td>
                            <td>Single Page Application — no framework, no build step</td>
                        </tr>
                        <tr>
                            <td><strong>Typography</strong></td>
                            <td>Inter + JetBrains Mono</td>
                            <td>Body text + code/monospace elements</td>
                        </tr>
                        <tr>
                            <td><strong>Containerization</strong></td>
                            <td>Docker Compose</td>
                            <td>PostgreSQL database container</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2>Prerequisites</h2>
            <ul>
                <li><strong>Python 3.9+</strong> — required for type hints and asyncio features used</li>
                <li><strong>Google Chrome</strong> — real Chrome browser required for Playwright persistent contexts</li>
                <li><strong>Docker</strong> (optional) — for running PostgreSQL via Docker Compose</li>
            </ul>

            <h3>API Keys (Optional)</h3>
            <div class="card-grid">
                <div class="doc-card">
                    <h3><i data-lucide="key" class="inline-icon"></i> OpenAI API Key</h3>
                    <p>Required for AI-powered job classification. Without it, the system falls back to rule-based keyword matching.</p>
                </div>
                <div class="doc-card">
                    <h3><i data-lucide="search" class="inline-icon"></i> Tavily API Key</h3>
                    <p>Required for web search enrichment during company type classification. Without it, classification relies on the company name alone.</p>
                </div>
            </div>

            <h2>Setup & Installation</h2>

            <h3>Step 1 — Clone & Setup Virtual Environment</h3>
            <pre><code>cd /path/to/worka
python3 -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt
playwright install</code></pre>

            <h3>Step 2 — Configure Environment Variables</h3>
            <pre><code>cp .env.example .env
# Edit .env and add your API keys:
# OPENAI_API_KEY=sk-...
# TAVILY_API_KEY=tvly-...
# DATABASE_URL=sqlite:///./job_mapper.db</code></pre>

            <h3>Step 3 — Start the Application</h3>
            <pre><code>source venv/bin/activate
cd backend
python main.py

# Open http://127.0.0.1:8000</code></pre>

            <h3>Step 4 — Stop</h3>
            <pre><code>./stop   # from the project root</code></pre>

            <h2>Environment Variables</h2>
            <div class="doc-table-wrapper">
                <table class="doc-table">
                    <thead>
                        <tr>
                            <th>Variable</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td><code>OPENAI_API_KEY</code></td><td><em>empty</em></td><td>OpenAI API key for LLM classification</td></tr>
                        <tr><td><code>TAVILY_API_KEY</code></td><td><em>empty</em></td><td>Tavily Search API key for web enrichment</td></tr>
                        <tr><td><code>DATABASE_URL</code></td><td><code>postgresql://...</code></td><td>Database connection string</td></tr>
                        <tr><td><code>CHROME_PATH</code></td><td>macOS Chrome path</td><td>Path to Chrome executable</td></tr>
                        <tr><td><code>LLM_MODEL</code></td><td><code>gpt-4o-mini</code></td><td>OpenAI model name</td></tr>
                        <tr><td><code>LLM_TEMPERATURE</code></td><td><code>0.1</code></td><td>Model temperature (low = deterministic)</td></tr>
                        <tr><td><code>MAX_PAGES_PER_SOURCE</code></td><td><code>5</code></td><td>Max pagination depth per keyword per source</td></tr>
                        <tr><td><code>REQUEST_DELAY_MIN</code></td><td><code>1.5</code></td><td>Minimum delay between page loads (seconds)</td></tr>
                        <tr><td><code>REQUEST_DELAY_MAX</code></td><td><code>4.0</code></td><td>Maximum delay between page loads (seconds)</td></tr>
                        <tr><td><code>HOST</code></td><td><code>0.0.0.0</code></td><td>Server host</td></tr>
                        <tr><td><code>PORT</code></td><td><code>8000</code></td><td>Server port</td></tr>
                    </tbody>
                </table>
            </div>

            <h2>Python Dependencies</h2>
            <pre><code>fastapi
uvicorn[standard]
sqlalchemy
python-dotenv
playwright
beautifulsoup4
httpx
openai</code></pre>

            <h2>Why Local-First?</h2>
            <div class="callout callout-gold">
                <div class="callout-title"><i data-lucide="home" class="callout-icon"></i> Architecture Decision</div>
                <p>
                    Worka is designed as a <strong>local-first application</strong> for several reasons:
                </p>
                <ul>
                    <li><strong>Browser requirement</strong> — Playwright needs a real Chrome instance. Cloud hosting (Render, Railway) has limited RAM and no GUI for manual login/CAPTCHA solving.</li>
                    <li><strong>IP reputation</strong> — Cloud provider IPs (AWS, GCP) are frequently blocked by job sites' anti-bot systems. Home IPs have much better reputation.</li>
                    <li><strong>Login cookies</strong> — LinkedIn and other sites require authenticated sessions that persist across runs. This works naturally with local Chrome user data.</li>
                    <li><strong>Privacy</strong> — Your job search data stays on your machine.</li>
                </ul>
            </div>
        </div>
    `;
}
