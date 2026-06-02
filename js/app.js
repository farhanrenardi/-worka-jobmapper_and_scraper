/**
 * App.js — SPA router and navigation controller for the documentation site.
 * Manages page transitions, sidebar navigation, and mobile menu.
 */

const PAGES = {
    'overview':     { title: 'Overview',         render: renderOverviewPage,      init: null },
    'architecture': { title: 'Architecture',     render: renderArchitecturePage,  init: null },
    'scraping':     { title: 'Scraping Engine',  render: renderScrapingPage,      init: null },
    'ai-pipeline':  { title: 'AI Pipeline',      render: renderAiPipelinePage,    init: null },
    'comparison':   { title: 'Manual vs Worka',  render: renderComparisonPage,    init: null },
    'demo':         { title: 'Interactive Demo',  render: renderDemoPage,          init: initDemoPage },
    'tech-stack':   { title: 'Technology Stack',  render: renderTechStackPage,     init: null },
};

let _currentPage = 'overview';

document.addEventListener('DOMContentLoaded', () => {
    // Determine initial page from URL hash
    const hash = window.location.hash.replace('#', '');
    if (hash && PAGES[hash]) {
        _currentPage = hash;
    }

    // Render initial page
    navigateTo(_currentPage, false);

    // Attach nav link listeners
    document.querySelectorAll('.nav-link[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            if (page && PAGES[page]) {
                navigateTo(page, true);
                closeMobileMenu();
            }
        });
    });

    // Mobile menu
    const menuBtn = document.getElementById('mobile-menu-btn');
    const overlay = document.getElementById('mobile-overlay');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            document.querySelector('.docs-sidebar')?.classList.toggle('open');
            overlay?.classList.toggle('show');
        });
    }
    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }

    // Handle browser back/forward
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '');
        if (hash && PAGES[hash] && hash !== _currentPage) {
            navigateTo(hash, false);
        }
    });
});

function navigateTo(pageId, pushHash) {
    const page = PAGES[pageId];
    if (!page) return;

    _currentPage = pageId;

    // Update hash
    if (pushHash) {
        window.location.hash = pageId;
    }

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector(`.nav-link[data-page="${pageId}"]`)?.classList.add('active');

    // Transition content
    const contentInner = document.getElementById('docs-content-inner');
    if (!contentInner) return;

    contentInner.classList.add('fade-out');

    setTimeout(() => {
        // Render page
        contentInner.innerHTML = page.render();

        // Update document title
        document.title = `${page.title} — Worka Documentation`;

        // Scroll to top
        contentInner.scrollTop = 0;
        window.scrollTo(0, 0);

        // Remove fade
        contentInner.classList.remove('fade-out');

        // Initialize page (if it has async data loading)
        if (page.init) {
            page.init();
        }

        if (window.lucide) {
            lucide.createIcons();
        }
    }, 200);
}

function closeMobileMenu() {
    document.querySelector('.docs-sidebar')?.classList.remove('open');
    document.getElementById('mobile-overlay')?.classList.remove('show');
}
