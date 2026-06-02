/**
 * Demo Page — Interactive dashboard with real data from the SQLite backup.
 * Loads data from static JSON files (no backend required).
 */

let _demoJobs = [];
let _demoDashboard = null;
let _demoPage = 1;
let _demoPageSize = 15;
let _demoFilter = { classification: 'All', source: 'All', search: '' };

function renderDemoPage() {
    return `
        <div class="animate-in">
            <h1>Interactive Demo</h1>
            <p class="page-lead">
                Live dashboard powered by real data from a Worka scraping session conducted on 
                <strong>April 20, 2026</strong>. All charts and tables below are rendered client-side 
                from pre-exported JSON — no backend server required.
            </p>

            <div class="callout callout-info">
                <div class="callout-title"><i data-lucide="info" class="callout-icon"></i> About This Data</div>
                <p>
                    This demo uses <strong>2,007 real job postings</strong> scraped from Glints, JobStreet, 
                    Kalibrr, and Talentics in a single automated session. All data represents publicly 
                    available job listings. A sample of 200 jobs is loaded for the interactive table below.
                </p>
            </div>

            <div id="demo-loading" style="text-align:center;padding:var(--space-2xl);color:var(--text-muted)">
                Loading data...
            </div>

            <div id="demo-content" style="display:none">
                <div id="demo-stats" class="card-grid stagger"></div>

                <h2>Classification Distribution</h2>
                <div id="demo-charts" class="chart-grid"></div>

                <h2>Top Hiring Companies</h2>
                <div id="demo-top-companies"></div>

                <h2>Job Listings</h2>
                <div class="demo-filter-bar" id="demo-filters">
                    <select class="demo-select" id="demo-cls-filter">
                        <option value="All">All Classifications</option>
                        <option value="Data Analyst">Data Analyst</option>
                        <option value="Data Scientist">Data Scientist</option>
                        <option value="Management Trainee">Management Trainee</option>
                        <option value="Consultant">Consultant</option>
                        <option value="Other">Other</option>
                    </select>
                    <select class="demo-select" id="demo-src-filter">
                        <option value="All">All Sources</option>
                        <option value="glints">Glints</option>
                        <option value="jobstreet">JobStreet</option>
                        <option value="kalibrr">Kalibrr</option>
                        <option value="talentics">Talentics</option>
                    </select>
                    <input type="text" class="demo-search" id="demo-search" placeholder="Search by job title or company...">
                </div>

                <div id="demo-table-container"></div>
                <div id="demo-pagination" class="demo-pagination"></div>
            </div>
        </div>
    `;
}

async function initDemoPage() {
    try {
        const [jobsResp, dashResp] = await Promise.all([
            fetch('data/jobs.json').then(r => r.json()),
            fetch('data/dashboard.json').then(r => r.json()),
        ]);
        _demoJobs = jobsResp;
        _demoDashboard = dashResp;

        document.getElementById('demo-loading').style.display = 'none';
        document.getElementById('demo-content').style.display = 'block';

        renderDemoStats();
        renderDemoCharts();
        renderDemoTopCompanies();
        renderDemoTable();

        // Attach filter listeners
        document.getElementById('demo-cls-filter')?.addEventListener('change', (e) => {
            _demoFilter.classification = e.target.value;
            _demoPage = 1;
            renderDemoTable();
        });
        document.getElementById('demo-src-filter')?.addEventListener('change', (e) => {
            _demoFilter.source = e.target.value;
            _demoPage = 1;
            renderDemoTable();
        });

        let searchTimeout;
        document.getElementById('demo-search')?.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                _demoFilter.search = e.target.value.toLowerCase();
                _demoPage = 1;
                renderDemoTable();
            }, 250);
        });
    } catch (e) {
        const el = document.getElementById('demo-loading');
        if (el) el.innerHTML = `<p style="color:var(--rose)">Failed to load demo data. Make sure the data/ folder contains jobs.json and dashboard.json.</p>`;
        console.error('Demo load error:', e);
    }
}

