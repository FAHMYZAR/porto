// Articles listing page: semua artikel, 6 per halaman + pager
document.addEventListener('DOMContentLoaded', function () {
    const perPage = 6;
    let currentPage = 1;
    let totalPages = 1;

    function cardHtml(article) {
        const date = new Date(article.date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const tags = article.tags.map(tag =>
            `<span class="px-2 py-1 bg-primary/10 text-primary text-xs rounded">${tag}</span>`
        ).join('');
        return `
            <div class="article-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1">
                <div class="h-56 bg-cover bg-center flex-shrink-0" style="background-image: url('${article.image}'); background-color: #14b8a6;">
                    <div class="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <span class="text-white text-xs font-semibold bg-primary px-3 py-1.5 rounded-full">${article.category}</span>
                    </div>
                </div>
                <div class="p-6 flex-grow flex flex-col">
                    <h2 class="font-bold text-dark text-xl mb-3 leading-tight">${article.title}</h2>
                    <p class="text-slate-600 text-xs mb-4 flex-grow leading-relaxed line-clamp-2">${article.excerpt}</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${tags}
                    </div>
                    <div class="flex items-center justify-between pt-4 border-t border-slate-200">
                        <span class="text-xs text-slate-500">${date}</span>
                        <a href="articles/${article.slug}.html" class="text-primary font-semibold text-sm hover:underline flex items-center gap-1" aria-label="Baca artikel ${article.title}">
                            Baca <span>→</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    async function loadArticles() {
        const container = document.getElementById('articles-container');
        const pager = document.getElementById('articles-pager');
        try {
            const response = await fetch('./blogs/articles.json');
            const articles = await response.json();
            container.innerHTML = articles.map(cardHtml).join('');
            const cards = container.querySelectorAll('.article-card');
            totalPages = Math.ceil(cards.length / perPage);
            if (totalPages <= 1) return;

            const btnBase = 'inline-flex items-center justify-center min-w-[2.5rem] px-3 py-2 text-sm font-semibold rounded-full border transition-colors ';
            const btnOff = 'opacity-40 pointer-events-none ';
            function renderPager() {
                let html = '<button type="button" data-page="prev" aria-label="Halaman sebelumnya" ' + (currentPage === 1 ? 'disabled ' : '') + 'class="' + btnBase + 'border-slate-300 text-slate-700 bg-white hover:border-primary hover:text-primary ' + (currentPage === 1 ? btnOff : '') + '">&#8592;</button>';
                for (let pg = 1; pg <= totalPages; pg++) {
                    html += '<button type="button" data-page="' + pg + '" class="' + btnBase + (pg === currentPage ? 'bg-primary text-white border-primary' : 'border-slate-300 text-slate-700 bg-white hover:border-primary hover:text-primary') + '">' + pg + '</button>';
                }
                html += '<button type="button" data-page="next" aria-label="Halaman berikutnya" ' + (currentPage === totalPages ? 'disabled ' : '') + 'class="' + btnBase + 'border-slate-300 text-slate-700 bg-white hover:border-primary hover:text-primary ' + (currentPage === totalPages ? btnOff : '') + '">&#8594;</button>';
                pager.innerHTML = html;
                pager.querySelectorAll('button[data-page]').forEach(function (btn) {
                    btn.addEventListener('click', function () {
                        const v = btn.getAttribute('data-page');
                        const target = v === 'prev' ? currentPage - 1 : v === 'next' ? currentPage + 1 : parseInt(v, 10);
                        if (target >= 1 && target <= totalPages && target !== currentPage) {
                            currentPage = target;
                            showPage();
                            document.getElementById('articles-top').scrollIntoView({ behavior: 'smooth' });
                        }
                    });
                });
            }
            function showPage() {
                cards.forEach(function (card, i) {
                    card.style.display = (i >= (currentPage - 1) * perPage && i < currentPage * perPage) ? '' : 'none';
                });
                renderPager();
            }
            cards.forEach(function (card, i) { if (i >= perPage) card.style.display = 'none'; });
            renderPager();
        } catch (error) {
            console.error('Error loading articles:', error);
            container.innerHTML = '<div class="w-full px-4 text-center text-secondary">Gagal memuat artikel.</div>';
        }
    }

    loadArticles();
});
