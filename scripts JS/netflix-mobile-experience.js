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
        enableSwipeGestures: true,      // Gestos de swipe
        enablePullToRefresh: true,      // Puxar para atualizar
        hideOriginalNav: true,          // Esconde navegação original
        cardStyle: 'portrait',          // 'portrait' ou 'landscape' (por enquanto só visual, sem forçar ratio)
    };

    // ==========================================
    // DETECÇÃO MOBILE
    // ==========================================
    function isMobile() {
        return window.innerWidth <= 768 ||
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    function isTablet() {
        return /iPad/i.test(navigator.userAgent) ||
               (navigator.userAgent.includes("Mac") && "ontouchend" in document);
    }

    // ==========================================
    // INICIALIZAÇÃO
    // ==========================================
    function init() {
        if (!isMobile()) {
            console.log('ElegantFin Mobile: Desktop detectado, algumas features desativadas');
        }

        // Adiciona classe ao body se for tablet
        if (isTablet()) {
            document.body.classList.add('efin-tablet');
        }

        addMobileStyles();

        if (CONFIG.enableBottomNav) createBottomNav();
        if (CONFIG.enableCategoryFilters) createCategoryFilters();
        if (CONFIG.enableSwipeGestures) setupSwipeGestures();
        if (CONFIG.enablePullToRefresh) setupPullToRefresh();

        observePageChanges();
    }

    // ==========================================
    // BOTTOM NAVIGATION BAR (Estilo Netflix / Glass)
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
            <a href="#!/list.html" class="efin-nav-item" data-page="mylist">
                <span class="material-icons">playlist_play</span>
                <span class="efin-nav-label">Minha Lista</span>
            </a>
            <a href="#!/mypreferencesmenu.html" class="efin-nav-item" data-page="profile">
                <span class="material-icons">person</span>
                <span class="efin-nav-label">Perfil</span>
            </a>
        `;

        document.body.appendChild(bottomNav);
        updateActiveNavItem();

        // Esconde navegação original no mobile e tablets
        if (CONFIG.hideOriginalNav && (isMobile() || isTablet())) {
            const style = document.createElement('style');
            style.textContent = `
                @media (max-width: 768px) {
                    .headerTabs, .navMenuOption { display: none !important; }
                    .mainDrawer-scrollContainer { padding-bottom: 80px !important; }
                }

                body.efin-tablet .headerTabs,
                body.efin-tablet .navMenuOption {
                    display: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    function updateActiveNavItem() {
        const hash = window.location.hash || '';
        const navItems = document.querySelectorAll('.efin-nav-item');

        navItems.forEach(item => {
            item.classList.remove('active');
            const page = item.dataset.page;

            const isHome   = page === 'home'    && hash.includes('home');
            const isSearch = page === 'search'  && hash.includes('search');
            const isNew    = page === 'new'     && hash.includes('list.html') && hash.includes('topParentId=new');
            const isMyList = page === 'mylist'  && hash.includes('list.html') && !hash.includes('topParentId=new');
            const isProfile= page === 'profile' && hash.includes('preferences');

            if (isHome || isSearch || isNew || isMyList || isProfile) {
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
                    // Navega para a lista padrão (Minha Lista)
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
    // SWIPE GESTURES
    // ==========================================
    let swipeGesturesInitialized = false;
    function setupSwipeGestures() {
        if (swipeGesturesInitialized) return;
        swipeGesturesInitialized = true;

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
    let pullToRefreshInitialized = false;
    function setupPullToRefresh() {
        if (pullToRefreshInitialized) return;
        pullToRefreshInitialized = true;

        let touchStartY = 0;
        let isPulling = false;

        let indicator = document.getElementById('efin-pull-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'efin-pull-indicator';
            indicator.innerHTML = '<span class="material-icons">refresh</span>';
            document.body.appendChild(indicator);
        }

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

            const match = indicator.style.transform.match(/translateY\(([^)]+)\)/);
            const indicatorY = parseFloat(match ? match[1] : '0');

            if (indicatorY > 50) {
                indicator.classList.add('refreshing');
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }

            indicator.style.transform = 'translateX(-50%) translateY(-50px)';
            indicator.style.opacity = '0';
            indicator.classList.remove('refreshing');
            isPulling = false;
        }, { passive: true });
    }

    // ==========================================
    // OBSERVER DE MUDANÇA DE PÁGINA
    // ==========================================
    let hashObserverInitialized = false;
    function observePageChanges() {
        if (hashObserverInitialized) return;
        hashObserverInitialized = true;

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
            /* ========== BOTTOM NAVIGATION (GLASS) ========== */
            #efin-bottom-nav {
                position: fixed;
                bottom: 16px;
                left: 16px;
                right: 16px;
                height: 62px;
                background: rgba(15,15,15,0.78);
                display: flex;
                justify-content: space-between;
                align-items: center;
                z-index: 9999;
                padding: 8px 12px calc(8px + env(safe-area-inset-bottom));
                backdrop-filter: blur(22px);
                -webkit-backdrop-filter: blur(22px);
                border-radius: 999px;
                border: 1px solid rgba(255,255,255,0.08);
                box-shadow: 0 18px 35px rgba(0,0,0,0.6);
            }

            .efin-nav-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-decoration: none;
                color: rgba(255,255,255,0.6);
                font-size: 0.68em;
                transition: all 0.2s ease;
                padding: 4px 6px;
                border-radius: 999px;
                flex: 1;
                min-width: 0;
            }

            .efin-nav-item .material-icons {
                font-size: 1.6em;
                margin-bottom: 2px;
            }

            .efin-nav-item.active {
                color: #ffffff;
                background: rgba(255,255,255,0.10);
            }

            .efin-nav-item.active .material-icons {
                color: var(--activeColor, #e50914);
            }

            .efin-nav-label {
                font-weight: 500;
                white-space: nowrap;
            }

            /* Espaço para bottom nav flutuante */
            @media (max-width: 768px) {
                body {
                    padding-bottom: 110px !important;
                }
                .mainDrawer-scrollContainer,
                .view,
                .page {
                    padding-bottom: 110px !important;
                }
            }

            /* Espaço para bottom nav em tablets */
            body.efin-tablet {
                padding-bottom: 110px !important;
            }
            body.efin-tablet .mainDrawer-scrollContainer,
            body.efin-tablet .view,
            body.efin-tablet .page {
                padding-bottom: 110px !important;
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

            /* ========== CARDS ESTILO NETFLIX (sem bug de ratio) ========== */
            @media (max-width: 768px) {
                /* Não forçar mais aspect ratio — evita bug no "Continuar Assistindo" */
                .cardImageContainer {
                    border-radius: 6px !important;
                    overflow: hidden !important;
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

                /* Remover espaçamento extra entre sessões */
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

            /* ========== DESKTOP - ESCONDE BOTTOM NAV E FILTROS ========== */
            @media (min-width: 769px) {
                #efin-bottom-nav {
                    display: none;
                }

                #efin-category-filters {
                    display: none;
                }

                /* Força exibição em tablets (iPad) */
                body.efin-tablet #efin-bottom-nav {
                    display: flex !important;
                }

                body.efin-tablet #efin-category-filters {
                    display: block !important;
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

})();
