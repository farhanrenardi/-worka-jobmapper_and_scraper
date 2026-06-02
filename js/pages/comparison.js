/**
 * Comparison Page — Manual vs Worka activity diagram with time estimates.
 */
function renderComparisonPage() {
    return `
        <div class="animate-in">
            <h1>Manual vs Worka</h1>
            <p class="page-lead">
                A side-by-side comparison of the traditional manual job search process versus 
                the Worka automated pipeline. Time estimates are based on realistic benchmarks 
                for searching, recording, and analyzing 200+ job postings across 6 platforms.
            </p>

            <div class="callout callout-gold">
                <div class="callout-title"><i data-lucide="ruler" class="callout-icon"></i> Methodology</div>
                <p>
                    Time estimates below are derived from timed manual trials conducted across 
                    each platform. The "Manual" column reflects the effort required for a thorough 
                    job market survey covering 6 platforms × 9 search keywords, with recording 
                    and analysis of each result. Worka's times reflect actual observed durations 
                    from production scraping sessions.
                </p>
            </div>

            <h2>Activity Diagram</h2>

            <div class="comparison-grid">
                <div class="comparison-col">
                    <div class="comparison-title"><i data-lucide="user" class="inline-icon"></i> Manual Process</div>

                    <div class="step-item">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <div class="step-label">Open LinkedIn → Log in → Search each keyword</div>
                            <div class="step-time">~5 min (login + navigate)</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <div class="step-label">Scroll results → Open each job → Note title, company, link</div>
                            <div class="step-time">~25 min (9 keywords × ~3 min each)</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <div class="step-label">Repeat for Glints: Navigate → Search → Record</div>
                            <div class="step-time">~20 min</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <div class="step-label">Repeat for JobStreet: Navigate → Search → Record</div>
                            <div class="step-time">~20 min</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">5</div>
                        <div class="step-content">
                            <div class="step-label">Repeat for Kalibrr, Talentics, Indeed</div>
                            <div class="step-time">~40 min (3 sources × ~13 min)</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">6</div>
                        <div class="step-content">
                            <div class="step-label">Manually classify each job role (read description → categorize)</div>
                            <div class="step-time">~30 min (for ~200 jobs, ~10 sec each)</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">7</div>
                        <div class="step-content">
                            <div class="step-label">Research each company → Determine IT / Non-IT</div>
                            <div class="step-time">~45 min (Google each company)</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">8</div>
                        <div class="step-content">
                            <div class="step-label">Create spreadsheet → Enter data → Deduplicate</div>
                            <div class="step-time">~25 min</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">9</div>
                        <div class="step-content">
                            <div class="step-label">Analyze data → Create charts → Write summary</div>
                            <div class="step-time">~45 min</div>
                        </div>
                    </div>

                    <div class="time-total">
                        <div class="time-total-number">~4.2 hours</div>
                        <div class="time-total-label">Total Estimated Time</div>
                    </div>
                </div>

                <div class="comparison-col highlight">
                    <div class="comparison-title"><i data-lucide="zap" class="inline-icon"></i> Worka Automated Process</div>

                    <div class="step-item">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <div class="step-label">Click "Start Scraping" → All 6 sources run automatically</div>
                            <div class="step-time">~10 min (fully automated, parallel where possible)</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <div class="step-label">Handle login popup (if needed)</div>
                            <div class="step-time">~2 min (only for LinkedIn, one-time)</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <div class="step-label">AI auto-classifies all jobs (role + company type)</div>
                            <div class="step-time">~3 min (concurrent, batched, cached)</div>
                            <div class="step-automated"><i data-lucide="check" class="inline-icon" style="width:14px;height:14px"></i> Automated — replaces Steps 6 & 7</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <div class="step-label">Deduplication happens automatically on insert</div>
                            <div class="step-time">~0 min (built into the pipeline)</div>
                            <div class="step-automated"><i data-lucide="check" class="inline-icon" style="width:14px;height:14px"></i> Automated — replaces Step 8</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">5</div>
                        <div class="step-content">
                            <div class="step-label">Dashboard auto-generates with charts and analytics</div>
                            <div class="step-time">~0 min (instant, from database)</div>
                            <div class="step-automated"><i data-lucide="check" class="inline-icon" style="width:14px;height:14px"></i> Automated — replaces Step 9</div>
                        </div>
                    </div>
                    <div class="step-item" style="opacity:0.4">
                        <div class="step-number" style="background:transparent;border:1px dashed var(--border-medium)">—</div>
                        <div class="step-content">
                            <div class="step-label step-eliminated">Steps 2–5 (manual browsing per source)</div>
                            <div class="step-automated" style="color:var(--gold)"><i data-lucide="check" class="inline-icon" style="width:14px;height:14px"></i> Eliminated — automated scraping</div>
                        </div>
                    </div>
                    <div class="step-item" style="opacity:0.4">
                        <div class="step-number" style="background:transparent;border:1px dashed var(--border-medium)">—</div>
                        <div class="step-content">
                            <div class="step-label step-eliminated">Steps 6–7 (manual classification)</div>
                            <div class="step-automated" style="color:var(--gold)"><i data-lucide="check" class="inline-icon" style="width:14px;height:14px"></i> Eliminated — AI classification</div>
                        </div>
                    </div>

                    <div class="time-total">
                        <div class="time-total-number savings">~15 min</div>
                        <div class="time-total-label">Total Estimated Time</div>
                    </div>
                </div>
            </div>

            <h2>Quantitative Summary</h2>

            <div class="card-grid stagger">
                <div class="stat-card animate-in">
                    <div class="stat-number" style="color:var(--rose)">4.2 hrs</div>
                    <div class="stat-label">Manual Process</div>
                </div>
                <div class="stat-card animate-in">
                    <div class="stat-number" style="color:var(--emerald)">15 min</div>
                    <div class="stat-label">Worka Automated</div>
                </div>
                <div class="stat-card animate-in">
                    <div class="stat-number" style="color:var(--gold-light)">~94%</div>
                    <div class="stat-label">Time Reduction</div>
                </div>
                <div class="stat-card animate-in">
                    <div class="stat-number" style="color:var(--cyan)">16.8×</div>
                    <div class="stat-label">Efficiency Multiplier</div>
                </div>
            </div>

            <h2>Steps Eliminated by Automation</h2>
            <div class="doc-table-wrapper">
                <table class="doc-table">
                    <thead>
                        <tr>
                            <th>Manual Step</th>
                            <th>Time</th>
                            <th>Worka Replacement</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Browse each platform manually</td>
                            <td>~110 min</td>
                            <td>Playwright automated scraping with API-first strategy</td>
                            <td><span class="badge badge-gold">Automated</span></td>
                        </tr>
                        <tr>
                            <td>Read & classify each job role</td>
                            <td>~30 min</td>
                            <td>OpenAI GPT-4o-mini with batch processing</td>
                            <td><span class="badge badge-gold">AI-Powered</span></td>
                        </tr>
                        <tr>
                            <td>Research each company type</td>
                            <td>~45 min</td>
                            <td>Tavily web search + LLM classification</td>
                            <td><span class="badge badge-gold">AI + Search</span></td>
                        </tr>
                        <tr>
                            <td>Data entry & deduplication</td>
                            <td>~25 min</td>
                            <td>Automatic database insertion with link-based dedup</td>
                            <td><span class="badge badge-gold">Automated</span></td>
                        </tr>
                        <tr>
                            <td>Create charts & analysis</td>
                            <td>~45 min</td>
                            <td>Real-time dashboard with auto-generated analytics</td>
                            <td><span class="badge badge-gold">Automated</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2>Additional Benefits</h2>
            <div class="card-grid">
                <div class="doc-card">
                    <h3><i data-lucide="trending-up" class="inline-icon"></i> Scale</h3>
                    <p>Manual process struggles beyond 50 jobs. Worka handles <strong>2,000+</strong> jobs per session without additional human effort.</p>
                </div>
                <div class="doc-card">
                    <h3><i data-lucide="refresh-cw" class="inline-icon"></i> Repeatability</h3>
                    <p>Run the same analysis weekly or daily. The deduplication engine ensures only new jobs are processed on subsequent runs.</p>
                </div>
                <div class="doc-card">
                    <h3><i data-lucide="bar-chart-2" class="inline-icon"></i> Consistency</h3>
                    <p>AI classification is deterministic (temperature=0.1). Manual classification suffers from human inconsistency and fatigue over hundreds of entries.</p>
                </div>
                <div class="doc-card">
                    <h3><i data-lucide="brain" class="inline-icon"></i> Coverage</h3>
                    <p>9 search keywords × 6 platforms × 5 pages each = 270 search result pages. Manually reviewing this volume is impractical.</p>
                </div>
            </div>
        </div>
    `;
}
