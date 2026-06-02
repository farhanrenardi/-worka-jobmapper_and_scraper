/**
 * Scraping Engine Page — Deep dive into all 6 scrapers, anti-bot evasion, human-in-the-loop.
 */
function renderScrapingPage() {
    return `
        <div class="animate-in">
            <h1>Scraping Engine</h1>
            <p class="page-lead">
                The scraping engine is the core data ingestion layer of Worka. It employs a 
                sophisticated two-phase strategy with 7+ stealth patches, API-first optimizations, 
                and a human-in-the-loop fallback for login/CAPTCHA challenges.
            </p>

            <h2>Two-Phase Scraping Strategy</h2>
            <p>
                Each non-LinkedIn scraper follows a <strong>fail-fast, escalate-gracefully</strong> pattern:
            </p>

            <div class="doc-card">
                <h3>Phase 1 — Fast Path (Headless / Direct API)</h3>
                <p>
                    The system first attempts the <strong>fastest method available</strong> for each source. 
                    For Glints, Kalibrr, and Talentics, this means hitting their public REST/GraphQL APIs 
                    directly — no browser needed. For JobStreet, a direct HTTP fetch is attempted. 
                    For Indeed, the headless browser is used since no public API is available.
                </p>
                <p>
                    When using headless mode, <strong>resource blocking</strong> is enabled — images, fonts, 
                    and media are aborted at the network level to speed up page loads significantly.
                </p>
            </div>

            <div class="doc-card">
                <h3>Phase 2 — Visible Browser Fallback (CDP)</h3>
                <p>
                    If Phase 1 returns <strong>0 results</strong> (usually due to anti-bot detection, 
                    Cloudflare challenge, or login requirement), the system:
                </p>
                <ol>
                    <li>Closes the headless browser context</li>
                    <li>Opens a <strong>visible Chrome window</strong> using the same persistent user data directory</li>
                    <li>Navigates to the source's login page</li>
                    <li>Triggers a <strong>popup in the UI</strong> asking the user to solve the challenge</li>
                    <li>Waits for the user to click "Continue" or "Skip"</li>
                    <li>Retries the scrape in the now-authenticated visible context</li>
                </ol>
            </div>

            <div class="callout callout-info">
                <div class="callout-title"><i data-lucide="lightbulb" class="callout-icon"></i> Why Persistent Context?</div>
                <p>
                    Using <code>launch_persistent_context</code> with a shared <code>user_data_dir</code> 
                    means login cookies, session tokens, and Cloudflare clearance cookies are 
                    <strong>preserved across scraping sessions</strong>. Once you log in to LinkedIn manually, 
                    subsequent runs can reuse the session.
                </p>
            </div>

            <h2>Anti-Bot Evasion (Stealth Patches)</h2>
            <p>
                The <code>ScraperManager</code> injects a comprehensive stealth script into every browser 
                page <strong>before any page script executes</strong> (via <code>add_init_script</code>). 
                This patches the most commonly fingerprinted browser APIs:
            </p>

            <div class="doc-table-wrapper">
                <table class="doc-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Patch</th>
                            <th>What It Does</th>
                            <th>Why It Matters</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td><code>navigator.webdriver</code></td>
                            <td>Set to <code>undefined</code></td>
                            <td>The clearest headless signal — all bot detectors check this first</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td><code>window.chrome</code></td>
                            <td>Inject full runtime object</td>
                            <td>Missing in headless Chromium; sites check <code>chrome.runtime</code></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td><code>Permissions API</code></td>
                            <td>Patch <code>notifications</code> query</td>
                            <td>Headless returns inconsistent permission states</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td><code>navigator.plugins</code></td>
                            <td>Fake 3 plugins (Chrome PDF, etc.)</td>
                            <td>Headless has 0 plugins; real browsers have many</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td><code>navigator.mimeTypes</code></td>
                            <td>Fake 4 MIME types</td>
                            <td>Consistent with real Chrome browser</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td><code>navigator.languages</code></td>
                            <td>Set to <code>['id-ID', 'id', 'en-US', 'en']</code></td>
                            <td>Match expected locale for Indonesian job sites</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td><code>Function.toString</code></td>
                            <td>Override to return <code>[native code]</code></td>
                            <td>Some checks inspect function source to detect patches</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p>
                Additionally, the browser is launched with <strong>Chromium flags</strong> that further reduce 
                the fingerprint surface:
            </p>
            <pre><code>--disable-blink-features=AutomationControlled
--disable-infobars
--disable-dev-shm-usage
--window-size=1366,768
--disable-extensions-except=
--no-first-run
# + ignore: --enable-automation</code></pre>

            <h2>Per-Source Scraper Details</h2>

            <div class="scraper-card">
                <div class="scraper-card-header">
                    <span class="scraper-card-name">LinkedIn</span>
                    <div class="scraper-card-badges">
                        <span class="strat-badge strat-cdp">Visible CDP Only</span>
                    </div>
                </div>
                <div class="scraper-steps">
                    <p>
                        LinkedIn has the <strong>strictest anti-bot detection</strong> in the industry — 
                        combining TLS fingerprinting, behavioral ML on scroll/click patterns, and 
                        server-side session analysis. Headless mode is <strong>always detected</strong> 
                        regardless of stealth patches.
                    </p>
                    <ol>
                        <li>Launch visible Chrome → navigate to <code>/login</code></li>
                        <li>Trigger UI popup → user logs in manually (max 120s)</li>
                        <li>Scroll LinkedIn feed for configurable minutes (default: 5 min)</li>
                        <li>Extract posts matching hiring hashtags: <code>#hiring</code>, <code>#loker</code>, <code>#lowongan</code>, etc.</li>
                        <li>Search Jobs section with all target keywords</li>
                        <li>Parse job cards from DOM using BeautifulSoup</li>
                    </ol>
                </div>
            </div>

            <div class="scraper-card">
                <div class="scraper-card-header">
                    <span class="scraper-card-name">Glints</span>
                    <div class="scraper-card-badges">
                        <span class="strat-badge strat-api">GraphQL API</span>
                        <span class="strat-badge strat-browser">Browser Fallback</span>
                    </div>
                </div>
                <div class="scraper-steps">
                    <p>Glints exposes a <strong>public GraphQL endpoint</strong> at <code>glints.com/api/graphql</code> that returns job listings without authentication.</p>
                    <ol>
                        <li>Send GraphQL <code>searchJobs</code> query with keyword, country=ID, pagination</li>
                        <li>Parse JSON response → extract title, company, job ID</li>
                        <li>If API returns empty → fall back to browser, parse <code>JobCard</code> DOM elements</li>
                    </ol>
                    <p><strong>Result in real session:</strong> 1,600 jobs collected (largest source)</p>
                </div>
            </div>

            <div class="scraper-card">
                <div class="scraper-card-header">
                    <span class="scraper-card-name">JobStreet</span>
                    <div class="scraper-card-badges">
                        <span class="strat-badge strat-api">HTTP Direct</span>
                        <span class="strat-badge strat-browser">Browser Fallback</span>
                    </div>
                </div>
                <div class="scraper-steps">
                    <p>JobStreet Indonesia is powered by SEEK infrastructure. The GraphQL endpoints are authenticated, so the scraper parses HTML instead.</p>
                    <ol>
                        <li>Fetch search pages via <code>httpx</code> with browser-like headers</li>
                        <li>Parse HTML using BeautifulSoup → find <code>a[data-automation="jobTitle"]</code></li>
                        <li>Extract company from <code>data-automation="jobCompany"</code> or fallback selectors</li>
                        <li>If HTTP blocked → use headless browser with lazy-scroll trigger</li>
                    </ol>
                    <p><strong>Result in real session:</strong> 220 jobs collected</p>
                </div>
            </div>

            <div class="scraper-card">
                <div class="scraper-card-header">
                    <span class="scraper-card-name">Kalibrr</span>
                    <div class="scraper-card-badges">
                        <span class="strat-badge strat-api">REST API</span>
                        <span class="strat-badge strat-browser">Browser + __NEXT_DATA__</span>
                    </div>
                </div>
                <div class="scraper-steps">
                    <p>Kalibrr has a <strong>public JSON API</strong> at <code>/kjs/job-board/search</code> that returns paginated job listings.</p>
                    <ol>
                        <li>Hit public REST API with search query + pagination offset</li>
                        <li>Parse JSON response → extract title, company, description, slug</li>
                        <li>If API blocked → use browser, parse <code>__NEXT_DATA__</code> JSON script tag</li>
                        <li>If __NEXT_DATA__ empty → fall back to HTML <code>a[href*="/c/"][href*="/jobs/"]</code> selectors</li>
                    </ol>
                    <p><strong>Result in real session:</strong> 177 jobs collected</p>
                </div>
            </div>

            <div class="scraper-card">
                <div class="scraper-card-header">
                    <span class="scraper-card-name">Talentics</span>
                    <div class="scraper-card-badges">
                        <span class="strat-badge strat-api">REST API</span>
                        <span class="strat-badge strat-browser">Browser Fallback</span>
                    </div>
                </div>
                <div class="scraper-steps">
                    <p>Talentics provides a <strong>public REST API</strong> at <code>api.talentics.id/v1/jobs</code>.</p>
                    <ol>
                        <li>Hit REST API with keyword search + pagination</li>
                        <li>Parse JSON → extract title, company, slug</li>
                        <li>If API empty → use browser, parse <code>div.job-card-component</code> elements</li>
                    </ol>
                    <p><strong>Result in real session:</strong> 10 jobs collected</p>
                </div>
            </div>

            <div class="scraper-card">
                <div class="scraper-card-header">
                    <span class="scraper-card-name">Indeed</span>
                    <div class="scraper-card-badges">
                        <span class="strat-badge strat-browser">Browser Only</span>
                        <span class="strat-badge strat-cdp">Cloudflare Sensitive</span>
                    </div>
                </div>
                <div class="scraper-steps">
                    <p>Indeed uses aggressive Cloudflare protection and has no public API. The scraper relies entirely on browser automation.</p>
                    <ol>
                        <li>Navigate via headless browser with stealth patches</li>
                        <li>Wait for <code>h2.jobTitle</code> or <code>div.jobsearch-SerpJobCard</code></li>
                        <li>Detect Cloudflare challenge page → trigger visible browser fallback</li>
                        <li>Parse job cards from DOM: <code>a.jcs-JobTitle</code>, company from <code>span[data-testid='company-name']</code></li>
                    </ol>
                </div>
            </div>

            <h2>Human-in-the-Loop Flow</h2>
            <p>
                When a scraper encounters a login wall, CAPTCHA, or Cloudflare challenge, the following 
                flow is triggered automatically:
            </p>

            <div class="flow-diagram">
                <div class="flow-node">
                    <div class="flow-node-icon"><i data-lucide="bot" class="flow-node-icon"></i></div>
                    <div class="flow-node-label">Scraper Detects Block</div>
                    <div class="flow-node-sub">0 results returned</div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-node">
                    <div class="flow-node-icon"><i data-lucide="server" class="arch-box-icon"></i></div>
                    <div class="flow-node-label">Open Visible Chrome</div>
                    <div class="flow-node-sub">Navigate to login page</div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-node">
                    <div class="flow-node-icon"><i data-lucide="bell" class="flow-node-icon"></i></div>
                    <div class="flow-node-label">UI Popup</div>
                    <div class="flow-node-sub">Continue / Skip</div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-node">
                    <div class="flow-node-icon"><i data-lucide="user" class="flow-node-icon"></i></div>
                    <div class="flow-node-label">User Solves Challenge</div>
                    <div class="flow-node-sub">Login / CAPTCHA</div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-node">
                    <div class="flow-node-icon"><i data-lucide="check-circle" class="flow-node-icon"></i></div>
                    <div class="flow-node-label">Retry Scrape</div>
                    <div class="flow-node-sub">In visible context</div>
                </div>
            </div>

            <h2>Smart Timing Design</h2>
            <p>
                The base scraper implements two distinct timing mechanisms that are critical for avoiding detection:
            </p>

            <div class="card-grid">
                <div class="doc-card">
                    <h3><code>wait_for_content()</code></h3>
                    <p>
                        Waits for actual DOM elements to appear (CSS selectors), with a configurable timeout. 
                        <strong>Smarter than <code>sleep(4)</code></strong> — returns immediately when content is ready. 
                        Checks for cancellation every 100ms.
                    </p>
                </div>
                <div class="doc-card">
                    <h3><code>human_delay()</code></h3>
                    <p>
                        Random delay between page navigations (1.5–3.0s by default) to mimic human browsing rhythm. 
                        <strong>Required for anti-bot evasion</strong> — sites track inter-request timing as a bot signal. 
                        Randomization is intentional.
                    </p>
                </div>
            </div>
        </div>
    `;
}
