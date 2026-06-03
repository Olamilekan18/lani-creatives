// LANI CREATIVES — Core Functionality
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initActiveNav();
  initContactForm();
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
