// LANI CREATIVES — Main JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Menu Toggle ---
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // --- Custom Dropdown Logic ---
  const dropdowns = document.querySelectorAll('.custom-dropdown');
  dropdowns.forEach(dropdown => {
    const selected = dropdown.querySelector('.dropdown-selected');
    const selectedText = selected ? selected.querySelector('.selected-text') : null;
    const selectedIcon = selected ? selected.querySelector('.selected-icon') : null;
    const arrow = dropdown.querySelector('.dropdown-arrow');
    const menu = dropdown.querySelector('.dropdown-menu');
    const options = dropdown.querySelectorAll('.dropdown-option');

    if (!selected || !menu) return;

    let isOpen = false;

    const toggleDropdown = () => {
      isOpen = !isOpen;
      if (isOpen) {
        menu.classList.remove('opacity-0', 'pointer-events-none', 'scale-y-95');
        menu.classList.add('opacity-100', 'pointer-events-auto', 'scale-y-100');
        if (arrow) arrow.classList.add('rotate-180');

        // Stagger in options
        options.forEach((opt, i) => {
          setTimeout(() => {
            opt.style.opacity = '1';
            opt.style.transform = 'translateY(0)';
          }, 50 + i * 50);
        });
      } else {
        menu.classList.add('opacity-0', 'pointer-events-none', 'scale-y-95');
        menu.classList.remove('opacity-100', 'pointer-events-auto', 'scale-y-100');
        if (arrow) arrow.classList.remove('rotate-180');

        // Reset options
        options.forEach(opt => {
          opt.style.opacity = '0';
          opt.style.transform = 'translateY(8px)';
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
        const optionText = option.querySelector('p.font-display');
        if (optionText && selectedText) {
          selectedText.textContent = optionText.textContent;
        }
        const optionIcon = option.querySelector('svg');
        if (optionIcon && selectedIcon) {
          selectedIcon.innerHTML = optionIcon.outerHTML;
        }
        toggleDropdown();
      });
    });

    document.addEventListener('click', (e) => {
      if (isOpen && !dropdown.contains(e.target)) {
        toggleDropdown();
      }
    });
  });
});
