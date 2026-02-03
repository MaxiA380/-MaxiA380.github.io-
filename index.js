// initialization

const RESPONSIVE_WIDTH = 1024

let headerWhiteBg = false
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH
const collapseBtn = document.getElementById("collapse-btn")
const collapseHeaderItems = document.getElementById("collapsed-header-items")

function onHeaderClickOutside(e) {
    if (!collapseHeaderItems.contains(e.target) && !collapseBtn.contains(e.target)) {
        toggleHeader()
    }
}

function toggleHeader() {
    if (isHeaderCollapsed) {
        // Open menu with smooth CSS transform animation (better performance)
        collapseHeaderItems.classList.add("opacity-100")
        collapseHeaderItems.style.transform = "translateX(0)"
        collapseHeaderItems.style.transition = "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-in-out"
        collapseBtn.classList.remove("bi-list")
        collapseBtn.classList.add("bi-x", "max-lg:tw-fixed")
        isHeaderCollapsed = false

        // Prevent body scroll when menu is open
        document.body.style.overflow = "hidden"

        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 10)
    } else {
        // Close menu with smooth animation
        collapseHeaderItems.classList.remove("opacity-100")
        collapseHeaderItems.style.transform = "translateX(100%)"
        collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed")
        collapseBtn.classList.add("bi-list")
        isHeaderCollapsed = true
        
        // Restore body scroll
        document.body.style.overflow = ""
        
        window.removeEventListener("click", onHeaderClickOutside)
    }
}

function responsive() {
    if (window.innerWidth > RESPONSIVE_WIDTH) {
        collapseHeaderItems.style.transform = ""
        collapseHeaderItems.style.transition = ""
        collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed")
        collapseBtn.classList.add("bi-list")
        isHeaderCollapsed = false
        document.body.style.overflow = ""
        window.removeEventListener("click", onHeaderClickOutside)
    } else {
        if (!isHeaderCollapsed) {
            collapseHeaderItems.style.transform = "translateX(100%)"
            collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed")
            collapseBtn.classList.add("bi-list")
            isHeaderCollapsed = true
        }
    }
}

window.addEventListener("resize", responsive)

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href')
        if (href !== '#' && href !== '#!') {
            e.preventDefault()
            const target = document.querySelector(href)
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            }
        }
    })
})

