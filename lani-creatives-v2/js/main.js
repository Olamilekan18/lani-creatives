// LANI Creatives v2 GSAP Animations & Interactions

document.addEventListener("DOMContentLoaded", () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Custom Cursor
    const cursor = document.getElementById("cursor");
    const cursorFollower = document.getElementById("cursor-follower");
    
    if (window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Move inner cursor instantly
            gsap.to(cursor, {
                x: mouseX,
                y: mouseY,
                duration: 0.1
            });
        });

        // Follower trailing animation
        gsap.ticker.add(() => {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            gsap.set(cursorFollower, {
                x: followerX,
                y: followerY
            });
        });

        // Hover effects on links/buttons
        const hoverElements = document.querySelectorAll("a, button, .cursor-pointer");
        
        hoverElements.forEach(el => {
            el.addEventListener("mouseenter", () => {
                gsap.to(cursor, { scale: 0, duration: 0.2 });
                gsap.to(cursorFollower, { 
                    scale: 1.5, 
                    backgroundColor: "rgba(212, 175, 55, 0.1)",
                    borderColor: "rgba(212, 175, 55, 1)",
                    duration: 0.3 
                });
            });
            
            el.addEventListener("mouseleave", () => {
                gsap.to(cursor, { scale: 1, duration: 0.2 });
                gsap.to(cursorFollower, { 
                    scale: 1, 
                    backgroundColor: "transparent",
                    borderColor: "rgba(212, 175, 55, 0.5)",
                    duration: 0.3 
                });
            });
        });
    }

    // Magnetic Buttons
    const magneticBtns = document.querySelectorAll(".magnetic-btn");
    
    magneticBtns.forEach(btn => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener("mouseleave", () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // Mobile Menu
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");
    let isMenuOpen = false;

    mobileMenuBtn.addEventListener("click", () => {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            // Open Menu
            gsap.to(".line-1", { y: 3.5, rotation: 45, duration: 0.3 });
            gsap.to(".line-2", { y: -3.5, rotation: -45, width: "100%", duration: 0.3 });
            gsap.to(mobileMenu, { opacity: 1, pointerEvents: "auto", duration: 0.5 });
            
            gsap.fromTo(mobileLinks, 
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.2, ease: "power2.out" }
            );
        } else {
            // Close Menu
            gsap.to(".line-1", { y: 0, rotation: 0, duration: 0.3 });
            gsap.to(".line-2", { y: 0, rotation: 0, width: "75%", duration: 0.3 });
            gsap.to(mobileMenu, { opacity: 0, pointerEvents: "none", duration: 0.5 });
        }
    });

    // Close menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (isMenuOpen) mobileMenuBtn.click();
        });
    });

    // Initial Load Animation (Hero)
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.from(".hero-text", { y: "100%", duration: 1, delay: 0.5 })
      .from(".hero-title", { y: "120%", opacity: 0, duration: 1.2, stagger: 0.2 }, "-=0.6")
      .from(".hero-desc", { y: 30, opacity: 0, duration: 1 }, "-=0.8")
      .to(".hero-btn", { y: 0, opacity: 1, duration: 1 }, "-=0.5");

    // Scroll Animations

    // Navbar blur on scroll
    ScrollTrigger.create({
        start: "top -50",
        end: 99999,
        toggleClass: { className: "glass-panel", targets: "#navbar" }
    });

    // About Section
    gsap.from(".about-content > *", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
    });

    // Work Cards
    gsap.from(".work-card", {
        scrollTrigger: {
            trigger: "#work",
            start: "top 60%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
    });

    // ACB@50 Parallax & Fade
    gsap.from(".acb-header > *", {
        scrollTrigger: {
            trigger: "#acb50",
            start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2
    });

    gsap.from(".acb-item", {
        scrollTrigger: {
            trigger: ".acb-item",
            start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Impact Section
    gsap.from(".impact-title", {
        scrollTrigger: {
            trigger: "#impact",
            start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 1
    });

    gsap.from(".impact-stat", {
        scrollTrigger: {
            trigger: ".impact-stat",
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15
    });

    // Journal Section
    gsap.from(".journal-article", {
        scrollTrigger: {
            trigger: "#journal",
            start: "top 70%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
    });

    // Footer Parallax
    gsap.from("footer .max-w-7xl", {
        scrollTrigger: {
            trigger: "footer",
            start: "top 90%",
        },
        y: 50,
        opacity: 0,
        duration: 1
    });

    // Custom Dropdown Logic (Rich Version)
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
                
                // Stagger in options
                gsap.to(options, {
                    y: 0, 
                    opacity: 1, 
                    duration: 0.4, 
                    stagger: 0.05, 
                    ease: "power2.out", 
                    delay: 0.1
                });
            } else {
                menu.classList.add('opacity-0', 'pointer-events-none', 'scale-y-95');
                menu.classList.remove('opacity-100', 'pointer-events-auto', 'scale-y-100');
                if (arrow) arrow.classList.remove('rotate-180');
                
                // Reset options immediately
                gsap.set(options, { y: 10, opacity: 0 });
            }
        };

        selected.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown();
        });

        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                // Update text
                const optionText = option.querySelector('p.font-display').textContent;
                selectedText.textContent = optionText;
                
                // Update icon HTML
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
});
