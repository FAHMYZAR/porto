// Article page specific JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Removed animations for better performance

    // Load Article
    async function loadArticle() {
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = parseInt(urlParams.get('id'));

        if (!articleId) {
            document.getElementById('loading').classList.add('hidden');
            document.getElementById('error-message').classList.remove('hidden');
            return;
        }

        try {
            const response = await fetch('./blogs/articles.json');
            const articles = await response.json();
            const article = articles.find(a => a.id === articleId);

            if (!article) {
                document.getElementById('loading').classList.add('hidden');
                document.getElementById('error-message').classList.remove('hidden');
                return;
            }

            // Format date
            const date = new Date(article.date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Update page title
            document.title = `${article.title} - Fahmyzzx Web`;

            // Populate article content
            document.getElementById('article-category').textContent = article.category;
            document.getElementById('article-title').textContent = article.title;
            document.getElementById('article-author').textContent = article.author;
            document.getElementById('article-date').textContent = date;
            document.getElementById('article-excerpt').textContent = article.excerpt;

            // Format content with proper paragraphs
            const contentText = document.getElementById('article-content-text');
            let paragraphs;
            if (article.content.includes('\n\n')) {
                paragraphs = article.content.split('\n\n').filter(p => p.trim());
            } else {
                paragraphs = article.content.split('\n').filter(p => p.trim());
            }
            contentText.innerHTML = paragraphs.map(p =>
                `<p class="mb-5 md:mb-6 text-slate-700 leading-relaxed">${p.trim().replace(/\n/g, '<br>')}</p>`
            ).join('');

            document.getElementById('article-image').src = article.image;
            document.getElementById('article-image').alt = article.title;

            // Populate tags
            const tagsContainer = document.getElementById('tags-container');
            tagsContainer.innerHTML = article.tags.map(tag =>
                `<span class="inline-block px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full hover:bg-primary/20 transition-colors">${tag}</span>`
            ).join('');

            // Load related articles
            loadRelatedArticles(articles, articleId);

            // Hide loading, show content
            document.getElementById('loading').classList.add('hidden');
            document.getElementById('article-content').classList.remove('hidden');

            // Content loaded successfully

        } catch (error) {
            console.error('Error loading article:', error);
            document.getElementById('loading').classList.add('hidden');
            document.getElementById('error-message').classList.remove('hidden');
        }
    }

    // Load Related Articles
    function loadRelatedArticles(articles, currentArticleId) {
        // Filter out current article and get 2 random related articles
        const relatedArticles = articles
            .filter(a => a.id !== currentArticleId)
            .sort(() => Math.random() - 0.5)
            .slice(0, 2);

        const relatedContainer = document.getElementById('related-articles-container');

        if (relatedArticles.length === 0) {
            document.getElementById('related-articles').classList.add('hidden');
            return;
        }

        relatedContainer.innerHTML = relatedArticles.map(relatedArticle => {
            const date = new Date(relatedArticle.date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            return `
                <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div class="h-48 bg-cover bg-center" style="background-image: url('${relatedArticle.image}'); background-color: #14b8a6;">
                        <div class="h-full bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                            <span class="text-white text-xs font-semibold bg-primary px-3 py-1 rounded-full">${relatedArticle.category}</span>
                        </div>
                    </div>
                    <div class="p-5 md:p-6">
                        <h4 class="font-bold text-dark text-base md:text-lg mb-2 line-clamp-2 leading-tight">${relatedArticle.title}</h4>
                        <p class="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">${relatedArticle.excerpt}</p>
                        <div class="flex items-center justify-between pt-2 border-t border-slate-100">
                            <span class="text-xs text-slate-500">${date}</span>
                            <a href="article.html?id=${relatedArticle.id}" class="text-primary font-semibold text-sm hover:underline flex items-center gap-1">
                                Baca <span>→</span>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Related articles loaded successfully
    }

    // Load article on page load
    loadArticle();
});
