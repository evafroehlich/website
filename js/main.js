/**
 * Eva-Christin Ernst - Modern Career Portfolio Core Script
 * Features: Light/Dark Theme Switcher, Mobile Hamburger Nav, Timeline Filtering, Scroll Reveal
 */

(() => {
  'use strict';

  // --- 1. Theme Engine (Light / Dark Mode Switcher) ---
  const initThemeEngine = () => {
    const desktopToggle = document.getElementById('theme-toggle-btn');
    const mobileToggle = document.getElementById('mobile-theme-toggle-btn');
    
    if (!desktopToggle && !mobileToggle) return;

    // Toggle theme function
    const toggleTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      try {
        localStorage.setItem('theme', newTheme);
      } catch (e) {
        // Safe fallback in restricted browser environments
      }
      updateThemeIcons(newTheme);
    };

    // Keep icons in sync with current state
    const updateThemeIcons = (theme) => {
      // Toggle button active classes if necessary, or just rely on CSS
      const btns = [desktopToggle, mobileToggle];
      btns.forEach(btn => {
        if (!btn) return;
        if (theme === 'dark') {
          btn.classList.add('dark-active');
        } else {
          btn.classList.remove('dark-active');
        }
      });
    };

    // Add listeners
    if (desktopToggle) desktopToggle.addEventListener('click', toggleTheme);
    if (mobileToggle) mobileToggle.addEventListener('click', toggleTheme);

    // Initial icon state sync
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateThemeIcons(currentTheme);
  };

  // --- 2. Mobile Hamburger Drawer Menu ---
  const initMobileNavigation = () => {
    const hamburgerBtn = document.getElementById('hamburger-menu-btn');
    const mobileMenu = document.getElementById('mobile-dropdown-menu');
    
    if (!hamburgerBtn || !mobileMenu) return;

    const toggleMobileMenu = () => {
      const isOpen = hamburgerBtn.classList.toggle('menu-active');
      mobileMenu.classList.toggle('menu-active');
      
      // Prevent body scrolling when overlay is active
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    hamburgerBtn.addEventListener('click', toggleMobileMenu);

    // Close menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-item');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('menu-active');
        mobileMenu.classList.remove('menu-active');
        document.body.style.overflow = '';
      });
    });
  };

  // --- 3. Experience & Education Timeline Filter ---
  const initTimelineFilters = () => {
    const filterButtons = document.querySelectorAll('.timeline-filter-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (filterButtons.length === 0 || timelineItems.length === 0) return;

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Toggle active button class
        filterButtons.forEach(btn => btn.classList.remove('filter-active'));
        button.classList.add('filter-active');

        const selectedFilter = button.getAttribute('data-filter');

        timelineItems.forEach(item => {
          const itemCategories = item.getAttribute('data-categories').split(' ');
          
          if (selectedFilter === 'all' || itemCategories.includes(selectedFilter)) {
            // Animate show
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0) scale(1)';
            }, 50);
          } else {
            // Animate hide
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px) scale(0.95)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300); // Wait for transition
          }
        });
      });
    });
  };

  // --- 4. Micro scroll reveal animations ---
  const initScrollReveal = () => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            observer.unobserve(entry.target); // Reveal only once
          }
        });
      }, observerOptions);

      revealElements.forEach(el => observer.observe(el));
    } else {
      // Fallback for older browsers
      revealElements.forEach(el => el.classList.add('reveal-active'));
    }
  };

  // --- 5. Project cards details expansion ---
  const initProjectCards = () => {
    const expandButtons = document.querySelectorAll('.project-expand-btn');
    
    expandButtons.forEach(button => {
      button.addEventListener('click', () => {
        const cardBody = button.closest('.project-card').querySelector('.project-card-details');
        const isCollapsed = cardBody.style.maxHeight === '' || cardBody.style.maxHeight === '0px';
        
        // Collapse all others
        document.querySelectorAll('.project-card-details').forEach(details => {
          details.style.maxHeight = '0px';
          details.closest('.project-card').querySelector('.project-expand-btn').textContent = 'Learn More';
        });

        if (isCollapsed) {
          cardBody.style.maxHeight = cardBody.scrollHeight + 'px';
          button.textContent = 'Collapse';
        } else {
          cardBody.style.maxHeight = '0px';
          button.textContent = 'Learn More';
        }
      });
    });
  };

  // DOM Content Loaded Initializer
  document.addEventListener('DOMContentLoaded', () => {
    initThemeEngine();
    initMobileNavigation();
    initTimelineFilters();
    initScrollReveal();
    initProjectCards();
  });

})();
