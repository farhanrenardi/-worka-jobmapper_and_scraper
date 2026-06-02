/**
 * Overview Page — Project background, motivation, and key stats.
 */
function renderOverviewPage() {
    return `
        <div class="animate-in">
            <h1>Worka — Automated Job Mapping Tool</h1>
            <p class="page-lead">
                An end-to-end automated system for scraping, classifying, and analyzing job postings 
                from multiple Indonesian tech job portals — powered by Playwright browser automation 
                and OpenAI language models.
            </p>

            <div class="card-grid stagger">
                <div class="stat-card animate-in">
                    <div class="stat-number">2,007</div>
                    <div class="stat-label">Jobs Scraped</div>
                </div>
                <div class="stat-card animate-in">
                    <div class="stat-number">6</div>
                    <div class="stat-label">Data Sources</div>
                </div>
                <div class="stat-card animate-in">
                    <div class="stat-number">5</div>
                    <div class="stat-label">AI Classifications</div>
                </div>
                <div class="stat-card animate-in">
                    <div class="stat-number">~85%</div>
                    <div class="stat-label">Time Saved</div>
                </div>
            </div>

            <h2>Background & Motivation</h2>
            <p>
                As a job seeker targeting specific career tracks — <strong>Data Analyst</strong>, 
                <strong>Data Scientist</strong>, <strong>Management Trainee</strong>, and 
                <strong>Consultant</strong> — I faced a persistent challenge: <em>the Indonesian job market 
                is fragmented across multiple platforms</em>, each with its own interface, search logic, and 
                anti-bot mechanisms.
            </p>
            <p>
                Answering a seemingly simple question required significant manual effort:
            </p>

            <div class="callout callout-gold">
                <div class="callout-title"><i data-lucide="help-circle" class="callout-icon"></i> The Core Question</div>
                <p>
                    <strong>"What roles are currently trending in the Indonesian job market, 
                    and where should I focus my career efforts?"</strong>
                </p>
                <p>
                    To answer this quantitatively, I needed data from multiple sources — not 
                    just impressions or anecdotal evidence.
                </p>
            </div>

            <p>
                Manually browsing through LinkedIn, Glints, JobStreet, Kalibrr, Talentics, and Indeed 
                to collect, categorize, and analyze hundreds of job postings would take 
                <strong>3–5 hours per session</strong>. And this data becomes stale within days.
            </p>

            <h2>The Solution</h2>
            <p>
                <strong>Worka</strong> automates the entire data pipeline — from scraping raw job postings 
                across 6 platforms to AI-powered classification and interactive analytics:
            </p>

            <div class="flow-diagram">
                <div class="flow-node">
                    <div class="flow-node-icon"><i data-lucide="search" class="flow-node-icon"></i></div>
                    <div class="flow-node-label">Multi-Source Scraping</div>
                    <div class="flow-node-sub">6 job portals</div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-node">
                    <div class="flow-node-icon"><i data-lucide="filter" class="flow-node-icon"></i></div>
                    <div class="flow-node-label">Data Parsing</div>
                    <div class="flow-node-sub">Structured extraction</div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-node">
                    <div class="flow-node-icon"><i data-lucide="bot" class="flow-node-icon"></i></div>
                    <div class="flow-node-label">AI Classification</div>
                    <div class="flow-node-sub">OpenAI + Tavily</div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-node">
                    <div class="flow-node-icon"><i data-lucide="database" class="flow-node-icon"></i></div>
                    <div class="flow-node-label">Database</div>
                    <div class="flow-node-sub">PostgreSQL / SQLite</div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-node">
                    <div class="flow-node-icon"><i data-lucide="bar-chart-2" class="flow-node-icon"></i></div>
                    <div class="flow-node-label">Dashboard</div>
                    <div class="flow-node-sub">Interactive analytics</div>
                </div>
            </div>

            <h2>Key Features</h2>
            <div class="card-grid">
                <div class="doc-card">
                    <h3><i data-lucide="search" class="inline-icon"></i> Multi-Source Scraping</h3>
                    <p>Automated scraping from LinkedIn, Glints, JobStreet, Kalibrr, Talentics, and Indeed with intelligent fallback strategies.</p>
                </div>
                <div class="doc-card">
                    <h3><i data-lucide="bot" class="inline-icon"></i> AI Classification</h3>
                    <p>Automatic job role and company type classification using OpenAI <code>gpt-4o-mini</code> with Tavily web search enrichment.</p>
                </div>
                <div class="doc-card">
                    <h3><i data-lucide="shield" class="inline-icon"></i> Anti-Bot Evasion</h3>
                    <p>7+ stealth patches at the browser level — webdriver flag, chrome runtime, permissions API, plugins, mimeTypes, and more.</p>
                </div>
                <div class="doc-card">
                    <h3><i data-lucide="user" class="inline-icon"></i> Human-in-the-Loop</h3>
                    <p>When scrapers encounter login walls or CAPTCHAs, a popup appears in the UI allowing manual intervention without stopping the pipeline.</p>
                </div>
                <div class="doc-card">
                    <h3><i data-lucide="bar-chart-2" class="inline-icon"></i> Interactive Dashboard</h3>
                    <p>Real-time visualization of classification distributions, top hiring companies, and prospect leaderboards.</p>
                </div>
                <div class="doc-card">
                    <h3><i data-lucide="download" class="inline-icon"></i> CSV Export</h3>
                    <p>One-click export of all mapping results into a spreadsheet format for further analysis.</p>
                </div>
            </div>

            <h2>What This Documentation Covers</h2>
            <p>This documentation site serves as a <strong>Proof of Concept</strong> for the Worka project:</p>
            <ul>
                <li><strong>Architecture</strong> — System design and data flow</li>
                <li><strong>Scraping Engine</strong> — Deep dive into all 6 scraper implementations</li>
                <li><strong>AI Pipeline</strong> — Classification and prospecting with actual prompts</li>
                <li><strong>Manual vs Worka</strong> — Quantitative comparison with time estimates</li>
                <li><strong>Interactive Demo</strong> — Real data from a live scraping session (2,007 jobs)</li>
                <li><strong>Technology Stack</strong> — Full technical details and setup guide</li>
            </ul>
        </div>
    `;
}
