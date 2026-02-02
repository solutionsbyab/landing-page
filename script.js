/**
 * Solutions by AB — Enhanced JavaScript
 * Smooth animations, interactions, and micro-interactions
 */

(function() {
  'use strict';

  // ========================================
  // MOBILE MENU
  // ========================================
  
  const burgerBtn = document.getElementById('burgerBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const menuWrap = document.getElementById('menuWrap');
  
  function lockScroll(lock) {
    document.body.style.overflow = lock ? 'hidden' : '';
  }
  
  function openDropdown() {
    if (!burgerBtn || !dropdownMenu) return;
    burgerBtn.setAttribute('aria-expanded', 'true');
    burgerBtn.classList.add('is-open');
    dropdownMenu.hidden = false;
    lockScroll(true);
  }
  
  function closeDropdown() {
    if (!burgerBtn || !dropdownMenu) return;
    burgerBtn.setAttribute('aria-expanded', 'false');
    burgerBtn.classList.remove('is-open');
    dropdownMenu.hidden = true;
    lockScroll(false);
  }
  
  if (burgerBtn && dropdownMenu && menuWrap) {
    burgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = burgerBtn.getAttribute('aria-expanded') === 'true';
      isOpen ? closeDropdown() : openDropdown();
    });
    
    document.addEventListener('click', (e) => {
      if (!menuWrap.contains(e.target)) closeDropdown();
    });
    
    dropdownMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDropdown);
    });
    
    // Close on scroll/touch
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(closeDropdown, 100);
    }, { passive: true });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDropdown();
    });
  }

  // ========================================
  // SMOOTH DRAG-TO-SCROLL
  // ========================================
  
  document.querySelectorAll('.snap-scroller').forEach(scroller => {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let velocity = 0;
    let lastX = 0;
    let lastTime = 0;
    let animationFrame = null;
    
    const getX = (e) => {
      if (e.type.includes('touch')) {
        return e.touches[0]?.pageX || e.changedTouches[0]?.pageX || 0;
      }
      return e.pageX;
    };
    
    const startDrag = (e) => {
      isDown = true;
      scroller.classList.add('is-dragging');
      startX = getX(e) - scroller.offsetLeft;
      scrollLeft = scroller.scrollLeft;
      lastX = startX;
      lastTime = Date.now();
      velocity = 0;
      cancelAnimationFrame(animationFrame);
    };
    
    const endDrag = () => {
      if (!isDown) return;
      isDown = false;
      scroller.classList.remove('is-dragging');
      
      // Apply momentum scrolling (desktop only)
      if (Math.abs(velocity) > 1) {
        const momentum = () => {
          if (Math.abs(velocity) > 0.5) {
            scroller.scrollLeft -= velocity * 0.5;
            velocity *= 0.92;
            animationFrame = requestAnimationFrame(momentum);
          }
        };
        momentum();
      }
    };
    
    const drag = (e) => {
      if (!isDown) return;
      
      const x = getX(e) - scroller.offsetLeft;
      const walk = (x - startX) * 1.0;
      
      // Calculate velocity
      const now = Date.now();
      const dt = now - lastTime;
      if (dt > 0) {
        velocity = (x - lastX) / dt * 16;
      }
      lastX = x;
      lastTime = now;
      
      scroller.scrollLeft = scrollLeft - walk;
    };
    
    // Mouse events
    scroller.addEventListener('mousedown', startDrag);
    document.addEventListener('mouseleave', endDrag);
    document.addEventListener('mouseup', endDrag);
    scroller.addEventListener('mousemove', drag);
    
    // Touch events - let native scroll work but track for styling
    scroller.addEventListener('touchstart', (e) => {
      scroller.classList.add('is-touching');
    }, { passive: true });
    
    scroller.addEventListener('touchend', () => {
      scroller.classList.remove('is-touching');
    }, { passive: true });
  });

  // ========================================
  // REVEAL ANIMATIONS (Intersection Observer)
  // ========================================
  
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Small delay for staggered effect when multiple elements appear
          requestAnimationFrame(() => {
            entry.target.classList.add('is-visible');
          });
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: show all immediately
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========================================
  // HEADER SCROLL EFFECT
  // ========================================
  
  const topbar = document.querySelector('.topbar');
  let lastScrollY = 0;
  let ticking = false;
  
  if (topbar) {
    const updateHeader = () => {
      const scrollY = window.scrollY;
      
      // Add shadow when scrolled
      if (scrollY > 10) {
        topbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
      } else {
        topbar.style.boxShadow = '';
      }
      
      lastScrollY = scrollY;
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }

  // ========================================
  // CONTACT FORM HANDLING
  // ========================================
  
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  
  if (contactForm) {
    // Input focus animations
    contactForm.querySelectorAll('input, select, textarea').forEach(input => {
      const wrapper = input.parentElement;
      
      input.addEventListener('focus', () => {
        wrapper.classList.add('is-focused');
      });
      
      input.addEventListener('blur', () => {
        wrapper.classList.remove('is-focused');
        if (input.value) {
          wrapper.classList.add('has-value');
        } else {
          wrapper.classList.remove('has-value');
        }
      });
    });
    
    // Form submission
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="btn__spinner" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="2" stroke-dasharray="32" stroke-linecap="round"/>
        </svg>
        <span>Sending...</span>
      `;
      
      // Simulate send (replace with actual form handling)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success state
      submitBtn.innerHTML = `
        <svg viewBox="0 0 20 20" fill="none" style="width:18px;height:18px">
          <path d="M4 10L8 14L16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Sent!</span>
      `;
      
      if (formNote) {
        formNote.textContent = 'Thanks! We\'ll be in touch soon. (Demo mode — connect to Formspree/Netlify for real submissions)';
        formNote.style.opacity = '1';
      }
      
      // Reset after delay
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        
        setTimeout(() => {
          if (formNote) formNote.style.opacity = '0';
        }, 5000);
      }, 2000);
    });
  }

  // ========================================
  // BUTTON RIPPLE EFFECT
  // ========================================
  
  document.querySelectorAll('.btn--primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        animation: ripple-expand 0.6s ease-out forwards;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple animation to stylesheet
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-expand {
      to {
        width: 300px;
        height: 300px;
        opacity: 0;
      }
    }
    
    .btn__spinner {
      width: 18px;
      height: 18px;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .snap-scroller.is-dragging {
      cursor: grabbing;
      scroll-snap-type: none;
    }
    
    .snap-scroller.is-dragging .snap-card {
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);

  // ========================================
  // PARALLAX EFFECT FOR BACKGROUND GLOWS
  // ========================================
  
  const glows = document.querySelectorAll('.bg-glow');
  
  if (glows.length > 0 && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 30;
    });
    
    const animateGlows = () => {
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;
      
      glows.forEach((glow, i) => {
        const factor = i === 0 ? 1 : -0.7;
        glow.style.transform = `translate(${currentX * factor}px, ${currentY * factor}px)`;
      });
      
      requestAnimationFrame(animateGlows);
    };
    
    animateGlows();
  }

  // ========================================
  // SERVICE CARD TILT EFFECT
  // ========================================
  
  if (window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) {
    document.querySelectorAll('.service-card, .snap-card').forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    });
  }

  // ========================================
  // STEP PROGRESS ANIMATION
  // ========================================
  
  const steps = document.querySelectorAll('.step');
  
  if (steps.length > 0 && 'IntersectionObserver' in window) {
    const stepObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate progress bars with stagger
          steps.forEach((step, i) => {
            setTimeout(() => {
              step.classList.add('is-visible');
            }, i * 200);
          });
          stepObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });
    
    stepObserver.observe(steps[0].parentElement);
  }

  // ========================================
  // TYPING EFFECT FOR HERO (Optional)
  // ========================================
  
  // Uncomment below for a typing effect on the hero title
  /*
  const heroTitle = document.querySelector('.hero__title-line--accent');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid var(--accent)';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
      } else {
        heroTitle.style.borderRight = 'none';
      }
    };
    
    setTimeout(typeWriter, 500);
  }
  */

  // ========================================
  // PREFERS REDUCED MOTION
  // ========================================
  
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--duration-fast', '0.01s');
    document.documentElement.style.setProperty('--duration-normal', '0.01s');
    document.documentElement.style.setProperty('--duration-slow', '0.01s');
  }

  console.log('✨ Solutions by AB — Enhanced site loaded');
})();
