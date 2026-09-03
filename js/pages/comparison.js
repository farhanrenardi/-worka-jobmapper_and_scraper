/**
 * Comparison Page — Worka 2.0 vs Manual Labor Market Surveying Benchmark.
 * Strictly zero emojis. Theme-consistent with dark-gold styling.
 */
function renderComparisonPage() {
    return `
        <div class="animate-in">
            <h1>Manual Process vs. Worka 2.0 Pipeline</h1>
            <p class="page-lead">
                A quantitative benchmarking analysis comparing the traditional manual job search and tracking 
                process against the automated Worka 2.0 ELT data engineering pipeline.
            </p>

            <div class="callout callout-gold">
                <div class="callout-title"><i data-lucide="ruler" class="callout-icon"></i> Evaluation Methodology</div>
                <p>
                    Estimates are based on timed manual trials covering multiple portals (Glints, JobStreet, LinkedIn, 
                    Kalibrr, Talentics) for ~200 job postings across target career tracks (Data Analyst, Data Scientist, 
                    Management Trainee, Consultant). The Worka 2.0 benchmarks reflect actual pipeline telemetry.
                </p>
            </div>

            <h2>Side-by-Side Activity Breakdown</h2>

            <div class="comparison-grid">
                <!-- Manual Column -->
                <div class="comparison-col">
                    <div class="comparison-title"><i data-lucide="user" class="inline-icon"></i> Manual Market Survey</div>

                    <div class="step-item">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <div class="step-label">Authenticate &amp; search across 5 job portals</div>
                            <div class="step-time">~25 min (login walls, search keywords, tabs)</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <div class="step-label">Inspect individual postings and record details into spreadsheet</div>
                            <div class="step-time">~55 min (title, company, URL, location, salary)</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <div class="step-label">Manually read descriptions to classify role track</div>
                            <div class="step-time">~35 min (subjective categorization)</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <div class="step-label">Research each employer to determine IT vs Non-IT sector</div>
                            <div class="step-time">~40 min (search engines, LinkedIn company pages)</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">5</div>
                        <div class="step-content">
                            <div class="step-label">Clean messy spreadsheet text &amp; resolve duplicate postings</div>
                            <div class="step-time">~25 min (manual deduplication)</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">6</div>
                        <div class="step-content">
                            <div class="step-label">Compare resume skills line-by-line against job requirements</div>
                            <div class="step-time">~45 min (inconsistent skill naming)</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">7</div>
                        <div class="step-content">
                            <div class="step-label">Synthesize skill demand charts and compensation trends</div>
                            <div class="step-time">~30 min (pivot tables, formula setup)</div>
                        </div>
                    </div>

                    <div class="time-total">
                        <div class="time-total-number">~4.2 hours</div>
                        <div class="time-total-label">Total Manual Survey Time</div>
                    </div>
                </div>

                <!-- Worka 2.0 Column -->
                <div class="comparison-col gold-border">
                    <div class="comparison-title"><i data-lucide="zap" class="inline-icon"></i> Worka 2.0 ELT Pipeline</div>

                    <div class="step-item">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <div class="step-label">1-Command pipeline trigger</div>
                            <div class="step-time">&lt; 2 seconds (<code>pipeline_runner.py</code>)</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <div class="step-label">Two-tier self-healing concurrent scraping</div>
                            <div class="step-time">~90 seconds (Fast CSS + Gemini fallback)</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <div class="step-label">Immutable Raw Lake landing with SHA256 hash</div>
                            <div class="step-time">&lt; 5 seconds (zero data loss, idempotent)</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <div class="step-label">dbt Core Kimball star schema transformation</div>
                            <div class="step-time">~25 seconds (marts: fact + 3 dimensions)</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">5</div>
                        <div class="step-content">
                            <div class="step-label">Gemini AI role &amp; company classification</div>
                            <div class="step-time">~35 seconds (Gemini Flash 3.7 &gt; 3.6 &gt; 3.5)</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">6</div>
                        <div class="step-content">
                            <div class="step-label">Gemini Embedding 1 generation &amp; hybrid CV match</div>
                            <div class="step-time">~20 seconds (768-dim vector + Jaccard)</div>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">7</div>
                        <div class="step-content">
                            <div class="step-label">FastAPI serving &amp; SPA analytics render</div>
                            <div class="step-time">&lt; 1 second (instantaneous client UI)</div>
                        </div>
                    </div>

                    <div class="time-total" style="border-color: var(--border-gold);">
                        <div class="time-total-number" style="color: var(--gold-light);">&lt; 5 minutes</div>
                        <div class="time-total-label">Total Pipeline Duration (~98% Time Saved)</div>
                    </div>
                </div>
            </div>

            <h2>Efficiency &amp; Data Quality Comparison</h2>
            <div class="doc-table-wrapper">
                <table class="doc-table">
                    <thead>
                        <tr>
                            <th>Evaluation Dimension</th>
                            <th>Manual Job Search</th>
                            <th>Worka 2.0 Pipeline</th>
                            <th>Strategic Advantage</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Execution Duration</strong></td>
                            <td>3.5 – 5.0 hours per run</td>
                            <td>&lt; 5 minutes end-to-end</td>
                            <td>~98% reduction in latency; runs unattended.</td>
                        </tr>
                        <tr>
                            <td><strong>Data Schema &amp; Storage</strong></td>
                            <td>Unstructured ad-hoc spreadsheets</td>
                            <td>Kimball Star Schema in PostgreSQL</td>
                            <td>Normalized fact and dimension tables ready for SQL analytics.</td>
                        </tr>
                        <tr>
                            <td><strong>Deduplication Reliability</strong></td>
                            <td>Manual visual scanning (high error rate)</td>
                            <td>Composite SHA256 hash (<code>url|title|company</code>)</td>
                            <td>Deterministic idempotency; zero duplicate entries across batches.</td>
                        </tr>
                        <tr>
                            <td><strong>Resilience to UI Drift</strong></td>
                            <td>Scraping scripts break on class changes</td>
                            <td>Two-tier self-healing with Gemini cascade</td>
                            <td>Automatically recovers from front-end changes without downtime.</td>
                        </tr>
                        <tr>
                            <td><strong>Candidate-to-Job Matching</strong></td>
                            <td>Subjective reading, easily biases</td>
                            <td>Hybrid scoring (60% vector + 40% Jaccard)</td>
                            <td>Mathematical, objective ranking with explicit skill gap diagnostics.</td>
                        </tr>
                        <tr>
                            <td><strong>Data Freshness</strong></td>
                            <td>Rapidly decays; stale within days</td>
                            <td>Repeatable on demand via CLI or API</td>
                            <td>Continuous labor market intelligence with zero recurring toil.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
