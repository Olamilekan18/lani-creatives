// LANI CREATIVES — Animation Controllers
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounterAnimation();
  initParticles();
  initParallax();
  initMagneticButtons();
  initTextSplit();
});

// --- Scroll Reveal (IntersectionObserver) ---
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .img-reveal, .line-animated');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  els.forEach(el => observer.observe(el));
}

// --- Counter Animation ---
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// --- Gold Particle System ---
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  const count = 40;

  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4 - 0.2;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.fadeDir = Math.random() > 0.5 ? 1 : -1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.opacity += this.fadeDir * 0.003;
      if (this.opacity <= 0 || this.opacity >= 0.6) this.fadeDir *= -1;
      if (this.x < 0 || this.x > canvas.width || this.y < -10 || this.y > canvas.height + 10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 169, 110, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < count; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
}

// --- Parallax ---
function initParallax() {
  const layers = document.querySelectorAll('.parallax-layer');
  if (!layers.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    layers.forEach(layer => {
      const speed = parseFloat(layer.dataset.speed || 0.3);
      layer.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });
}

// --- Magnetic Buttons ---
function initMagneticButtons() {
  const els = document.querySelectorAll('.magnetic');
  els.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });
}

// --- Text Split Animation ---
function initTextSplit() {
  const els = document.querySelectorAll('.text-split');
  if (!els.length) return;

  els.forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    el.style.visibility = 'visible';
    [...text].forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.cssText = `display:inline-block;opacity:0;transform:translateY(30px);transition:opacity 0.5s ease ${i * 0.03}s, transform 0.5s ease ${i * 0.03}s;`;
      el.appendChild(span);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('span').forEach(span => {
          span.style.opacity = '1';
          span.style.transform = 'translateY(0)';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.text-split').forEach(el => observer.observe(el));
}
