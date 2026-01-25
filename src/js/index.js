// Index page specific JavaScript - Optimized (No animations on cards)
document.addEventListener('DOMContentLoaded', function () {
    // Load Blog Posts from JSON
    async function loadBlogPosts() {
        return new Promise(async (resolve) => {
            try {
                const response = await fetch('./blogs/articles.json');
                const articles = await response.json();
                const blogContainer = document.getElementById('blog-container');

                // Show only first 6 articles
                const displayArticles = articles.slice(0, 6);

                blogContainer.innerHTML = displayArticles.map(article => {
                    const date = new Date(article.date).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });

                    const tags = article.tags.map(tag =>
                        `<span class="px-2 py-1 bg-primary/10 text-primary text-xs rounded">${tag}</span>`
                    ).join('');

                    return `
                        <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1">
                            <div class="h-56 bg-cover bg-center flex-shrink-0" style="background-image: url('${article.image}'); background-color: #14b8a6;">
                                <div class="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                    <span class="text-white text-xs font-semibold bg-primary px-3 py-1.5 rounded-full">${article.category}</span>
                                </div>
                            </div>
                            <div class="p-6 flex-grow flex flex-col">
                                <h3 class="font-bold text-dark text-xl mb-3 leading-tight">${article.title}</h3>
                                <p class="text-slate-600 text-xs mb-4 flex-grow leading-relaxed line-clamp-2">${article.excerpt}</p>
                                <div class="flex flex-wrap gap-2 mb-4">
                                    ${tags}
                                </div>
                                <div class="flex items-center justify-between pt-4 border-t border-slate-200">
                                    <span class="text-xs text-slate-500">${date}</span>
                                    <a href="article.html?id=${article.id}" class="text-primary font-semibold text-sm hover:underline flex items-center gap-1">
                                        Baca <span>→</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');
                resolve();
            } catch (error) {
                console.error('Error loading blog posts:', error);
                document.getElementById('blog-container').innerHTML =
                    '<div class="w-full px-4 text-center text-secondary">Gagal memuat artikel blog.</div>';
                resolve();
            }
        });
    }

    // Load Gallery from JSON
    async function loadGallery() {
        return new Promise(async (resolve) => {
            try {
                const response = await fetch('./blogs/gallery.json');
                const galleryItems = await response.json();
                const galleryContainer = document.getElementById('gallery-container');

                galleryContainer.innerHTML = galleryItems.map(item => {
                    const tags = item.tags.map(tag =>
                        `<span class="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">${tag}</span>`
                    ).join('');

                    return `
                        <div class="gallery-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 h-full flex flex-col cursor-pointer hover:shadow-xl transform hover:-translate-y-1" 
                             data-image="${item.image}" 
                             data-title="${item.title}">
                            <div class="h-56 bg-cover bg-center flex-shrink-0" style="background-image: url('${item.image}');">
                                <div class="h-full bg-gradient-to-t from-black/60 to-transparent"></div>
                            </div>
                            <div class="p-6 flex-grow flex flex-col">
                                <h3 class="font-bold text-dark text-xl mb-3 leading-tight">${item.title}</h3>
                                <p class="text-slate-600 text-sm mb-4 flex-grow leading-relaxed line-clamp-3">${item.description}</p>
                                <div class="flex flex-wrap gap-2">
                                    ${tags}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');

                // Add click handler for lightbox
                const galleryCards = document.querySelectorAll('.gallery-card');
                galleryCards.forEach(card => {
                    card.addEventListener('click', (e) => {
                        e.preventDefault();
                        const image = card.getAttribute('data-image');
                        const title = card.getAttribute('data-title');
                        if (image && title) {
                            openLightbox(image, title);
                        } else {
                            console.error('Missing image or title data');
                        }
                    });
                });

                resolve();
            } catch (error) {
                console.error('Error loading gallery:', error);
                document.getElementById('gallery-container').innerHTML =
                    '<div class="w-full px-4 text-center text-secondary">Gagal memuat galeri.</div>';
                resolve();
            }
        });
    }

    // Lightbox Functions
    function openLightbox(imageSrc, title) {
        const modal = document.getElementById('lightbox-modal');
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxTitle = document.getElementById('lightbox-title');

        if (!modal || !lightboxImage || !lightboxTitle) {
            console.error('Lightbox elements not found');
            return;
        }

        lightboxImage.src = imageSrc;
        lightboxImage.alt = title;
        lightboxTitle.textContent = title;

        // Show modal
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';

        // Animate in
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
        });
    }

    function closeLightbox() {
        const modal = document.getElementById('lightbox-modal');
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
        }, 300);
    }

    // Setup lightbox event handlers
    function setupLightboxHandlers() {
        const closeBtn = document.getElementById('close-lightbox');
        const modal = document.getElementById('lightbox-modal');

        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target.id === 'lightbox-modal' || e.target === modal) {
                    closeLightbox();
                }
            });
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modal = document.getElementById('lightbox-modal');
                if (modal && !modal.classList.contains('hidden')) {
                    closeLightbox();
                }
            }
        });
    }

    // Optimized image loading for fahmi.png
    function loadFahmiImage() {
        const fahmiImg = document.getElementById('fahmi-image');
        if (fahmiImg) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.onload = () => {
                            img.classList.remove('opacity-0');
                            img.classList.add('opacity-100');
                        };
                        observer.unobserve(img);
                    }
                });
            }, { rootMargin: '50px' });
            observer.observe(fahmiImg);
        }
    }

    // Load data and setup - No animations, faster loading
    loadFahmiImage();
    loadGallery();
    loadBlogPosts();
    setupLightboxHandlers();
});
