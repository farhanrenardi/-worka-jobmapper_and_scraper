/**
 * Charts — lightweight SVG-based donut and bar charts for the documentation demo.
 * No external dependencies. All rendering is pure DOM/SVG.
 */

const CHART_COLORS = [
    '#5bb8ce',   // cyan
    '#9b87d4',   // violet
    '#d4a74a',   // amber
    '#5fba8a',   // emerald
    '#d47a87',   // rose
    '#6b6b6b',   // slate
    '#B8973A',   // gold
    '#7ec8a0',   // mint
    '#c490c4',   // lavender
    '#cb8e6f',   // peach
];

const CLS_COLORS = {
    'Data Analyst': '#5bb8ce',
    'Data Scientist': '#9b87d4',
    'Management Trainee': '#d4a74a',
    'Consultant': '#5fba8a',
    'Other': '#6b6b6b',
};

const CLS_BADGE = {
    'Data Analyst': 'badge-da',
    'Data Scientist': 'badge-ds',
    'Management Trainee': 'badge-mt',
    'Consultant': 'badge-cons',
    'Other': 'badge-other',
};

function renderDonutChart(dataObj, title) {
    const entries = Object.entries(dataObj).filter(([k, v]) => v > 0);
    const total = entries.reduce((sum, [, v]) => sum + v, 0);
    if (!total) return '<div class="chart-card"><p style="color:var(--text-muted)">No data</p></div>';

    const size = 150;
    const cx = size / 2, cy = size / 2;
    const outerR = 62, innerR = 38;

    let cumulativeAngle = -90; // start at top
    let paths = '';

    entries.forEach(([label, value], i) => {
        const pct = value / total;
        const angle = pct * 360;
        const startAngle = cumulativeAngle;
        const endAngle = startAngle + angle;

        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;

        const x1 = cx + outerR * Math.cos(startRad);
        const y1 = cy + outerR * Math.sin(startRad);
        const x2 = cx + outerR * Math.cos(endRad);
        const y2 = cy + outerR * Math.sin(endRad);
        const x3 = cx + innerR * Math.cos(endRad);
        const y3 = cy + innerR * Math.sin(endRad);
        const x4 = cx + innerR * Math.cos(startRad);
        const y4 = cy + innerR * Math.sin(startRad);

        const largeArc = angle > 180 ? 1 : 0;
        const color = CLS_COLORS[label] || CHART_COLORS[i % CHART_COLORS.length];

        paths += `<path d="M${x1},${y1} A${outerR},${outerR} 0 ${largeArc} 1 ${x2},${y2} L${x3},${y3} A${innerR},${innerR} 0 ${largeArc} 0 ${x4},${y4} Z" fill="${color}" opacity="0.85" stroke="var(--bg-card)" stroke-width="1.5"/>`;
        cumulativeAngle = endAngle;
    });

    // Center text
    const centerText = `<text x="${cx}" y="${cy - 4}" text-anchor="middle" fill="var(--text-primary)" font-size="18" font-weight="700" font-family="var(--font-mono)">${total.toLocaleString()}</text>
    <text x="${cx}" y="${cy + 14}" text-anchor="middle" fill="var(--text-muted)" font-size="9" font-family="var(--font-body)">TOTAL</text>`;

    const legendItems = entries.map(([label, value], i) => {
        const color = CLS_COLORS[label] || CHART_COLORS[i % CHART_COLORS.length];
        const pct = ((value / total) * 100).toFixed(1);
        return `<div class="legend-item">
            <span class="legend-dot" style="background:${color}"></span>
            <span>${escH(label)}</span>
            <span class="legend-value">${value} (${pct}%)</span>
        </div>`;
    }).join('');

    return `<div class="chart-card animate-in">
        <div class="chart-title">${escH(title)}</div>
        <div class="donut-wrapper">
            <svg class="donut-svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
                ${paths}
                ${centerText}
            </svg>
            <div class="donut-legend">${legendItems}</div>
        </div>
    </div>`;
}

function renderBarChart(items, title) {
    if (!items || !items.length) return '';
    const maxVal = Math.max(...items.map(i => i.count));

    const bars = items.map(item => {
        const pct = (item.count / maxVal) * 100;
        // Clean up company name (remove city suffix from Glints format)
        let label = item.company || 'Unknown';
        // Remove common suffixes like "Jakarta Selatan,DKI Jakarta"
        label = label.replace(/(Jakarta|Surabaya|Bandung|Medan|Bali|Tangerang|Sidoarjo|Bekasi|Semarang|Yogyakarta|Banten|Jawa)[^,]*,.*/i, '').trim();
        if (label.length > 30) label = label.substring(0, 28) + '…';

        return `<div class="bar-row">
            <span class="bar-label" title="${escH(item.company)}">${escH(label)}</span>
            <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
            <span class="bar-count">${item.count}</span>
        </div>`;
    }).join('');

    return `<div class="chart-card animate-in">
        <div class="chart-title">${escH(title)}</div>
        <div class="bar-chart">${bars}</div>
    </div>`;
}

function classificationBadge(cls) {
    const badgeClass = CLS_BADGE[cls] || 'badge-other';
    return `<span class="badge ${badgeClass}">${escH(cls || 'Other')}</span>`;
}

function escH(str) {
    if (!str) return '';
    const el = document.createElement('span');
    el.textContent = str;
    return el.innerHTML;
}
