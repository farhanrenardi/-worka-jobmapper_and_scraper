/**
 * Scraping Engine Page — Worka 2.0 Two-Tier Self-Healing Ingestion, Anti-Bot Evasion, and Human-in-the-Loop.
 * Strictly zero emojis. Theme-consistent with dark-gold styling.
 */
function renderScrapingPage() {
    return `
        <div class="animate-in">
            <h1>Scraping Engine &amp; Self-Healing Ingestion</h1>
            <p class="page-lead">
                The ingestion layer is the foundational entry point of Worka 2.0. It features a two-tier 
                adaptive self-healing architecture that pairs deterministic CSS selector parsing with an LLM fallback 
                cascade, 7+ anti-bot stealth patches, and a human-in-the-loop fallback mechanism.
            </p>

            <h2>Two-Tier Self-Healing Decision Flow</h2>
            <p>
                To maintain high throughput while ensuring resilience against frequent front-end class name mutations, 
                each ingestion task follows an automated two-tier decision workflow:
            </p>

            ${renderSelfHealingDecisionSvg()}

            <h2>Self-Healing Ingestion Tiers</h2>

            <div class="doc-card">
                <h3>Tier 1 — Fast-Path Deterministic CSS Parsing</h3>
                <p>
                    Under nominal operating conditions, web pages are parsed using targeted CSS selectors and 
                    BeautifulSoup. This deterministic path executes in under 20 milliseconds per page with zero API costs:
                </p>
                <ul>
                    <li>Matches known container patterns (e.g. <code>.job-card</code>, <code>[data-testid='job-card']</code>).</li>
                    <li>Extracts structured metadata: title, company name, location, salary, and canonical URL.</li>
                    <li>If one or more records are extracted, the parser increments <code>fast_path_count</code> and routes the batch directly to the raw landing lake.</li>
                </ul>
            </div>

            <div class="doc-card">
                <h3>Tier 2 — Gemini Flash AI Fallback Cascade</h3>
                <p>
                    When front-end developers change class names or DOM hierarchies, deterministic selectors return 0 records 
                    despite valid HTML presence (a condition known as <strong>DOM Drift</strong>). Instead of failing the entire 
                    pipeline, the <code>SelfHealingScraperAdapter</code> activates an AI fallback cascade:
                </p>
                <ol>
                    <li><strong>Primary Model:</strong> Invokes Google <strong>Gemini Flash 3.7</strong> with structured JSON response instructions to extract job cards directly from the raw HTML snippet.</li>
                    <li><strong>First Fallback:</strong> If Gemini Flash 3.7 hits rate limits or latency ceilings, automatically retries on <strong>Gemini Flash 3.6</strong>.</li>
                    <li><strong>Second Fallback:</strong> Cascades down to <strong>Gemini Flash 3.5</strong> if secondary limits are triggered.</li>
                </ol>
                <p>
                    This cascade guarantees high data extraction reliability while strictly adhering to free-tier quotas.
                </p>
            </div>

            <h2>Anti-Bot Evasion &amp; Stealth Patches</h2>
            <p>
                The <code>ScraperManager</code> initializes Playwright browser contexts with an injection script 
                applied prior to page execution (via <code>add_init_script</code>). This masks standard headless indicators:
            </p>

            <div class="doc-table-wrapper">
                <table class="doc-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Browser Target</th>
                            <th>Patch Implementation</th>
                            <th>Detection Vector Mitigated</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td><code>navigator.webdriver</code></td>
                            <td>Overridden to <code>undefined</code></td>
                            <td>Primary headless flag checked by Cloudflare and Datadome.</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td><code>window.chrome</code></td>
                            <td>Mock runtime object injected with standard properties</td>
                            <td>Absence in headless Chromium flags automated sessions.</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td><code>Permissions API</code></td>
                            <td>Intercepted <code>notifications</code> query to return <code>prompt</code></td>
                            <td>Headless browsers return inconsistent permission states.</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td><code>navigator.plugins</code></td>
                            <td>Faked standard plugin array (Chrome PDF Viewer, etc.)</td>
                            <td>Headless instances report zero installed browser plugins.</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td><code>navigator.languages</code></td>
                            <td>Hardcoded to <code>['en-US', 'en', 'id']</code></td>
                            <td>Missing locale configurations reveal headless defaults.</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td><code>WebGL Rendering Context</code></td>
                            <td>Faked unmasked vendor (Intel Inc.) and renderer (Intel Iris)</td>
                            <td>Default SwiftShader renderer reveals virtualized execution.</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td><code>Screen Dimensions</code></td>
                            <td>Standard 1920x1080 display geometry with colorDepth 24</td>
                            <td>Anomalous headless aspect ratios and zero color depths.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2>Human-in-the-Loop &amp; Persistent Context</h2>
            <p>
                Certain portals (such as LinkedIn or Cloudflare-protected JobStreet endpoints) enforce strict authentication 
                checkpoints or CAPTCHAs that automated scripts cannot bypass headlessly:
            </p>
            <ul>
                <li><strong>Persistent Browser Context:</strong> The scraper boots using <code>launch_persistent_context</code> pointing to a dedicated <code>user_data_dir</code>. Cookies, session tokens, and clearance headers persist across runs.</li>
                <li><strong>Visible CDP Escalation:</strong> When a login wall or challenge is encountered, the headless worker yields control to a visible Chrome instance.</li>
                <li><strong>UI Intervention Signal:</strong> The FastAPI server notifies the frontend via SSE/polling, displaying a modal for the user to complete authentication or solve the CAPTCHA manually.</li>
                <li><strong>Seamless Resumption:</strong> Once resolved, the user signals completion and the scraper resumes automated batch extraction without aborting the pipeline.</li>
            </ul>

            <h2>Supported Portal Scrapers</h2>
            <div class="doc-table-wrapper">
                <table class="doc-table">
                    <thead>
                        <tr>
                            <th>Portal</th>
                            <th>Primary Mode</th>
                            <th>Fallback Mechanism</th>
                            <th>Special Capabilities</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Glints</strong></td>
                            <td>Deterministic CSS / GraphQL API</td>
                            <td>Gemini Flash DOM fallback</td>
                            <td>Sub-second direct card extraction, salary parsing.</td>
                        </tr>
                        <tr>
                            <td><strong>JobStreet</strong></td>
                            <td>HTTP direct fetch</td>
                            <td>Playwright browser rendering</td>
                            <td>Resource blocking (media/fonts) for high page throughput.</td>
                        </tr>
                        <tr>
                            <td><strong>LinkedIn</strong></td>
                            <td>Visible CDP session</td>
                            <td>Persistent user authentication</td>
                            <td>Preserves session cookies; authenticates once for repeated runs.</td>
                        </tr>
                        <tr>
                            <td><strong>Kalibrr</strong></td>
                            <td>Public REST API</td>
                            <td>Browser extraction</td>
                            <td>High-fidelity JSON payloads with normalized company names.</td>
                        </tr>
                        <tr>
                            <td><strong>Talentics</strong></td>
                            <td>Public REST API</td>
                            <td>Browser extraction</td>
                            <td>Early-career and Management Trainee role coverage.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
