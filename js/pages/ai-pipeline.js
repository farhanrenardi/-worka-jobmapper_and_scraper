/**
 * AI Pipeline Page — Worka 2.0 Gemini AI Classification, Gemini Embedding 1, and Hybrid CV Matcher.
 * Strictly zero emojis. Theme-consistent with dark-gold styling.
 */
function renderAiPipelinePage() {
    return `
        <div class="animate-in">
            <h1>AI Pipeline &amp; Hybrid CV Matching</h1>
            <p class="page-lead">
                The AI layer in Worka 2.0 powers intelligent job role categorization, company classification, 
                high-dimensional vector embeddings, and a dual-faceted candidate-to-job matching engine 
                utilizing Google Gemini models.
            </p>

            <h2>Hybrid Candidate-to-Job Matcher Architecture</h2>
            <p>
                Standard keyword matching produces high false-negative rates by missing semantic synonyms, 
                while pure vector search often matches generic prose while ignoring strict technical requirements. 
                Worka 2.0 solves this with a calibrated hybrid architecture combining 768-dimensional dense vectors 
                with discrete skill taxonomy overlap:
            </p>

            ${renderHybridMatcherSvg()}

            <h2>Mathematical Scoring Formulation</h2>
            <p>
                The composite matching algorithm computes a weighted combination of semantic vector similarity 
                and discrete taxonomy overlap:
            </p>

            <div class="callout callout-gold">
                <div class="callout-title"><i data-lucide="calculator" class="callout-icon"></i> Composite Match Formula</div>
                <pre style="margin: var(--space-sm) 0; background: var(--bg-base); padding: var(--space-md); border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 13px; color: var(--gold-light);">
MatchScore = (0.60 * CosineSimilarity(V_cv, V_job)) + (0.40 * JaccardSimilarity(S_cv, S_job))
                </pre>
                <ul style="margin-top: var(--space-sm); font-size: 13px; color: var(--text-secondary);">
                    <li><strong>Cosine Similarity (60% weight):</strong> Measures the angular alignment between 768-dimensional dense embeddings: <code>dot(A, B) / (norm(A) * norm(B))</code>.</li>
                    <li><strong>Jaccard Skill Overlap (40% weight):</strong> Measures intersection over union of normalized technical skill sets: <code>|S_cv &cap; S_job| / |S_cv &cup; S_job|</code>.</li>
                    <li><strong>Diagnostic Output:</strong> Generates ranked job recommendations along with explicit <code>matched_skills</code> and actionable <code>missing_skills</code> lists.</li>
                </ul>
            </div>

            <h2>Google Gemini Model Hierarchy</h2>
            <p>
                Worka 2.0 integrates with Google AI Studio using a resilient model cascade designed to maintain 
                zero-cost operation under free-tier quotas:
            </p>

            <div class="doc-table-wrapper">
                <table class="doc-table">
                    <thead>
                        <tr>
                            <th>Tier Level</th>
                            <th>Model Identifier</th>
                            <th>Role in Pipeline</th>
                            <th>Rate Limits &amp; Quotas</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Primary LLM</strong></td>
                            <td><code>gemini-3.7-flash</code></td>
                            <td>Primary role classification, company type inference, and self-healing DOM extraction.</td>
                            <td>15 RPM / 1M TPM (Free Tier)</td>
                        </tr>
                        <tr>
                            <td><strong>First Fallback</strong></td>
                            <td><code>gemini-3.6-flash</code></td>
                            <td>Automated secondary fallback when primary latency or rate limit backoff triggers.</td>
                            <td>15 RPM / 1M TPM (Free Tier)</td>
                        </tr>
                        <tr>
                            <td><strong>Second Fallback</strong></td>
                            <td><code>gemini-3.5-flash</code></td>
                            <td>Tertiary failover ensuring uninterruptible batch pipeline execution.</td>
                            <td>15 RPM / 1M TPM (Free Tier)</td>
                        </tr>
                        <tr>
                            <td><strong>Vector Embedding</strong></td>
                            <td><code>Gemini Embedding 1</code> (text-embedding-004)</td>
                            <td>Generates 768-dimensional dense vector representations for semantic matching and catalog indexing.</td>
                            <td>1500 RPM (Free Tier)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2>Stage 1 — Job Role Classification</h2>
            <p>
                Each ingested job posting is classified into one of five standard labor market categories:
            </p>
            <div style="display:flex;gap:var(--space-sm);flex-wrap:wrap;margin:var(--space-md) 0 var(--space-lg)">
                <span class="badge badge-da">Data Analyst</span>
                <span class="badge badge-ds">Data Scientist</span>
                <span class="badge badge-mt">Management Trainee</span>
                <span class="badge badge-cons">Consultant</span>
                <span class="badge badge-other">Other</span>
            </div>

            <h3>LLM Classification Prompt</h3>
            <div class="prompt-box">
                <div class="prompt-label">System Instruction — Role &amp; Taxonomy Classifier</div>
You are an expert technical recruiter and labor market analyst.
Given the job title and truncated description, classify the posting into EXACTLY ONE category:
[Data Analyst, Data Scientist, Management Trainee, Consultant, Other]

Extract required technical skills into a normalized comma-separated list.
Respond ONLY with a valid JSON object:
{
  "classification": "&lt;category&gt;",
  "skills": ["Python", "SQL", "dbt", "..."]
}

Job Title: {title}
Job Description: {description}
            </div>

            <h3>Rule-Based Fallback Heuristics</h3>
            <p>
                If API keys are omitted or rate limits are exhausted, the pipeline falls back to deterministic keyword regexes:
            </p>
            <div class="doc-table-wrapper">
                <table class="doc-table">
                    <thead>
                        <tr><th>Target Category</th><th>Keyword Patterns</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><span class="badge badge-da">Data Analyst</span></td><td><code>data analyst</code>, <code>business intelligence</code>, <code>bi analyst</code>, <code>analytics engineer</code></td></tr>
                        <tr><td><span class="badge badge-ds">Data Scientist</span></td><td><code>data scientist</code>, <code>machine learning</code>, <code>ml engineer</code>, <code>ai engineer</code></td></tr>
                        <tr><td><span class="badge badge-mt">Management Trainee</span></td><td><code>management trainee</code>, <code>graduate trainee</code>, <code>mt program</code>, <code>odp</code></td></tr>
                        <tr><td><span class="badge badge-cons">Consultant</span></td><td><code>consultant</code>, <code>advisory</code>, <code>strategy consultant</code>, <code>konsultan</code></td></tr>
                    </tbody>
                </table>
            </div>

            <h2>Stage 2 — Company Type Classification</h2>
            <p>
                Distinguishes between technology-centric software enterprises (<strong>IT Company</strong>) 
                and traditional industry employers (<strong>Non IT Company</strong>). This enables job seekers to filter 
                between software product engineering environments and corporate enterprise roles.
            </p>
        </div>
    `;
}
