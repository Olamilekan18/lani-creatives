// LANI CREATIVES — Core Functionality
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initActiveNav();
  initContactForm();
  initCustomDropdown();
});

// --- Navbar scroll effect ---
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const onScroll = () => {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
      nav.classList.remove('py-6');
      nav.classList.add('py-3');
    } else {
      nav.classList.remove('scrolled');
      nav.classList.add('py-6');
      nav.classList.remove('py-3');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// --- Mobile Menu ---
function initMobileMenu() {
  const btn = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const links = menu ? menu.querySelectorAll('a') : [];
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('active');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// --- Smooth Scroll ---
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
}

// --- Active Nav Highlighting ---
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-20% 0px -80% 0px' });

  sections.forEach(section => observer.observe(section));
}

// --- Contact Form ---
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>Message Sent ✓</span>';
    btn.disabled = true;
    btn.classList.add('opacity-70');
    setTimeout(() => {
      form.reset();
      btn.innerHTML = originalText;
      btn.disabled = false;
      btn.classList.remove('opacity-70');
    }, 3000);
  });
}

// --- Custom Dropdown ---
function initCustomDropdown() {
  const dropdowns = document.querySelectorAll('.custom-dropdown');
  dropdowns.forEach(dropdown => {
    const selected = dropdown.querySelector('.dropdown-selected');
    const selectedText = selected.querySelector('.selected-text');
    const selectedIcon = selected.querySelector('.selected-icon');
    const arrow = dropdown.querySelector('.dropdown-arrow');
    const menu = dropdown.querySelector('.dropdown-menu');
    const options = dropdown.querySelectorAll('.dropdown-option');

    let isOpen = false;

    const toggleDropdown = () => {
      isOpen = !isOpen;
      if (isOpen) {
        menu.classList.remove('opacity-0', 'pointer-events-none', 'scale-y-95');
        menu.classList.add('opacity-100', 'pointer-events-auto', 'scale-y-100');
        if (arrow) arrow.classList.add('rotate-180');
        
        // Simple cascade animation for options using timeout
        options.forEach((opt, idx) => {
          setTimeout(() => {
            opt.classList.remove('opacity-0', 'translate-y-2');
            opt.classList.add('opacity-100', 'translate-y-0');
          }, 100 + (idx * 50));
        });
      } else {
        menu.classList.add('opacity-0', 'pointer-events-none', 'scale-y-95');
        menu.classList.remove('opacity-100', 'pointer-events-auto', 'scale-y-100');
        if (arrow) arrow.classList.remove('rotate-180');
        
        options.forEach(opt => {
          opt.classList.add('opacity-0', 'translate-y-2');
          opt.classList.remove('opacity-100', 'translate-y-0');
        });
      }
    };

    selected.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown();
    });

    options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const optionText = option.querySelector('p.font-display').textContent;
        selectedText.textContent = optionText;
        const optionIconHTML = option.querySelector('svg').outerHTML;
        selectedIcon.innerHTML = optionIconHTML;
        toggleDropdown();
      });
    });

    document.addEventListener('click', (e) => {
      if (isOpen && !dropdown.contains(e.target)) {
        toggleDropdown();
      }
    });
  });
}
