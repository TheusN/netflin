/**
 * ElegantFin - Netflix Mobile Experience
 * Transforma a interface mobile do Jellyfin no estilo Netflix
 * Para uso com Jellyfin JavaScript Injector
 */

(function() {
    'use strict';

    // ==========================================
    // CONFIGURAÇÕES
    // ==========================================
    const CONFIG = {
        enableBottomNav: true,          // Barra de navegação inferior
        enableCategoryFilters: true,    // Filtros de categoria no topo
        enableQuickActions: true,       // Ações rápidas nos cards
        enableSwipeGestures: true,      // Gestos de swipe
        enablePullToRefresh: true,      // Puxar para atualizar
        enableFloatingProfile: true,    // Perfil flutuante no header
        hideOriginalNav: true,          // Esconde navegação original
        cardStyle: 'portrait',          // 'portrait' ou 'landscape'
    };

    // ==========================================
    // DETECÇÃO MOBILE
    // ==========================================
    function isMobile() {
        return window.innerWidth <= 768 ||
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // ==========================================
    // INICIALIZAÇÃO
    // ==========================================
    function init() {
        if (!isMobile()) {
            console.log('ElegantFin Mobile: Desktop detectado, algumas features desativadas');
        }

        addMobileStyles();

        if (CONFIG.enableBottomNav) createBottomNav();
        if (CONFIG.enableCategoryFilters) createCategoryFilters();
        if (CONFIG.enableSwipeGestures) setupSwipeGestures();
        if (CONFIG.enablePullToRefresh) setupPullToRefresh();
        if (CONFIG.enableQuickActions) setupQuickActions();
        if (CONFIG.enableFloatingProfile) enhanceHeader();

        observePageChanges();
    }

    // ==========================================
    // BOTTOM NAVIGATION BAR (Estilo Netflix)
    // ==========================================
    function createBottomNav() {
        if (document.getElementById('efin-bottom-nav')) return;

        const bottomNav = document.createElement('nav');
        bottomNav.id = 'efin-bottom-nav';
        bottomNav.innerHTML = `
            <a href="#!/home.html" class="efin-nav-item" data-page="home">
                <span class="material-icons">home</span>
                <span class="efin-nav-label">Início</span>
            </a>
            <a href="#!/search.html" class="efin-nav-item" data-page="search">
                <span class="material-icons">search</span>
                <span class="efin-nav-label">Buscar</span>
            </a>
            <a href="#!/list.html?topParentId=new" class="efin-nav-item" data-page="new">
                <span class="material-icons">fiber_new</span>
                <span class="efin-nav-label">Novidades</span>
            </a>
            <a href="#!/mypreferencesmenu.html" class="efin-nav-item" data-page="downloads">
                <span class="material-icons">download</span>
                <span class="efin-nav-label">Downloads</span>
            </a>
            <a href="#!/mypreferencesmenu.html" class="efin-nav-item" data-page="profile">
                <span class="material-icons">person</span>
                <span class="efin-nav-label">Perfil</span>
            </a>
        `;

        document.body.appendChild(bottomNav);
        updateActiveNavItem();

        // Esconde navegação original no mobile
        if (CONFIG.hideOriginalNav && isMobile()) {
            const style = document.createElement('style');
            style.textContent = `
                @media (max-width: 768px) {
                    .headerTabs, .navMenuOption { display: none !important; }
                    .mainDrawer-scrollContainer { padding-bottom: 80px !important; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    function updateActiveNavItem() {
        const hash = window.location.hash;
        const navItems = document.querySelectorAll('.efin-nav-item');

        navItems.forEach(item => {
            item.classList.remove('active');
            const page = item.dataset.page;

            if ((page === 'home' && hash.includes('home')) ||
                (page === 'search' && hash.includes('search')) ||
                (page === 'new' && hash.includes('list')) ||
                (page === 'profile' && hash.includes('preferences'))) {
                item.classList.add('active');
            }
        });
    }

    // ==========================================
    // CATEGORY FILTERS (Estilo Netflix)
    // ==========================================
    function createCategoryFilters() {
        const checkHome = setInterval(() => {
            const homePage = document.querySelector('.homePage');
            if (!homePage || document.getElementById('efin-category-filters')) {
                if (!homePage) return;
                clearInterval(checkHome);
                return;
            }
            clearInterval(checkHome);

            const filters = document.createElement('div');
            filters.id = 'efin-category-filters';
            filters.innerHTML = `
                <div class="efin-filters-scroll">
                    <button class="efin-filter-btn active" data-filter="all">
                        Todos
                    </button>
                    <button class="efin-filter-btn" data-filter="movies">
                        Filmes
                    </button>
                    <button class="efin-filter-btn" data-filter="series">
                        Séries
                    </button>
                    <button class="efin-filter-btn" data-filter="continue">
                        Continuar
                    </button>
                    <button class="efin-filter-btn" data-filter="mylist">
                        Minha Lista
                    </button>
                    <button class="efin-filter-btn has-dropdown" data-filter="genres">
                        Gêneros
                        <span class="material-icons">arrow_drop_down</span>
                    </button>
                </div>
            `;

            const firstSection = homePage.querySelector('.homeSectionsContainer') ||
                                 homePage.firstElementChild;
            if (firstSection) {
                firstSection.insertBefore(filters, firstSection.firstChild);
            }

            setupFilterActions();
        }, 500);
    }

    function setupFilterActions() {
        const filterBtns = document.querySelectorAll('.efin-filter-btn');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;
                applyFilter(filter);
            });
        });
    }

    function applyFilter(filter) {
        const sections = document.querySelectorAll('.section0, .section1, .verticalSection');

        sections.forEach(section => {
            const title = section.querySelector('h2, .sectionTitle')?.textContent?.toLowerCase() || '';

            switch(filter) {
                case 'all':
                    section.style.display = '';
                    break;
                case 'movies':
                    section.style.display = title.includes('filme') || title.includes('movie') ? '' : 'none';
                    break;
                case 'series':
                    section.style.display = title.includes('série') || title.includes('series') || title.includes('show') ? '' : 'none';
                    break;
                case 'continue':
                    section.style.display = title.includes('continuar') || title.includes('continue') ? '' : 'none';
                    break;
                case 'mylist':
                    // Navega para a lista
                    window.location.hash = '#!/list.html';
                    break;
                case 'genres':
                    showGenresDropdown();
                    break;
            }
        });
    }

    function showGenresDropdown() {
        // Remove dropdown existente
        const existing = document.getElementById('efin-genres-dropdown');
        if (existing) {
            existing.remove();
            return;
        }

        const genres = [
            'Ação', 'Aventura', 'Animação', 'Comédia', 'Crime',
            'Documentário', 'Drama', 'Família', 'Fantasia', 'Terror',
            'Mistério', 'Romance', 'Ficção Científica', 'Thriller'
        ];

        const dropdown = document.createElement('div');
        dropdown.id = 'efin-genres-dropdown';
        dropdown.innerHTML = `
            <div class="efin-genres-grid">
                ${genres.map(g => `<button class="efin-genre-btn">${g}</button>`).join('')}
            </div>
        `;

        const filtersContainer = document.getElementById('efin-category-filters');
        if (filtersContainer) {
            filtersContainer.appendChild(dropdown);
        }

        // Fecha ao clicar fora
        setTimeout(() => {
            document.addEventListener('click', function closeDropdown(e) {
                if (!e.target.closest('#efin-genres-dropdown') && !e.target.closest('[data-filter="genres"]')) {
                    dropdown.remove();
                    document.removeEventListener('click', closeDropdown);
                }
            });
        }, 100);
    }

    // ==========================================
    // QUICK ACTIONS NOS CARDS
    // ==========================================
    function setupQuickActions() {
        const observer = new MutationObserver(() => {
            const cards = document.querySelectorAll('.card:not(.efin-enhanced)');

            cards.forEach(card => {
                card.classList.add('efin-enhanced');

                // Adiciona botões de ação rápida
                const cardBox = card.querySelector('.cardBox') || card;

                if (!card.querySelector('.efin-quick-actions')) {
                    const actions = document.createElement('div');
                    actions.className = 'efin-quick-actions';
                    actions.innerHTML = `
                        <button class="efin-action-btn efin-action-play" title="Reproduzir">
                            <span class="material-icons">play_arrow</span>
                        </button>
                        <button class="efin-action-btn efin-action-add" title="Minha Lista">
                            <span class="material-icons">add</span>
                        </button>
                        <button class="efin-action-btn efin-action-info" title="Mais Info">
                            <span class="material-icons">info</span>
                        </button>
                    `;

                    cardBox.appendChild(actions);

                    // Event listeners
                    const playBtn = actions.querySelector('.efin-action-play');
                    const addBtn = actions.querySelector('.efin-action-add');
                    const infoBtn = actions.querySelector('.efin-action-info');

                    playBtn?.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const itemId = card.dataset.id || card.querySelector('a')?.href?.match(/id=([^&]+)/)?.[1];
                        if (itemId) {
                            window.location.hash = `#!/details?id=${itemId}&autoplay=true`;
                        }
                    });

                    addBtn?.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Toggle na lista
                        addBtn.querySelector('.material-icons').textContent =
                            addBtn.querySelector('.material-icons').textContent === 'add' ? 'check' : 'add';
                    });

                    infoBtn?.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const link = card.querySelector('a')?.href;
                        if (link) window.location.href = link;
                    });
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    // ==========================================
    // SWIPE GESTURES
    // ==========================================
    function setupSwipeGestures() {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            const minSwipeDistance = 100;

            // Swipe horizontal mais forte que vertical
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    // Swipe direita - voltar
                    if (window.history.length > 1) {
                        window.history.back();
                    }
                }
            }
        }
    }

    // ==========================================
    // PULL TO REFRESH
    // ==========================================
    function setupPullToRefresh() {
        let touchStartY = 0;
        let isPulling = false;

        const indicator = document.createElement('div');
        indicator.id = 'efin-pull-indicator';
        indicator.innerHTML = '<span class="material-icons">refresh</span>';
        document.body.appendChild(indicator);

        document.addEventListener('touchstart', (e) => {
            if (window.scrollY === 0) {
                touchStartY = e.touches[0].clientY;
                isPulling = true;
            }
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (!isPulling) return;

            const touchY = e.touches[0].clientY;
            const pullDistance = touchY - touchStartY;

            if (pullDistance > 0 && pullDistance < 150) {
                indicator.style.transform = `translateX(-50%) translateY(${pullDistance - 50}px)`;
                indicator.style.opacity = pullDistance / 100;
                indicator.querySelector('.material-icons').style.transform = `rotate(${pullDistance * 2}deg)`;
            }
        }, { passive: true });

        document.addEventListener('touchend', () => {
            if (!isPulling) return;

            const indicatorY = parseFloat(indicator.style.transform.match(/translateY\(([^)]+)\)/)?.[1] || 0);

            if (indicatorY > 50) {
                indicator.classList.add('refreshing');
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }

            indicator.style.transform = 'translateX(-50%) translateY(-50px)';
            indicator.style.opacity = '0';
            isPulling = false;
        }, { passive: true });
    }

    // ==========================================
    // ENHANCED HEADER
    // ==========================================
    function enhanceHeader() {
        const checkHeader = setInterval(() => {
            const header = document.querySelector('.skinHeader');
            if (!header || header.classList.contains('efin-enhanced-header')) {
                if (!header) return;
                clearInterval(checkHeader);
                return;
            }
            clearInterval(checkHeader);

            header.classList.add('efin-enhanced-header');

            // Adiciona logo e perfil ao header
            const headerContent = document.createElement('div');
            headerContent.className = 'efin-header-content';
            headerContent.innerHTML = `
                <div class="efin-header-logo">
                    <span style="font-weight: 700; font-size: 1.4em; color: var(--activeColor, #e50914);">N</span>
                </div>
                <div class="efin-header-actions">
                    <button class="efin-header-btn" onclick="window.location.hash='#!/search.html'">
                        <span class="material-icons">search</span>
                    </button>
                    <button class="efin-header-btn efin-profile-btn">
                        <span class="material-icons">account_circle</span>
                    </button>
                </div>
            `;

            header.insertBefore(headerContent, header.firstChild);
        }, 500);
    }

    // ==========================================
    // OBSERVER DE MUDANÇA DE PÁGINA
    // ==========================================
    function observePageChanges() {
        window.addEventListener('hashchange', () => {
            updateActiveNavItem();

            // Recria filtros se voltar para home
            if (window.location.hash.includes('home')) {
                setTimeout(() => {
                    if (!document.getElementById('efin-category-filters')) {
                        createCategoryFilters();
                    }
                }, 500);
            }
        });
    }

    // ==========================================
    // ESTILOS CSS
    // ==========================================
    function addMobileStyles() {
        if (document.getElementById('efin-mobile-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'efin-mobile-styles';
        styles.textContent = `
            /* ========== BOTTOM NAVIGATION ========== */
            #efin-bottom-nav {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                height: 65px;
                background: linear-gradient(to top, rgba(0,0,0,0.98), rgba(0,0,0,0.9));
                display: flex;
                justify-content: space-around;
                align-items: center;
                z-index: 9999;
                padding-bottom: env(safe-area-inset-bottom);
                backdrop-filter: blur(10px);
                border-top: 1px solid rgba(255,255,255,0.1);
            }

            .efin-nav-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-decoration: none;
                color: rgba(255,255,255,0.6);
                font-size: 0.7em;
                transition: all 0.2s ease;
                padding: 8px 12px;
                border-radius: 8px;
            }

            .efin-nav-item .material-icons {
                font-size: 1.8em;
                margin-bottom: 2px;
            }

            .efin-nav-item.active {
                color: white;
            }

            .efin-nav-item.active .material-icons {
                color: var(--activeColor, #e50914);
            }

            .efin-nav-label {
                font-weight: 500;
            }

            /* Espaço para bottom nav */
            @media (max-width: 768px) {
                body {
                    padding-bottom: 75px !important;
                }
                .mainDrawer-scrollContainer,
                .view,
                .page {
                    padding-bottom: 80px !important;
                }
            }

            /* ========== CATEGORY FILTERS ========== */
            #efin-category-filters {
                position: sticky;
                top: 0;
                z-index: 100;
                background: linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 70%, transparent 100%);
                padding: 15px 0 25px;
                margin: 0 -3% 10px;
                width: 106%;
            }

            .efin-filters-scroll {
                display: flex;
                gap: 8px;
                overflow-x: auto;
                padding: 0 15px;
                scrollbar-width: none;
                -ms-overflow-style: none;
            }

            .efin-filters-scroll::-webkit-scrollbar {
                display: none;
            }

            .efin-filter-btn {
                flex-shrink: 0;
                padding: 8px 16px;
                border: 1px solid rgba(255,255,255,0.3);
                background: transparent;
                color: white;
                border-radius: 20px;
                font-size: 0.85em;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                gap: 4px;
            }

            .efin-filter-btn .material-icons {
                font-size: 1.2em;
            }

            .efin-filter-btn:hover,
            .efin-filter-btn.active {
                background: white;
                color: black;
                border-color: white;
            }

            /* Genres Dropdown */
            #efin-genres-dropdown {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(20,20,20,0.98);
                padding: 20px;
                border-radius: 0 0 15px 15px;
                animation: slideDown 0.3s ease;
            }

            .efin-genres-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
            }

            .efin-genre-btn {
                padding: 12px;
                background: rgba(255,255,255,0.1);
                border: none;
                color: white;
                border-radius: 8px;
                font-size: 0.9em;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .efin-genre-btn:hover {
                background: var(--activeColor, #e50914);
            }

            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            /* ========== QUICK ACTIONS NOS CARDS ========== */
            .card .cardBox {
                position: relative;
            }

            .efin-quick-actions {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                display: flex;
                justify-content: center;
                gap: 8px;
                padding: 10px;
                background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.3s ease;
            }

            .card:hover .efin-quick-actions,
            .card:focus-within .efin-quick-actions {
                opacity: 1;
                transform: translateY(0);
            }

            /* Sempre visível no mobile (touch) */
            @media (max-width: 768px) {
                .efin-quick-actions {
                    opacity: 1;
                    transform: translateY(0);
                    padding: 8px 5px;
                    background: linear-gradient(to top, rgba(0,0,0,0.95) 50%, transparent);
                }
            }

            .efin-action-btn {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                border: 2px solid rgba(255,255,255,0.7);
                background: rgba(0,0,0,0.6);
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }

            .efin-action-btn:hover {
                transform: scale(1.15);
                border-color: white;
                background: rgba(255,255,255,0.2);
            }

            .efin-action-btn .material-icons {
                font-size: 1.2em;
            }

            .efin-action-play {
                background: white;
                border-color: white;
                color: black;
            }

            .efin-action-play:hover {
                background: rgba(255,255,255,0.9);
            }

            /* ========== PULL TO REFRESH ========== */
            #efin-pull-indicator {
                position: fixed;
                top: -50px;
                left: 50%;
                transform: translateX(-50%);
                width: 40px;
                height: 40px;
                background: var(--activeColor, #e50914);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.2s ease;
            }

            #efin-pull-indicator .material-icons {
                color: white;
                font-size: 1.5em;
            }

            #efin-pull-indicator.refreshing .material-icons {
                animation: spin 0.8s linear infinite;
            }

            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            /* ========== ENHANCED HEADER ========== */
            .efin-header-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                padding: 0 15px;
            }

            .efin-header-logo {
                font-size: 1.5em;
            }

            .efin-header-actions {
                display: flex;
                gap: 10px;
            }

            .efin-header-btn {
                background: transparent;
                border: none;
                color: white;
                padding: 8px;
                cursor: pointer;
                border-radius: 50%;
                transition: background 0.2s ease;
            }

            .efin-header-btn:hover {
                background: rgba(255,255,255,0.1);
            }

            .efin-header-btn .material-icons {
                font-size: 1.5em;
            }

            /* ========== CARDS ESTILO PORTRAIT (NETFLIX) ========== */
            @media (max-width: 768px) {
                .cardImageContainer {
                    padding-bottom: 150% !important; /* Aspect ratio portrait */
                }

                .card {
                    width: 110px !important;
                    min-width: 110px !important;
                }

                .cardText,
                .cardFooter {
                    display: none !important;
                }

                /* Scroll horizontal suave */
                .itemsContainer {
                    scroll-snap-type: x mandatory;
                    scroll-behavior: smooth;
                }

                .card {
                    scroll-snap-align: start;
                }

                /* Remove espaço extra */
                .section0, .section1, .verticalSection {
                    padding: 0 !important;
                    margin-bottom: 25px !important;
                }

                .sectionTitle {
                    padding-left: 15px !important;
                    font-size: 1.1em !important;
                    font-weight: 600 !important;
                }
            }

            /* ========== ANIMAÇÕES SUAVES ========== */
            .card {
                transition: transform 0.2s ease !important;
            }

            @media (max-width: 768px) {
                .card:active {
                    transform: scale(0.95) !important;
                }
            }

            /* ========== HIDE SCROLLBARS (CLEANER LOOK) ========== */
            @media (max-width: 768px) {
                .itemsContainer::-webkit-scrollbar,
                .smoothScrollX::-webkit-scrollbar {
                    display: none;
                }

                .itemsContainer,
                .smoothScrollX {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
            }

            /* ========== DESKTOP - ESCONDE BOTTOM NAV ========== */
            @media (min-width: 769px) {
                #efin-bottom-nav {
                    display: none;
                }

                #efin-category-filters {
                    display: none;
                }
            }
        `;

        document.head.appendChild(styles);
    }

    // ==========================================
    // INICIALIZAÇÃO
    // ==========================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Re-inicializa em mudanças de página (SPA)
    window.addEventListener('hashchange', () => {
        setTimeout(init, 300);
    });

})();
