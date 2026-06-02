/**
 * AI Pipeline Page — Classification, prospecting, prompts, batch processing.
 */
function renderAiPipelinePage() {
    return `
        <div class="animate-in">
            <h1>AI Pipeline</h1>
            <p class="page-lead">
                The AI pipeline transforms raw, unstructured job postings into structured, classified data 
                using OpenAI's <code>gpt-4o-mini</code> model and Tavily Search API for web enrichment. 
                A rule-based fallback ensures the system works even without API keys.
            </p>

            <h2>Pipeline Overview</h2>
            <div class="flow-diagram">
                <div class="flow-node">
                    <div class="flow-node-icon"><i data-lucide="file-text" class="flow-node-icon"></i></div>
                    <div class="flow-node-label">Raw Job Data</div>
                    <div class="flow-node-sub">Title + Description</div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-node">
                    <div class="flow-node-icon"><i data-lucide="tag" class="flow-node-icon"></i></div>
                    <div class="flow-node-label">Role Classification</div>
                    <div class="flow-node-sub">GPT-4o-mini</div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-node">
                    <div class="flow-node-icon"><i data-lucide="search" class="flow-node-icon"></i></div>
                    <div class="flow-node-label">Web Search</div>
                    <div class="flow-node-sub">Tavily API</div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-node">
                    <div class="flow-node-icon"><i data-lucide="building" class="flow-node-icon"></i></div>
                    <div class="flow-node-label">Company Type</div>
                    <div class="flow-node-sub">IT / Non-IT</div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-node">
                    <div class="flow-node-icon"><i data-lucide="coins" class="flow-node-icon"></i></div>
                    <div class="flow-node-label">Prospecting</div>
                    <div class="flow-node-sub">Salary + Workload</div>
                </div>
            </div>

            <h2>Stage 1 — Job Role Classification</h2>
            <p>
                Each scraped job is classified into exactly one of <strong>5 categories</strong>:
            </p>
            <div style="display:flex;gap:var(--space-sm);flex-wrap:wrap;margin:var(--space-md) 0 var(--space-lg)">
                <span class="badge badge-da">Data Analyst</span>
                <span class="badge badge-ds">Data Scientist</span>
                <span class="badge badge-mt">Management Trainee</span>
                <span class="badge badge-cons">Consultant</span>
                <span class="badge badge-other">Other</span>
            </div>

            <h3>LLM Prompt</h3>
            <div class="prompt-box">
                <div class="prompt-label">System Prompt — Role Classification</div>
You are a job classification assistant.
Given the job title and description, classify into EXACTLY ONE of these categories:
Data Analyst, Data Scientist, Management Trainee, Consultant, Other

If it doesn't clearly fit any of the first four, use "Other".

Respond with ONLY a JSON object: {"classification": "&lt;category&gt;"}

Job Title: {title}
Job Description (truncated): {description}
            </div>

            <h3>Rule-Based Fallback</h3>
            <p>
                When no OpenAI API key is configured, the system falls back to a <strong>keyword-matching</strong> 
                heuristic. This ensures basic functionality even without AI:
            </p>
            <div class="doc-table-wrapper">
                <table class="doc-table">
                    <thead>
                        <tr><th>Classification</th><th>Pattern Keywords</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><span class="badge badge-da">Data Analyst</span></td><td><code>data analyst</code>, <code>business analyst</code>, <code>bi analyst</code>, <code>analytics</code></td></tr>
                        <tr><td><span class="badge badge-ds">Data Scientist</span></td><td><code>data scientist</code>, <code>machine learning</code>, <code>ml engineer</code>, <code>ai engineer</code></td></tr>
                        <tr><td><span class="badge badge-mt">Management Trainee</span></td><td><code>management trainee</code>, <code>graduate trainee</code>, <code>mt program</code>, <code>officer development</code></td></tr>
                        <tr><td><span class="badge badge-cons">Consultant</span></td><td><code>consultant</code>, <code>consulting</code>, <code>advisory</code>, <code>konsultan</code></td></tr>
                    </tbody>
                </table>
            </div>

            <h2>Stage 2 — Company Type Classification</h2>
            <p>
                The company type classifier determines whether each company's <strong>primary business</strong> 
                is technology/software (IT Company) or something else (Non IT Company). This involves two sub-steps:
            </p>

            <h3>Step 2a — Web Search Enrichment (Tavily)</h3>
            <p>
                Before asking the LLM, the system searches the web for context about the company:
            </p>
            <pre><code>POST https://api.tavily.com/search
{
    "query": "{company} company profile industry Indonesia",
    "max_results": 3,
    "search_depth": "basic"
}</code></pre>
            <p>
                The top 3 search results (truncated to 200 chars each) are concatenated and passed as 
                <code>Additional context</code> to the LLM prompt. This significantly improves accuracy 
                for lesser-known Indonesian companies.
            </p>

            <h3>Step 2b — LLM Classification</h3>
            <div class="prompt-box">
                <div class="prompt-label">System Prompt — Company Type</div>
Determine if this company is an "IT Company" or "Non IT Company".

An "IT Company" is one whose PRIMARY business is technology, software,
internet services, telecommunications, or digital products
(e.g., Google, Tokopedia, Telkom).

A "Non IT Company" is everything else (banking, FMCG, manufacturing,
consulting, etc.) even if they use technology internally.

Company name: {company}
Additional context: {web_search_results}

Respond with ONLY a JSON object:
{"company_type": "IT Company"} or {"company_type": "Non IT Company"}
            </div>

            <h2>Stage 3 — AI Prospecting & Assessment</h2>
            <p>
                An optional assessment module evaluates each job's <strong>salary potential</strong> and 
                <strong>workload expectations</strong>. It first searches the web for salary reviews 
                and company culture information, then uses the LLM to synthesize an assessment.
            </p>

            <div class="prompt-box">
                <div class="prompt-label">System Prompt — Prospect Assessment</div>
You are a career advisor AI. Research and assess the following job opportunity.

Company: {company}
Job Role: {role}
Classification: {classification}
Web Research Context: {tavily_search_results}

Based on the context, provide:
1. salary_estimate: estimated monthly gross salary range in IDR
2. workload_score: 1-10 rating where 1=very light, 10=extremely heavy
3. prospect_level: "Low", "Medium", or "High"

Respond with ONLY a JSON object:
{"salary_estimate": "Rp X-Y juta", "workload_score": N, "prospect_level": "High/Medium/Low"}
            </div>

            <h2>Batch Processing & Performance</h2>
            <p>
                Jobs are classified in <strong>batches of 20</strong> using <code>asyncio.gather</code> 
                for concurrent processing. Several optimizations prevent wasted API calls:
            </p>

            <div class="card-grid">
                <div class="doc-card">
                    <h3><i data-lucide="refresh-cw" class="inline-icon"></i> Concurrent Execution</h3>
                    <p>
                        Role and company classification run <strong>in parallel</strong> via <code>asyncio.gather</code>. 
                        Within each batch, all 20 jobs are classified concurrently.
                    </p>
                </div>
                <div class="doc-card">
                    <h3><i data-lucide="package" class="inline-icon"></i> Result Caching</h3>
                    <p>
                        A <code>role_cache</code> and <code>company_cache</code> store resolved classifications. 
                        Duplicate job titles or company names don't trigger additional API calls.
                    </p>
                </div>
                <div class="doc-card">
                    <h3><i data-lucide="lock" class="inline-icon"></i> API Semaphore</h3>
                    <p>
                        A <code>Semaphore(3)</code> limits concurrent OpenAI calls to 3, preventing 
                        CPU/memory spikes and API rate limiting.
                    </p>
                </div>
                <div class="doc-card">
                    <h3><i data-lucide="puzzle" class="inline-icon"></i> Pending Task Dedup</h3>
                    <p>
                        A <code>_pending</code> dict stores in-flight Tasks. Two coroutines for the same 
                        key within one gather call share a single Task — no race conditions, no duplicate calls.
                    </p>
                </div>
            </div>

            <h2>Configuration</h2>
            <div class="doc-table-wrapper">
                <table class="doc-table">
                    <thead>
                        <tr><th>Parameter</th><th>Default</th><th>Description</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><code>LLM_MODEL</code></td><td><code>gpt-4o-mini</code></td><td>OpenAI model used for classification</td></tr>
                        <tr><td><code>LLM_TEMPERATURE</code></td><td><code>0.1</code></td><td>Low temperature for deterministic classifications</td></tr>
                        <tr><td><code>max_tokens</code> (role)</td><td><code>60</code></td><td>Role classification is short — save tokens</td></tr>
                        <tr><td><code>max_tokens</code> (company)</td><td><code>40</code></td><td>Company type is even shorter</td></tr>
                        <tr><td><code>max_tokens</code> (prospect)</td><td><code>120</code></td><td>Prospect assessment needs slightly more</td></tr>
                        <tr><td><code>Semaphore</code></td><td><code>3</code></td><td>Max concurrent OpenAI API calls</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
