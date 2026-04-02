/**
 * Blue Key Mortgage - Senior Resource Hub
 * Main JavaScript file for interactive elements
 * Designed with senior accessibility in mind
 */

document.addEventListener('DOMContentLoaded', function() {
    // ===========================================
    // Mobile Navigation
    // ===========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navOverlay = document.querySelector('.nav-overlay');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            if (navOverlay) {
                navOverlay.classList.toggle('active');
            }
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking overlay
        if (navOverlay) {
            navOverlay.addEventListener('click', function() {
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                this.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Close menu when pressing Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mainNav.classList.contains('active')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                if (navOverlay) navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ===========================================
    // Dropdown Menus (Desktop)
    // ===========================================
    const dropdownTriggers = document.querySelectorAll('.nav-link[aria-haspopup="true"]');
    
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(event) {
            // Only handle on desktop (screen width > 768px)
            if (window.innerWidth <= 768) {
                return; // Let mobile menu handle it
            }
            
            event.preventDefault();
            event.stopPropagation();
            
            const dropdown = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other dropdowns
            dropdownTriggers.forEach(otherTrigger => {
                if (otherTrigger !== this) {
                    otherTrigger.setAttribute('aria-expanded', 'false');
                    const otherDropdown = otherTrigger.nextElementSibling;
                    if (otherDropdown && otherDropdown.classList.contains('dropdown')) {
                        otherDropdown.style.opacity = '0';
                        otherDropdown.style.visibility = 'hidden';
                        otherDropdown.style.transform = 'translateY(-10px)';
                    }
                }
            });
            
            // Toggle current dropdown
            this.setAttribute('aria-expanded', !isExpanded);
            if (dropdown && dropdown.classList.contains('dropdown')) {
                if (!isExpanded) {
                    dropdown.style.opacity = '1';
                    dropdown.style.visibility = 'visible';
                    dropdown.style.transform = 'translateY(0)';
                } else {
                    dropdown.style.opacity = '0';
                    dropdown.style.visibility = 'hidden';
                    dropdown.style.transform = 'translateY(-10px)';
                }
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) return;
        
        const isDropdownTrigger = event.target.matches('.nav-link[aria-haspopup="true"]') || 
                                  event.target.closest('.nav-link[aria-haspopup="true"]');
        const isInsideDropdown = event.target.closest('.dropdown');
        
        if (!isDropdownTrigger && !isInsideDropdown) {
            dropdownTriggers.forEach(trigger => {
                trigger.setAttribute('aria-expanded', 'false');
                const dropdown = trigger.nextElementSibling;
                if (dropdown && dropdown.classList.contains('dropdown')) {
                    dropdown.style.opacity = '0';
                    dropdown.style.visibility = 'hidden';
                    dropdown.style.transform = 'translateY(-10px)';
                }
            });
        }
    });
    
    // Close dropdowns when pressing Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && window.innerWidth > 768) {
            dropdownTriggers.forEach(trigger => {
                trigger.setAttribute('aria-expanded', 'false');
                const dropdown = trigger.nextElementSibling;
                if (dropdown && dropdown.classList.contains('dropdown')) {
                    dropdown.style.opacity = '0';
                    dropdown.style.visibility = 'hidden';
                    dropdown.style.transform = 'translateY(-10px)';
                }
            });
        }
    });
    
    // ===========================================
    // Smooth Scrolling for Anchor Links
    // ===========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or if it's a dropdown trigger
            if (href === '#' || this.getAttribute('aria-haspopup') === 'true') {
                return;
            }
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                event.preventDefault();
                
                // Close mobile menu if open
                if (mainNav && mainNav.classList.contains('active')) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    if (navOverlay) navOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Calculate position (account for fixed header)
                const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });
    
    // ===========================================
    // Form Accessibility Enhancements
    // ===========================================
    // Add focus styles to form elements
    const formInputs = document.querySelectorAll('input, textarea, select, button');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });
    
    // ===========================================
    // Current Year in Footer
    // ===========================================
    const yearElements = document.querySelectorAll('#current-year, .current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
    
    // ===========================================
    // Print Button (if needed)
    // ===========================================
    const printButtons = document.querySelectorAll('.print-button');
    printButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.print();
        });
    });
    
    // ===========================================
    // Font Size Adjuster (Accessibility)
    // ===========================================
    // Create font size controls if not present
    if (!document.querySelector('.font-size-controls')) {
        const fontSizeControls = document.createElement('div');
        fontSizeControls.className = 'font-size-controls visually-hidden';
        fontSizeControls.innerHTML = `
            <button class="font-size-decrease" aria-label="Decrease text size">A-</button>
            <button class="font-size-reset" aria-label="Reset text size">A</button>
            <button class="font-size-increase" aria-label="Increase text size">A+</button>
        `;
        
        // Insert at beginning of body
        document.body.insertBefore(fontSizeControls, document.body.firstChild);
        
        // Add functionality
        const root = document.documentElement;
        const defaultFontSize = 18;
        
        document.querySelector('.font-size-decrease')?.addEventListener('click', function() {
            let currentSize = parseInt(getComputedStyle(root).fontSize) || defaultFontSize;
            root.style.fontSize = Math.max(currentSize - 2, 14) + 'px';
            localStorage.setItem('preferredFontSize', root.style.fontSize);
        });
        
        document.querySelector('.font-size-reset')?.addEventListener('click', function() {
            root.style.fontSize = defaultFontSize + 'px';
            localStorage.setItem('preferredFontSize', root.style.fontSize);
        });
        
        document.querySelector('.font-size-increase')?.addEventListener('click', function() {
            let currentSize = parseInt(getComputedStyle(root).fontSize) || defaultFontSize;
            root.style.fontSize = Math.min(currentSize + 2, 24) + 'px';
            localStorage.setItem('preferredFontSize', root.style.fontSize);
        });
        
        // Load saved preference
        const savedSize = localStorage.getItem('preferredFontSize');
        if (savedSize) {
            root.style.fontSize = savedSize;
        }
    }
    
    // ===========================================
    // Lazy Loading Images (if needed)
    // ===========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img.lazy').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ===========================================
    // Console Welcome Message (Development)
    // ===========================================
    console.log(
        '%c👵 Welcome to Blue Key Mortgage - Senior Resource Hub 👴\n' +
        '%cThis website is designed with Ontario seniors in mind.\n' +
        'Accessibility and warm, clear communication are our priorities.',
        'color: #2A6BB0; font-size: 16px; font-weight: bold;',
        'color: #666666; font-size: 14px;'
    );
});

// ===========================================
// Window Resize Handler
// ===========================================
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Close mobile menu if switching to desktop
        if (window.innerWidth > 768) {
            const menuToggle = document.querySelector('.menu-toggle');
            const mainNav = document.querySelector('.main-nav');
            const navOverlay = document.querySelector('.nav-overlay');
            
            if (menuToggle && mainNav && mainNav.classList.contains('active')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                if (navOverlay) navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }, 250);
});