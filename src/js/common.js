// Common JavaScript for all pages
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
        const hamburgerSpans = hamburger.querySelectorAll('span');

        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');

            if (!mobileMenu.classList.contains('hidden')) {
                hamburgerSpans[0].style.transform = 'rotate(45deg) translateY(10px)';
                hamburgerSpans[1].style.opacity = '0';
                hamburgerSpans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                hamburgerSpans[0].style.transform = 'none';
                hamburgerSpans[1].style.opacity = '1';
                hamburgerSpans[2].style.transform = 'none';
            }
        });

        // Close mobile menu on link click
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                hamburgerSpans.forEach(span => span.style.transform = 'none');
                hamburgerSpans[1].style.opacity = '1';
            });
        });
    }

    // Smooth scroll with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Removed fade-in animations for better performance

    // Navbar scroll effect
    const navbar = document.querySelector('nav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 50) {
                navbar.classList.add('shadow-lg');
            } else {
                navbar.classList.remove('shadow-lg');
            }
        });
    }
});

// Optimized for performance - removed animation observers
