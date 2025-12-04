/**
 * ElegantFin Banner Carousel
 * Exibe um carrossel com os 5 últimos filmes e 5 últimas séries adicionados
 * Para uso com Jellyfin JavaScript Injector
 */

(function() {
    'use strict';

    // Configurações do carrossel
    const CONFIG = {
        movieCount: 5,           // Quantidade de filmes
        seriesCount: 5,          // Quantidade de séries
        interval: 8000,          // Tempo entre slides (ms)
        transitionDuration: 800, // Duração da transição (ms)
        showOnPages: ['home'],   // Páginas onde exibir o carrossel
    };

    // Variáveis globais
    let currentSlide = 0;
    let slides = [];
    let autoPlayInterval = null;
    let carouselContainer = null;

    // Aguarda o DOM e a API do Jellyfin estarem prontos
    function init() {
        // Verifica se já foi inicializado
        if (document.getElementById('elegantfin-banner-carousel')) {
            return;
        }

        // Aguarda a página home carregar
        const checkPage = setInterval(() => {
            const isHomePage = window.location.hash === '#!/home.html' ||
                               window.location.hash.includes('home') ||
                               document.querySelector('.homePage');

            if (isHomePage && window.ApiClient) {
                clearInterval(checkPage);
                loadCarouselData();
            }
        }, 500);
    }

    // Busca dados da API do Jellyfin
    async function loadCarouselData() {
        try {
            const userId = window.ApiClient.getCurrentUserId();

            // Busca filmes e séries em paralelo
            const [moviesResponse, seriesResponse] = await Promise.all([
                window.ApiClient.getLatestItems({
                    UserId: userId,
                    Limit: CONFIG.movieCount,
                    IncludeItemTypes: 'Movie',
                    Fields: 'Overview,Backdrop,Logo',
                    EnableImages: true,
                    ImageTypeLimit: 1
                }),
                window.ApiClient.getLatestItems({
                    UserId: userId,
                    Limit: CONFIG.seriesCount,
                    IncludeItemTypes: 'Series',
                    Fields: 'Overview,Backdrop,Logo',
                    EnableImages: true,
                    ImageTypeLimit: 1
                })
            ]);

            // Combina e embaralha os resultados
            slides = [...moviesResponse, ...seriesResponse];
            slides = shuffleArray(slides);

            if (slides.length > 0) {
                createCarousel();
                startAutoPlay();
            }
        } catch (error) {
            console.error('ElegantFin Carousel: Erro ao carregar dados', error);
        }
    }

    // Embaralha array (Fisher-Yates)
    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Cria a estrutura HTML do carrossel
    function createCarousel() {
        // Remove carrossel existente se houver
        const existing = document.getElementById('elegantfin-banner-carousel');
        if (existing) existing.remove();

        // Cria container principal
        carouselContainer = document.createElement('div');
        carouselContainer.id = 'elegantfin-banner-carousel';
        carouselContainer.innerHTML = `
            <div class="efin-carousel-wrapper">
                <div class="efin-carousel-slides">
                    ${slides.map((item, index) => createSlideHTML(item, index)).join('')}
                </div>
                <div class="efin-carousel-overlay"></div>
                <div class="efin-carousel-content">
                    <div class="efin-carousel-info">
                        <span class="efin-carousel-type"></span>
                        <h2 class="efin-carousel-title"></h2>
                        <p class="efin-carousel-overview"></p>
                        <div class="efin-carousel-buttons">
                            <button class="efin-btn-play" onclick="window.ElegantFinCarousel.playItem()">
                                <span class="material-icons">play_arrow</span>
                                Assistir
                            </button>
                            <button class="efin-btn-info" onclick="window.ElegantFinCarousel.openDetails()">
                                <span class="material-icons">info</span>
                                Mais Informações
                            </button>
                        </div>
                    </div>
                </div>
                <div class="efin-carousel-indicators">
                    ${slides.map((_, index) => `
                        <button class="efin-indicator ${index === 0 ? 'active' : ''}"
                                onclick="window.ElegantFinCarousel.goToSlide(${index})">
                        </button>
                    `).join('')}
                </div>
                <button class="efin-carousel-nav efin-nav-prev" onclick="window.ElegantFinCarousel.prevSlide()">
                    <span class="material-icons">chevron_left</span>
                </button>
                <button class="efin-carousel-nav efin-nav-next" onclick="window.ElegantFinCarousel.nextSlide()">
                    <span class="material-icons">chevron_right</span>
                </button>
            </div>
        `;

        // Adiciona estilos
        addStyles();

        // Insere no início da página home
        const homeSection = document.querySelector('.homePage .homeSectionsContainer') ||
                           document.querySelector('.homePage') ||
                           document.querySelector('#homeTab') ||
                           document.querySelector('main');

        if (homeSection) {
            homeSection.insertBefore(carouselContainer, homeSection.firstChild);
            updateSlideContent(0);
        }
    }

    // Cria HTML de cada slide
    function createSlideHTML(item, index) {
        const backdropUrl = getBackdropUrl(item);
        return `
            <div class="efin-carousel-slide ${index === 0 ? 'active' : ''}"
                 data-index="${index}"
                 style="background-image: url('${backdropUrl}')">
            </div>
        `;
    }

    // Obtém URL do backdrop
    function getBackdropUrl(item) {
        const serverId = window.ApiClient.serverId();
        const baseUrl = window.ApiClient.serverAddress();

        // Tenta backdrop, depois primary
        if (item.BackdropImageTags && item.BackdropImageTags.length > 0) {
            return `${baseUrl}/Items/${item.Id}/Images/Backdrop/0?quality=90&maxWidth=1920`;
        } else if (item.ImageTags && item.ImageTags.Primary) {
            return `${baseUrl}/Items/${item.Id}/Images/Primary?quality=90&maxWidth=1920`;
        }
        return '';
    }

    // Atualiza conteúdo do slide atual
    function updateSlideContent(index) {
        const item = slides[index];
        if (!item) return;

        const typeLabel = item.Type === 'Movie' ? 'FILME' : 'SÉRIE';
        const overview = item.Overview ?
            (item.Overview.length > 200 ? item.Overview.substring(0, 200) + '...' : item.Overview) :
            '';

        const typeEl = carouselContainer.querySelector('.efin-carousel-type');
        const titleEl = carouselContainer.querySelector('.efin-carousel-title');
        const overviewEl = carouselContainer.querySelector('.efin-carousel-overview');

        if (typeEl) typeEl.textContent = typeLabel;
        if (titleEl) titleEl.textContent = item.Name;
        if (overviewEl) overviewEl.textContent = overview;
    }

    // Navega para slide específico
    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        const slidesElements = carouselContainer.querySelectorAll('.efin-carousel-slide');
        const indicators = carouselContainer.querySelectorAll('.efin-indicator');

        slidesElements.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });

        currentSlide = index;
        updateSlideContent(index);
        resetAutoPlay();
    }

    // Próximo slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Slide anterior
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Reproduz o item atual
    function playItem() {
        const item = slides[currentSlide];
        if (item) {
            if (item.Type === 'Movie') {
                window.location.hash = `#!/details?id=${item.Id}&autoplay=true`;
            } else {
                // Para séries, vai para a página de detalhes
                window.location.hash = `#!/details?id=${item.Id}`;
            }
        }
    }

    // Abre detalhes do item
    function openDetails() {
        const item = slides[currentSlide];
        if (item) {
            window.location.hash = `#!/details?id=${item.Id}`;
        }
    }

    // Inicia autoplay
    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, CONFIG.interval);
    }

    // Reseta autoplay
    function resetAutoPlay() {
        startAutoPlay();
    }

    // Para autoplay
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    // Adiciona estilos CSS
    function addStyles() {
        if (document.getElementById('elegantfin-carousel-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'elegantfin-carousel-styles';
        styles.textContent = `
            #elegantfin-banner-carousel {
                position: relative;
                width: 100%;
                height: 70vh;
                min-height: 400px;
                max-height: 700px;
                margin-bottom: 2em;
                overflow: hidden;
                border-radius: 0 0 20px 20px;
            }

            .efin-carousel-wrapper {
                position: relative;
                width: 100%;
                height: 100%;
            }

            .efin-carousel-slides {
                position: relative;
                width: 100%;
                height: 100%;
            }

            .efin-carousel-slide {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-size: cover;
                background-position: center top;
                opacity: 0;
                transition: opacity ${CONFIG.transitionDuration}ms ease-in-out;
            }

            .efin-carousel-slide.active {
                opacity: 1;
            }

            .efin-carousel-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(
                    to right,
                    rgba(0, 0, 0, 0.9) 0%,
                    rgba(0, 0, 0, 0.6) 40%,
                    rgba(0, 0, 0, 0.1) 70%,
                    transparent 100%
                ),
                linear-gradient(
                    to top,
                    rgba(0, 0, 0, 0.95) 0%,
                    rgba(0, 0, 0, 0.4) 30%,
                    transparent 60%
                );
                pointer-events: none;
            }

            .efin-carousel-content {
                position: absolute;
                bottom: 15%;
                left: 4%;
                max-width: 45%;
                z-index: 10;
            }

            .efin-carousel-type {
                display: inline-block;
                padding: 0.3em 0.8em;
                background: var(--activeColor, #7b68ee);
                color: white;
                font-size: 0.75em;
                font-weight: 600;
                border-radius: 4px;
                letter-spacing: 0.1em;
                margin-bottom: 0.8em;
            }

            .efin-carousel-title {
                font-size: 2.8em;
                font-weight: 700;
                color: white;
                margin: 0 0 0.4em 0;
                text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
                line-height: 1.1;
            }

            .efin-carousel-overview {
                font-size: 1em;
                color: rgba(255, 255, 255, 0.85);
                margin: 0 0 1.5em 0;
                line-height: 1.5;
                text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
            }

            .efin-carousel-buttons {
                display: flex;
                gap: 1em;
            }

            .efin-carousel-buttons button {
                display: flex;
                align-items: center;
                gap: 0.5em;
                padding: 0.8em 1.5em;
                border: none;
                border-radius: 8px;
                font-size: 1em;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .efin-btn-play {
                background: white;
                color: black;
            }

            .efin-btn-play:hover {
                background: rgba(255, 255, 255, 0.85);
                transform: scale(1.05);
            }

            .efin-btn-info {
                background: rgba(255, 255, 255, 0.2);
                color: white;
                backdrop-filter: blur(4px);
            }

            .efin-btn-info:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: scale(1.05);
            }

            .efin-carousel-indicators {
                position: absolute;
                bottom: 5%;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                gap: 0.5em;
                z-index: 10;
            }

            .efin-indicator {
                width: 40px;
                height: 4px;
                border: none;
                border-radius: 2px;
                background: rgba(255, 255, 255, 0.4);
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .efin-indicator.active {
                background: white;
                width: 60px;
            }

            .efin-indicator:hover {
                background: rgba(255, 255, 255, 0.7);
            }

            .efin-carousel-nav {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(0, 0, 0, 0.5);
                border: none;
                color: white;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                opacity: 0;
                transition: all 0.3s ease;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .efin-carousel-wrapper:hover .efin-carousel-nav {
                opacity: 1;
            }

            .efin-carousel-nav:hover {
                background: rgba(0, 0, 0, 0.8);
                transform: translateY(-50%) scale(1.1);
            }

            .efin-nav-prev {
                left: 2%;
            }

            .efin-nav-next {
                right: 2%;
            }

            .efin-carousel-nav .material-icons {
                font-size: 2em;
            }

            /* Responsivo */
            @media (max-width: 1200px) {
                .efin-carousel-content {
                    max-width: 55%;
                }
                .efin-carousel-title {
                    font-size: 2.2em;
                }
            }

            @media (max-width: 768px) {
                #elegantfin-banner-carousel {
                    height: 50vh;
                    min-height: 300px;
                }
                .efin-carousel-content {
                    max-width: 90%;
                    bottom: 20%;
                }
                .efin-carousel-title {
                    font-size: 1.6em;
                }
                .efin-carousel-overview {
                    font-size: 0.9em;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .efin-carousel-buttons button {
                    padding: 0.6em 1em;
                    font-size: 0.9em;
                }
                .efin-carousel-nav {
                    width: 40px;
                    height: 40px;
                }
            }

            @media (max-width: 480px) {
                .efin-carousel-content {
                    bottom: 25%;
                }
                .efin-carousel-title {
                    font-size: 1.3em;
                }
                .efin-carousel-overview {
                    display: none;
                }
                .efin-indicator {
                    width: 25px;
                }
                .efin-indicator.active {
                    width: 40px;
                }
            }
        `;

        document.head.appendChild(styles);
    }

    // Expõe funções globalmente para os botões onclick
    window.ElegantFinCarousel = {
        goToSlide,
        nextSlide,
        prevSlide,
        playItem,
        openDetails,
        stopAutoPlay,
        startAutoPlay
    };

    // Observa mudanças de página (SPA)
    function setupPageObserver() {
        let lastHash = window.location.hash;

        const checkHash = () => {
            const currentHash = window.location.hash;
            if (currentHash !== lastHash) {
                lastHash = currentHash;

                if (currentHash.includes('home')) {
                    setTimeout(init, 300);
                } else {
                    stopAutoPlay();
                }
            }
        };

        window.addEventListener('hashchange', checkHash);
        setInterval(checkHash, 1000);
    }

    // Inicializa quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            init();
            setupPageObserver();
        });
    } else {
        init();
        setupPageObserver();
    }

})();