function renderDemoStats() {
    const d = _demoDashboard;
    const el = document.getElementById('demo-stats');
    if (!el || !d) return;

    const byType = d.by_company_type || {};
    el.innerHTML = `
        <div class="stat-card animate-in">
            <div class="stat-number">${(d.total_jobs || 0).toLocaleString()}</div>
            <div class="stat-label">Total Jobs</div>
        </div>
        <div class="stat-card animate-in">
            <div class="stat-number">${d.classifications_count || Object.keys(d.by_classification || {}).length}</div>
            <div class="stat-label">Classifications</div>
        </div>
        <div class="stat-card animate-in">
            <div class="stat-number">${(byType['IT Company'] || 0)} / ${(byType['Non IT Company'] || 0)}</div>
            <div class="stat-label">IT / Non-IT</div>
        </div>
        <div class="stat-card animate-in">
            <div class="stat-number">${d.sources_count || Object.keys(d.by_source || {}).length}</div>
            <div class="stat-label">Data Sources</div>
        </div>
    `;
}

function renderDemoCharts() {
    const d = _demoDashboard;
    const el = document.getElementById('demo-charts');
    if (!el || !d) return;

    const roleChart = renderDonutChart(d.by_classification || {}, 'Job Classification Distribution');
    const typeChart = renderDonutChart(d.by_company_type || {}, 'Company Type Distribution');
    const sourceChart = renderDonutChart(d.by_source || {}, 'Source Distribution');
    el.innerHTML = roleChart + typeChart + sourceChart;
}

function renderDemoTopCompanies() {
    const d = _demoDashboard;
    const el = document.getElementById('demo-top-companies');
    if (!el || !d || !d.top_hiring_companies) return;

    el.innerHTML = renderBarChart(d.top_hiring_companies, 'Top 10 Hiring Companies');
}

function getFilteredJobs() {
    return _demoJobs.filter(j => {
        if (_demoFilter.classification !== 'All' && j.classification !== _demoFilter.classification) return false;
        if (_demoFilter.source !== 'All' && j.source !== _demoFilter.source) return false;
        if (_demoFilter.search) {
            const s = _demoFilter.search;
            const text = `${j.job_role} ${j.company} ${j.job_description || ''}`.toLowerCase();
            if (!text.includes(s)) return false;
        }
        return true;
    });
}

function renderDemoTable() {
    const container = document.getElementById('demo-table-container');
    const pagEl = document.getElementById('demo-pagination');
    if (!container) return;

    const filtered = getFilteredJobs();
    const totalPages = Math.ceil(filtered.length / _demoPageSize);
    if (_demoPage > totalPages) _demoPage = Math.max(1, totalPages);

    const start = (_demoPage - 1) * _demoPageSize;
    const pageJobs = filtered.slice(start, start + _demoPageSize);

    if (filtered.length === 0) {
        container.innerHTML = `<div class="doc-card" style="text-align:center;color:var(--text-muted)">No jobs match the current filters.</div>`;
        if (pagEl) pagEl.innerHTML = '';
        return;
    }

    const rows = pageJobs.map(j => {
        const cls = classificationBadge(j.classification);
        let company = j.company || 'Unknown';
        // Clean up company names from Glints format
        company = company.replace(/(Jakarta|Surabaya|Bandung|Medan|Bali|Tangerang|Sidoarjo|Bekasi|Semarang|Yogyakarta|Banten|Jawa)[^,]*,.*/i, '').trim();
        if (company.length > 35) company = company.substring(0, 33) + '…';
        const source = j.source || '-';

        return `<tr>
            <td title="${escH(j.company)}">${escH(company)}</td>
            <td class="wrap">${escH(j.job_role)}</td>
            <td>${cls}</td>
            <td><span class="badge badge-source">${escH(source)}</span></td>
            <td>${j.link ? `<a href="${escH(j.link)}" target="_blank" rel="noopener">View →</a>` : '-'}</td>
        </tr>`;
    }).join('');

    container.innerHTML = `
        <div class="demo-table-wrap">
            <table class="demo-table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Job Role</th>
                        <th>Classification</th>
                        <th>Source</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;

    // Pagination
    if (pagEl) {
        pagEl.innerHTML = `
            <div class="demo-pagination-info">
                Showing ${start + 1}–${Math.min(start + _demoPageSize, filtered.length)} of ${filtered.length} jobs
            </div>
            <div class="demo-pagination-btns">
                <button class="demo-pg-btn" id="demo-prev" ${_demoPage <= 1 ? 'disabled' : ''}>← Prev</button>
                <button class="demo-pg-btn" id="demo-next" ${_demoPage >= totalPages ? 'disabled' : ''}>Next →</button>
            </div>
        `;
        document.getElementById('demo-prev')?.addEventListener('click', () => { _demoPage--; renderDemoTable(); });
        document.getElementById('demo-next')?.addEventListener('click', () => { _demoPage++; renderDemoTable(); });
    }
}
