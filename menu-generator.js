// Menu generator - dynamically creates navigation menus from menu-config.js
// This script runs on page load and populates both header nav and footer quick links

(function() {
    'use strict';

    function generateMenu() {
        const lang = menuConfig.detectLanguage();
        const currentPage = menuConfig.getCurrentPage();
        const menuItems = menuConfig.getMenuItems(lang);

        // Generate header navigation
        const navLinks = document.getElementById('navLinks');
        if (navLinks) {
            // Clear existing items (keep the ul element)
            navLinks.innerHTML = '';

            // Add menu items
            menuItems.forEach(item => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = item.url;
                a.textContent = item.text;

                // Mark current page as active
                const itemFileName = item.url.split('/').pop();
                if (itemFileName === currentPage) {
                    a.classList.add('active');
                }

                li.appendChild(a);
                navLinks.appendChild(li);
            });
        }

        // Generate footer quick links
        const footerQuickLinks = document.querySelector('.footer-section:nth-child(2) ul');
        if (footerQuickLinks) {
            // Clear existing items
            footerQuickLinks.innerHTML = '';

            // Add menu items (excluding books and choza in footer, or include them - your choice)
            menuItems.forEach(item => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = item.url;
                a.textContent = item.text;
                li.appendChild(a);
                footerQuickLinks.appendChild(li);
            });
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', generateMenu);
    } else {
        generateMenu();
    }
})();
