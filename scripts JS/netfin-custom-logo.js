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
        const replaceLogos = () => {
            // Busca todos os elementos img na página
            const allImages = document.querySelectorAll('img');

            allImages.forEach(img => {
                // Verifica se é uma logo do Jellyfin (src contém banner, icon ou logo)
                const src = img.src || '';
                const isJellyfinLogo =
                    src.includes('banner') ||
                    src.includes('icon') ||
                    src.includes('logo') ||
                    img.classList.contains('headerLogo') ||
                    img.classList.contains('pageTitleWithLogo') ||
                    img.classList.contains('imgLogoIcon');

                // Se for logo do Jellyfin e ainda não foi substituída
                if (isJellyfinLogo && !img.classList.contains('netfin-custom-logo')) {
                    console.log('🔄 Substituindo logo do Jellyfin:', src);
                    img.classList.add('netfin-custom-logo');
                    img.src = CONFIG.logoUrl;
                    img.alt = 'Netfin';

                    // Força estilos inline para garantir visibilidade
                    img.style.cssText = `
                        height: auto !important;
                        max-height: 40px !important;
                        width: auto !important;
                        object-fit: contain !important;
                        display: inline-block !important;
                        visibility: visible !important;
                        opacity: 1 !important;
                    `;

                    console.log('✅ Logo substituída com sucesso!');
                }
            });

            // Também busca por elementos com classes específicas
            const specificSelectors = [
                '.headerLogo',
                '.pageTitleWithLogo',
                '.imgLogoIcon',
                'a[href*="home"] img',
                '.skinHeader img'
            ];

            specificSelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    if (el && !el.classList.contains('netfin-custom-logo')) {
                        console.log('🔄 Substituindo logo via seletor:', selector);
                        el.classList.add('netfin-custom-logo');
                        el.src = CONFIG.logoUrl;
                        el.alt = 'Netfin';
                        el.style.cssText = `
                            height: auto !important;
                            max-height: 40px !important;
                            width: auto !important;
                            object-fit: contain !important;
                            display: inline-block !important;
                            visibility: visible !important;
                            opacity: 1 !important;
                        `;
                        console.log('✅ Logo substituída com sucesso via seletor!');
                    }
                });
            });
        };

        // Executa imediatamente
        console.log('🚀 Netfin Custom Logo: Iniciando substituição...');
        replaceLogos();

        // Executa novamente após delays (para elementos carregados dinamicamente)
        setTimeout(() => {
            console.log('⏱️ Tentativa após 500ms...');
            replaceLogos();
        }, 500);

        setTimeout(() => {
            console.log('⏱️ Tentativa após 1000ms...');
            replaceLogos();
        }, 1000);

        setTimeout(() => {
            console.log('⏱️ Tentativa após 2000ms...');
            replaceLogos();
        }, 2000);

        setTimeout(() => {
            console.log('⏱️ Tentativa após 3000ms...');
            replaceLogos();
        }, 3000);

        // Observer para mudanças no DOM
        const observer = new MutationObserver(() => {
            replaceLogos();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['src']
        });

        console.log('👀 Observer ativo - monitorando mudanças no DOM...');
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
