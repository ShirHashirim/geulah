// Mobile menu functionality
(function() {
    'use strict';

    function initMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        const navOverlay = document.getElementById('navOverlay');

        // Ensure elements exist before attaching listeners
        if (!hamburger || !navLinks || !navOverlay) {
            console.warn('Mobile menu elements not found');
            return;
        }

        function toggleMenu() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }

        function closeMenu() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Event listeners
        hamburger.addEventListener('click', toggleMenu);
        navOverlay.addEventListener('click', closeMenu);

        // Close menu when clicking on a link
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                closeMenu();
            }
        });

        // Close menu on window resize if it's open
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // Initialize after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
})();
