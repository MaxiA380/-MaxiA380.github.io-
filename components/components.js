/**
 * Component Loader
 * Dynamically loads header and footer components to avoid code duplication
 */

class ComponentLoader {
    static async loadComponent(elementId, componentPath) {
        const element = document.getElementById(elementId);
        if (!element) return;

        try {
            const response = await fetch(componentPath);
            if (!response.ok) throw new Error(`Failed to load ${componentPath}`);
            const html = await response.text();
            element.innerHTML = html;
        } catch (error) {
            console.error(`Error loading component: ${error.message}`);
        }
    }

    static async init() {
        // Load header and footer components
        await Promise.all([
            this.loadComponent('header-component', './components/header.html'),
            this.loadComponent('footer-component', './components/footer.html')
        ]);

        // Re-initialize header toggle functionality after components are loaded
        this.initHeaderToggle();
        
        // Highlight active nav link
        this.highlightActiveLink();
    }

    static initHeaderToggle() {
        // Re-bind the collapse button and header items after dynamic load
        window.collapseBtn = document.getElementById("collapse-btn");
        window.collapseHeaderItems = document.getElementById("collapsed-header-items");
        window.isHeaderCollapsed = window.innerWidth < 1024;
    }

    static highlightActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const headerLinks = document.querySelectorAll('.header-links');
        
        headerLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('tw-text-brand-blue', 'tw-font-semibold');
            }
        });
    }
}

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    ComponentLoader.init();
});
