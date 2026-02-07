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
        
        // Initialize i18n after components are loaded
        if (window.i18n) {
            window.i18n().translatePage();
        }
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

/**
 * Language Switcher Functions
 */

// Toggle language dropdown menu
function toggleLanguageMenu() {
    const menu = document.getElementById('language-menu');
    if (menu) {
        menu.classList.toggle('tw-hidden');
    }
}

// Close language menu when clicking outside
document.addEventListener('click', (event) => {
    const languageButton = document.getElementById('language-button');
    const languageMenu = document.getElementById('language-menu');
    
    if (languageButton && languageMenu && 
        !languageButton.contains(event.target) && 
        !languageMenu.contains(event.target)) {
        languageMenu.classList.add('tw-hidden');
    }
});

// Change language
function changeLanguage(lang) {
    if (window.i18n) {
        window.i18n().setLanguage(lang);
        
        // Close the menu
        const menu = document.getElementById('language-menu');
        if (menu) {
            menu.classList.add('tw-hidden');
        }
    }
}

// Make functions globally available
window.toggleLanguageMenu = toggleLanguageMenu;
window.changeLanguage = changeLanguage;
