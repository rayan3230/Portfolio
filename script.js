document.addEventListener('DOMContentLoaded', () => {

  
    const mobileMenuButton = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const bodyElement = document.body; 

    if (mobileMenuButton && mainNav) {
        mobileMenuButton.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            bodyElement.classList.toggle('mobile-nav-open'); 
            
            const icon = mobileMenuButton.querySelector('i');
            if (mainNav.classList.contains('open')) {
                icon.className = 'fas fa-times'; 
            } else {
                icon.className = 'fas fa-bars'; 
            }
        });
    }

    // Close mobile menu when a nav link is clicked
    if (mainNav) {
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('open')) {
                    mainNav.classList.remove('open');
                    bodyElement.classList.remove('mobile-nav-open');
                     const icon = mobileMenuButton.querySelector('i');
                     icon.className = 'fas fa-bars'; 
                }
            });
        });
    }

    const themeToggleButton = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const toggleIcon = themeToggleButton ? themeToggleButton.querySelector('i') : null;

    // Function to apply theme
    function applyTheme(theme) {
        if (theme === 'dark') {
            bodyElement.classList.add('dark-theme');
            if (toggleIcon) toggleIcon.className = 'fas fa-moon'; 
            localStorage.setItem('theme', 'dark');
        } else {
            bodyElement.classList.remove('dark-theme');
            if (toggleIcon) toggleIcon.className = 'fas fa-sun'; 
            localStorage.setItem('theme', 'light');
        }
    }

    if (currentTheme) {
        applyTheme(currentTheme);
    } else if (prefersDark) {
        applyTheme('dark'); 
    } else {
        applyTheme('light');
    }
    
    // Add event listener for the button
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const newTheme = bodyElement.classList.contains('dark-theme') ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // --- Set Dynamic Copyright Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Smooth Scrolling Logic ---
    function smoothScrollTo(targetPosition) {
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // Header Nav Links for Smooth Scrolling
    document.querySelectorAll('#main-nav a[href^="#"]').forEach(anchor => { // Updated selector
        anchor.addEventListener('click', function (e) {
            // Check if mobile nav is open and close it before scrolling
            if (mainNav && mainNav.classList.contains('open')) {
                 mainNav.classList.remove('open');
                 bodyElement.classList.remove('mobile-nav-open');
                 const icon = mobileMenuButton.querySelector('i');
                 icon.className = 'fas fa-bars';
            }
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            // Check if it's a valid ID selector and not just '#'
            if (targetId.length > 1 && targetId.startsWith('#')) { 
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = document.getElementById('main-header')?.offsetHeight || 0; // Target new header
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    smoothScrollTo(offsetPosition);
                }
            }
        });
    });

    // Back to Top Link
    const backToTopLink = document.getElementById('back-to-top');
    if (backToTopLink) {
        backToTopLink.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScrollTo(0); // Scroll to the very top
        });
    }

    // --- Lightbox Functionality ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const galleryImages = document.querySelectorAll('.image-gallery .gallery-img'); // Target specific gallery images
    const closeBtn = document.querySelector('.lightbox-close');

    if (lightbox && lightboxImg && lightboxCaption && closeBtn) {
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                lightbox.style.display = 'block';
                lightboxImg.src = img.src;
                lightboxCaption.innerHTML = img.alt;
                document.body.style.overflow = 'hidden'; // Prevent scrolling background
            });
        });

        // Close lightbox when clicking the close button
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        });

        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) { // Only close if clicking the background overlay
                lightbox.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    } else {
        console.warn('Lightbox elements not found. Lightbox functionality disabled.');
    }

    console.log('Portfolio script enhanced with lightbox, dynamic year, and footer links loaded');

    // --- Scroll Animations --- 
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                    // Optional: unobserve after animation 
                    // observer.unobserve(entry.target);
                }
                // Optional: remove class if element scrolls out of view
                // else {
                //     entry.target.classList.remove('fade-in-visible');
                // }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers: just make them visible
        animatedElements.forEach(el => {
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
        });
    }

    console.log('Portfolio script with MAIN HEADER, theme switcher, animations, etc. loaded'); // Updated log message
});