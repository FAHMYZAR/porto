// Performance Optimizer
const perf = {
    // Lazy load images
    lazyImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    observer.unobserve(img);
                }
            });
        });
        images.forEach(img => observer.observe(img));
    },

    // Preload critical resources
    preload() {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = 'dist/img/fahmi.png';
        document.head.appendChild(link);
    },

    // Defer non-critical JS
    defer() {
        const scripts = ['dist/js/common.js', 'dist/js/index.js'];
        scripts.forEach(src => {
            const script = document.createElement('script');
            script.src = src;
            script.defer = true;
            document.head.appendChild(script);
        });
    }
};

// Auto-optimize on load
document.addEventListener('DOMContentLoaded', () => {
    perf.preload();
    perf.lazyImages();
});