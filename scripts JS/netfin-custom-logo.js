/**
 * Netfin - Custom Logo
 * Substitui a logo do Jellyfin pela logo do Netfin (branca)
 * Para uso com Jellyfin JavaScript Injector
 */

(function() {
    'use strict';

    // ==========================================
    // CONFIGURAÇÕES
    // ==========================================
    const CONFIG = {
        logoUrl: 'https://cdn.jsdelivr.net/gh/TheusN/netfin@main/temas/assets/img/logo-netfin-branca.png'
    };

    // ==========================================
    // SUBSTITUIÇÃO DE LOGO
    // ==========================================
    function replaceJellyfinLogo() {
        // Seletores da logo do Jellyfin
        const logoSelectors = [
            '.headerLogo',
            '.pageTitleWithLogo',
            'a[href="#!/home.html"] img',
            '.imgLogoIcon',
            'img[src*="web/assets/img/banner-light"]',
            'img[src*="web/assets/img/icon"]'
        ];

        const replaceLogos = () => {
            logoSelectors.forEach(selector => {
                const logos = document.querySelectorAll(selector);
                logos.forEach(logo => {
                    if (logo && !logo.classList.contains('netfin-custom-logo')) {
                        logo.classList.add('netfin-custom-logo');
                        logo.src = CONFIG.logoUrl;
                        logo.alt = 'Netfin';

                        // Ajusta estilo para garantir visibilidade
                        logo.style.height = 'auto';
                        logo.style.maxHeight = '40px';
                        logo.style.width = 'auto';
                        logo.style.objectFit = 'contain';
                    }
                });
            });
        };

        // Executa imediatamente e observa mudanças no DOM
        replaceLogos();

        // Executa novamente após 1 segundo (para casos de carregamento tardio)
        setTimeout(replaceLogos, 1000);
        setTimeout(replaceLogos, 2000);

        const observer = new MutationObserver(replaceLogos);
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // ==========================================
    // INICIALIZAÇÃO
    // ==========================================
    function init() {
        replaceJellyfinLogo();
        console.log('Netfin Custom Logo carregado!');
    }

    // Aguarda DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
