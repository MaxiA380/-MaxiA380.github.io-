// initialization

const RESPONSIVE_WIDTH = 1024

let headerWhiteBg = false
window.isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH
window.collapseBtn = document.getElementById("collapse-btn")
window.collapseHeaderItems = document.getElementById("collapsed-header-items")

function onHeaderClickOutside(e) {
    if (!window.collapseHeaderItems.contains(e.target) && !window.collapseBtn.contains(e.target)) {
        toggleHeader()
    }
}

window.toggleHeader = function() {
    if (window.isHeaderCollapsed) {
        // Open menu with smooth CSS transform animation (better performance)
        window.collapseHeaderItems.classList.add("opacity-100")
        window.collapseHeaderItems.style.transform = "translateX(0)"
        window.collapseHeaderItems.style.transition = "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-in-out"
        window.collapseBtn.classList.remove("bi-list")
        window.collapseBtn.classList.add("bi-x", "max-lg:tw-fixed")
        window.isHeaderCollapsed = false

        // Prevent body scroll when menu is open
        document.body.style.overflow = "hidden"

        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 10)
    } else {
        // Close menu with smooth animation
        window.collapseHeaderItems.classList.remove("opacity-100")
        window.collapseHeaderItems.style.transform = "translateX(100%)"
        window.collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed")
        window.collapseBtn.classList.add("bi-list")
        window.isHeaderCollapsed = true
        
        // Restore body scroll
        document.body.style.overflow = ""
        
        window.removeEventListener("click", onHeaderClickOutside)
    }
}

function responsive() {
    if (window.innerWidth > RESPONSIVE_WIDTH) {
        window.collapseHeaderItems.style.transform = ""
        window.collapseHeaderItems.style.transition = ""
        window.collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed")
        window.collapseBtn.classList.add("bi-list")
        window.isHeaderCollapsed = false
        document.body.style.overflow = ""
        window.removeEventListener("click", onHeaderClickOutside)
    } else {
        if (!window.isHeaderCollapsed) {
            window.collapseHeaderItems.style.transform = "translateX(100%)"
            window.collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed")
            window.collapseBtn.classList.add("bi-list")
            window.isHeaderCollapsed = true
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

// ==================== ANIMATED STATISTICS COUNTER ====================
function animateCounter(element, target, duration = 2000) {
    const suffix = element.dataset.suffix || ''
    const startValue = 0
    const endValue = parseFloat(target)
    const hasDecimal = target.toString().includes('.')
    const decimalPlaces = hasDecimal ? target.toString().split('.')[1].length : 0
    
    const startTime = performance.now()
    
    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4)
    }
    
    function update(currentTime) {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easeOutQuart(progress)
        
        const currentValue = startValue + (endValue - startValue) * easedProgress
        
        if (hasDecimal) {
            element.textContent = currentValue.toFixed(decimalPlaces) + suffix
        } else {
            element.textContent = Math.floor(currentValue) + suffix
        }
        
        if (progress < 1) {
            requestAnimationFrame(update)
        } else {
            element.textContent = target + suffix
        }
    }
    
    requestAnimationFrame(update)
}

// Initialize stats counter animation when section is visible
function initStatsAnimation() {
    const statsSections = ['stats-section', 'about-stats-section']
    
    statsSections.forEach(sectionId => {
        const statsSection = document.getElementById(sectionId)
        if (!statsSection) return
        
        const counters = statsSection.querySelectorAll('[data-count-to]')
        let hasAnimated = false
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true
                    
                    // Stagger the animations slightly for a nice effect
                    counters.forEach((counter, index) => {
                        setTimeout(() => {
                            const target = counter.dataset.countTo
                            animateCounter(counter, target, 2000)
                        }, index * 100) // 100ms delay between each counter
                    })
                    
                    // Unobserve after animation starts
                    observer.unobserve(entry.target)
                }
            })
        }, {
            threshold: 0.3 // Trigger when 30% of section is visible
        })
        
        observer.observe(statsSection)
    })
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStatsAnimation)
} else {
    initStatsAnimation()
}

