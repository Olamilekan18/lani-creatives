// LANI Creatives v3 - Denser Layout Animations

document.addEventListener("DOMContentLoaded", () => {
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
            
            gsap.to(cursor, {
                x: mouseX,
                y: mouseY,
                duration: 0.1
            });
        });

        gsap.ticker.add(() => {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            
            gsap.set(cursorFollower, {
                x: followerX,
                y: followerY
            });
        });

        const hoverElements = document.querySelectorAll("a, button, .cursor-pointer, input, select");
        
        hoverElements.forEach(el => {
            el.addEventListener("mouseenter", () => {
                gsap.to(cursor, { scale: 0, duration: 0.2 });
                gsap.to(cursorFollower, { 
                    scale: 0.5, 
                    backgroundColor: "rgba(212, 175, 55, 1)", // Gold
                    borderColor: "transparent",
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

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");
    let isMenuOpen = false;

    mobileMenuBtn.addEventListener("click", () => {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            gsap.to(".line-1", { y: 3.5, rotation: 45, backgroundColor: "#F5F1E7", duration: 0.3 });
            gsap.to(".line-2", { y: -3.5, rotation: -45, backgroundColor: "#F5F1E7", duration: 0.3 });
            gsap.to(mobileMenu, { opacity: 1, pointerEvents: "auto", duration: 0.5 });
            
            gsap.fromTo(mobileLinks, 
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.2, ease: "power3.out" }
            );
        } else {
            gsap.to(".line-1", { y: 0, rotation: 0, backgroundColor: "#0a0a0a", duration: 0.3 });
            gsap.to(".line-2", { y: 0, rotation: 0, backgroundColor: "#0a0a0a", duration: 0.3 });
            gsap.to(mobileMenu, { opacity: 0, pointerEvents: "none", duration: 0.5 });
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (isMenuOpen) mobileMenuBtn.click();
        });
    });

    // Initial Load Animations
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.from(".hero-text", { y: 20, opacity: 0, duration: 1, delay: 0.2 })
      .from(".hero-title", { y: 100, opacity: 0, duration: 1.5 }, "-=0.8")
      .from(".hero-desc", { x: -30, opacity: 0, duration: 1 }, "-=1")
      .from(".hero-btn", { y: 20, opacity: 0, duration: 0.8 }, "-=0.8")
      .to(".hero-images", { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, "-=1");

    // Scroll Animations
    
    ScrollTrigger.create({
        start: "top -50",
        end: 99999,
        toggleClass: { className: "shadow-sm", targets: "#navbar" }
    });

    gsap.from(".about-meta", {
        scrollTrigger: { trigger: "#about", start: "top 75%" },
        x: -30, opacity: 0, duration: 1
    });

    gsap.from(".about-content", {
        scrollTrigger: { trigger: "#about", start: "top 75%" },
        y: 40, opacity: 0, duration: 1.2
    });

    gsap.from(".work-header", {
        scrollTrigger: { trigger: "#work", start: "top 80%" },
        y: 30, opacity: 0, duration: 1
    });

    gsap.from(".work-list > div", {
        scrollTrigger: { trigger: ".work-list", start: "top 75%" },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power2.out"
    });

    gsap.from(".acb-info", {
        scrollTrigger: { trigger: "#acb50", start: "top 70%" },
        x: -40, opacity: 0, duration: 1
    });

    gsap.from(".acb-gallery > div", {
        scrollTrigger: { trigger: ".acb-gallery", start: "top 70%" },
        scale: 0.95, opacity: 0, duration: 1, stagger: 0.2
    });

    gsap.from(".impact-text", {
        scrollTrigger: { trigger: "#impact", start: "top 75%" },
        y: 40, opacity: 0, duration: 1
    });

    gsap.from(".impact-stats > div", {
        scrollTrigger: { trigger: ".impact-stats", start: "top 80%" },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1
    });

    gsap.from(".journal-header", {
        scrollTrigger: { trigger: "#journal", start: "top 80%" },
        y: 30, opacity: 0, duration: 1
    });

    gsap.from(".journal-article", {
        scrollTrigger: { trigger: ".journal-article", start: "top 75%" },
        y: 50, opacity: 0, duration: 1, stagger: 0.2
    });

    gsap.from("footer form > div, footer form > h3, footer form > button", {
        scrollTrigger: { trigger: "footer", start: "top 80%" },
        y: 20, opacity: 0, duration: 0.6, stagger: 0.1
    });
});
