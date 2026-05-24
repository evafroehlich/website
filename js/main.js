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
        const card = button.closest('.project-card');
        const cardBody = card.querySelector('.project-card-details');
        const isCollapsed = cardBody.style.maxHeight === '' || cardBody.style.maxHeight === '0px';
        
        // Collapse all others
        document.querySelectorAll('.project-card-details').forEach(details => {
          details.style.maxHeight = '0px';
          const otherBtn = details.closest('.project-card').querySelector('.project-expand-btn');
          otherBtn.classList.remove('expanded');
          const txtSpan = otherBtn.querySelector('.btn-text');
          if (txtSpan) txtSpan.textContent = 'Learn More';
        });

        if (isCollapsed) {
          cardBody.style.maxHeight = cardBody.scrollHeight + 'px';
          button.classList.add('expanded');
          const txtSpan = button.querySelector('.btn-text');
          if (txtSpan) txtSpan.textContent = 'Collapse';
        } else {
          cardBody.style.maxHeight = '0px';
          button.classList.remove('expanded');
          const txtSpan = button.querySelector('.btn-text');
          if (txtSpan) txtSpan.textContent = 'Learn More';

          // Scroll back up to the card smoothly
          const cardTop = card.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: cardTop - 85, // 70px header + 15px padding offset
            behavior: 'smooth'
          });
        }
      });
    });
  };

  // --- 6. Projects Section Filter ---
  const initProjectFilters = () => {
    const filterButtons = document.querySelectorAll('.projects-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Toggle active button class
        filterButtons.forEach(btn => btn.classList.remove('filter-active'));
        button.classList.add('filter-active');

        const selectedFilter = button.getAttribute('data-filter');

        projectCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          
          if (selectedFilter === 'all' || cardCategory === selectedFilter) {
            // Animate show
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            }, 50);
          } else {
            // Animate hide
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px) scale(0.95)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300); // Wait for transition
          }
        });
      });
    });
  };

  // --- 7. URL Hash Observer & Auto-Expansion (Deep Linking) ---
  const handleHashLink = () => {
    const hash = window.location.hash;
    if (hash) {
      const targetCard = document.querySelector(hash);
      if (targetCard && targetCard.classList.contains('project-card')) {
        const btn = targetCard.querySelector('.project-expand-btn');
        const cardBody = targetCard.querySelector('.project-card-details');
        const isCollapsed = cardBody.style.maxHeight === '' || cardBody.style.maxHeight === '0px';
        
        if (btn && isCollapsed) {
          // Collapse all others first
          document.querySelectorAll('.project-card-details').forEach(details => {
            details.style.maxHeight = '0px';
            const otherBtn = details.closest('.project-card').querySelector('.project-expand-btn');
            otherBtn.classList.remove('expanded');
            const txtSpan = otherBtn.querySelector('.btn-text');
            if (txtSpan) txtSpan.textContent = 'Learn More';
          });

          // Expand targeted project card
          cardBody.style.maxHeight = cardBody.scrollHeight + 'px';
          btn.classList.add('expanded');
          const txtSpan = btn.querySelector('.btn-text');
          if (txtSpan) txtSpan.textContent = 'Collapse';
          
          // Scroll target card to center of viewport smoothly after a tiny delay
          setTimeout(() => {
            const cardRect = targetCard.getBoundingClientRect();
            const cardTop = cardRect.top + window.scrollY;
            const cardHeight = cardRect.height;
            const viewportHeight = window.innerHeight;
            
            window.scrollTo({
              top: cardTop - (viewportHeight / 2) + (cardHeight / 2),
              behavior: 'smooth'
            });
          }, 150);
        }
      }
    }
  };

  // --- 8. Scroll to Top Floating Button ---
  const initScrollToTop = () => {
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
    if (!scrollToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
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
    initProjectFilters();
    initScrollToTop();
    
    // Process deep link hash anchors on load & hashchange
    handleHashLink();
    window.addEventListener('hashchange', handleHashLink);
  });

})();
