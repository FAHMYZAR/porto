// Turbo Loading System
const turbo = {
    // Critical CSS inline
    inlineCSS() {
        const css = `body{font-family:system-ui;margin:0}nav{position:fixed;top:0;width:100%;background:#fff;z-index:50}.hero{padding:6rem 1rem 2rem;text-align:center}.btn{background:#26A69A;color:#fff;padding:0.75rem 1.5rem;border-radius:0.5rem;text-decoration:none;display:inline-block}`;
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    },

    // Defer heavy resources
    deferLoad() {
        setTimeout(() => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = './dist/output.css';
            document.head.appendChild(link);
        }, 100);
    },

    // Preload next page
    prefetch() {
        const links = document.querySelectorAll('a[href^="index.html"]');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const prefetch = document.createElement('link');
                prefetch.rel = 'prefetch';
                prefetch.href = link.href;
                document.head.appendChild(prefetch);
            });
        });
    },

    // Skip images on slow connection
    adaptiveLoad() {
        if (navigator.connection && navigator.connection.effectiveType === '2g') {
            document.querySelectorAll('img').forEach(img => {
                img.style.display = 'none';
            });
        }
    }
};

// Instant load
turbo.inlineCSS();
turbo.deferLoad();
document.addEventListener('DOMContentLoaded', () => {
    turbo.prefetch();
    turbo.adaptiveLoad();
});