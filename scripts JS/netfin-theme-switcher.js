/**
 * Netfin - Theme Switcher & Custom Logo
 * Adiciona seletor de tema (Claro/Escuro/Sistema) e substitui logo do Jellyfin
 * Para uso com Jellyfin JavaScript Injector
 */

(function() {
    'use strict';

    // ==========================================
    // CONFIGURAÇÕES
    // ==========================================
    const CONFIG = {
        enableThemeSwitcher: true,      // Seletor de tema
        enableCustomLogo: true,         // Logo personalizada
        logoLight: 'https://cdn.jsdelivr.net/gh/TheusN/netfin@main/temas/assets/img/logo-netfin-vermelha.png',
        logoDark: 'https://cdn.jsdelivr.net/gh/TheusN/netfin@main/temas/assets/img/logo-netfin-branca.png',
        storageKey: 'netfin-theme-preference'
    };

    // ==========================================
    // GERENCIAMENTO DE TEMA
    // ==========================================
    class ThemeManager {
        constructor() {
            this.currentTheme = this.getSavedTheme();
            this.systemTheme = this.getSystemTheme();

            // Escuta mudanças no tema do sistema
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                this.systemTheme = e.matches ? 'dark' : 'light';
                if (this.currentTheme === 'system') {
                    this.applyTheme('system');
                }
            });
        }

        getSystemTheme() {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        getSavedTheme() {
            return localStorage.getItem(CONFIG.storageKey) || 'system';
        }

        saveTheme(theme) {
            localStorage.setItem(CONFIG.storageKey, theme);
        }

        getActiveTheme() {
            return this.currentTheme === 'system' ? this.systemTheme : this.currentTheme;
        }

        applyTheme(theme) {
            this.currentTheme = theme;
            this.saveTheme(theme);

            const activeTheme = this.getActiveTheme();

            // Aplica classe ao body
            document.body.classList.remove('netfin-light', 'netfin-dark');
            document.body.classList.add(`netfin-${activeTheme}`);

            // Atualiza logo
            this.updateLogo(activeTheme);

            // Dispara evento customizado
            window.dispatchEvent(new CustomEvent('netfin-theme-change', {
                detail: { theme: theme, activeTheme: activeTheme }
            }));
        }

        updateLogo(activeTheme) {
            const logos = document.querySelectorAll('.netfin-custom-logo');
            logos.forEach(logo => {
                logo.src = activeTheme === 'dark' ? CONFIG.logoDark : CONFIG.logoLight;
            });
        }

        setTheme(theme) {
            this.applyTheme(theme);
        }
    }

    // ==========================================
    // SUBSTITUIÇÃO DE LOGO
    // ==========================================
    function replaceJellyfinLogo() {
        // Seletores da logo do Jellyfin
        const logoSelectors = [
            '.headerLogo',
            '.pageTitleWithLogo',
            'a[href="#!/home.html"] img',
            '.imgLogoIcon'
        ];

        const replaceLogos = () => {
            logoSelectors.forEach(selector => {
                const logos = document.querySelectorAll(selector);
                logos.forEach(logo => {
                    if (logo && !logo.classList.contains('netfin-custom-logo')) {
                        logo.classList.add('netfin-custom-logo');
                        const activeTheme = themeManager.getActiveTheme();
                        logo.src = activeTheme === 'dark' ? CONFIG.logoDark : CONFIG.logoLight;
                        logo.alt = 'Netfin';

                        // Ajusta estilo
                        logo.style.height = 'auto';
                        logo.style.maxHeight = '40px';
                        logo.style.width = 'auto';
                    }
                });
            });
        };

        // Executa imediatamente e observa mudanças no DOM
        replaceLogos();

        const observer = new MutationObserver(replaceLogos);
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // ==========================================
    // CRIAÇÃO DO SELETOR DE TEMA
    // ==========================================
    function createThemeSwitcher() {
        if (document.getElementById('netfin-theme-switcher')) return;

        const switcher = document.createElement('div');
        switcher.id = 'netfin-theme-switcher';
        switcher.innerHTML = `
            <button class="netfin-theme-btn" id="netfin-theme-toggle" title="Alternar tema">
                <svg class="netfin-theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle class="netfin-sun" cx="12" cy="12" r="5"/>
                    <line class="netfin-sun" x1="12" y1="1" x2="12" y2="3"/>
                    <line class="netfin-sun" x1="12" y1="21" x2="12" y2="23"/>
                    <line class="netfin-sun" x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line class="netfin-sun" x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line class="netfin-sun" x1="1" y1="12" x2="3" y2="12"/>
                    <line class="netfin-sun" x1="21" y1="12" x2="23" y2="12"/>
                    <line class="netfin-sun" x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line class="netfin-sun" x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                    <path class="netfin-moon" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
            </button>
            <div class="netfin-theme-menu" id="netfin-theme-menu">
                <button class="netfin-theme-option" data-theme="light">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="5"/>
                        <line x1="12" y1="1" x2="12" y2="3"/>
                        <line x1="12" y1="21" x2="12" y2="23"/>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                        <line x1="1" y1="12" x2="3" y2="12"/>
                        <line x1="21" y1="12" x2="23" y2="12"/>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                    </svg>
                    <span>Claro</span>
                    <span class="netfin-check">✓</span>
                </button>
                <button class="netfin-theme-option" data-theme="dark">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    </svg>
                    <span>Escuro</span>
                    <span class="netfin-check">✓</span>
                </button>
                <button class="netfin-theme-option active" data-theme="system">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                        <line x1="8" y1="21" x2="16" y2="21"/>
                        <line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                    <span>Sistema</span>
                    <span class="netfin-check">✓</span>
                </button>
            </div>
        `;

        document.body.appendChild(switcher);
        setupThemeSwitcherEvents();
        updateThemeSwitcherUI();
    }

    function setupThemeSwitcherEvents() {
        const toggleBtn = document.getElementById('netfin-theme-toggle');
        const menu = document.getElementById('netfin-theme-menu');
        const options = document.querySelectorAll('.netfin-theme-option');

        // Toggle menu
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('show');
        });

        // Close menu quando clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#netfin-theme-switcher')) {
                menu.classList.remove('show');
            }
        });

        // Opções de tema
        options.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                themeManager.setTheme(theme);
                updateThemeSwitcherUI();
                menu.classList.remove('show');
            });
        });
    }

    function updateThemeSwitcherUI() {
        const options = document.querySelectorAll('.netfin-theme-option');
        const currentTheme = themeManager.currentTheme;
        const activeTheme = themeManager.getActiveTheme();
        const icon = document.querySelector('.netfin-theme-icon');

        // Atualiza opções ativas
        options.forEach(option => {
            option.classList.toggle('active', option.dataset.theme === currentTheme);
        });

        // Atualiza ícone do botão
        if (icon) {
            if (activeTheme === 'dark') {
                icon.querySelectorAll('.netfin-sun').forEach(el => el.style.display = 'none');
                icon.querySelectorAll('.netfin-moon').forEach(el => el.style.display = 'block');
            } else {
                icon.querySelectorAll('.netfin-sun').forEach(el => el.style.display = 'block');
                icon.querySelectorAll('.netfin-moon').forEach(el => el.style.display = 'none');
            }
        }
    }

    // ==========================================
    // ESTILOS CSS
    // ==========================================
    function addStyles() {
        if (document.getElementById('netfin-theme-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'netfin-theme-styles';
        styles.textContent = `
            /* ========== VARIÁVEIS DE TEMA ========== */
            :root {
                --netfin-theme-transition: background-color 0.3s ease, color 0.3s ease;
            }

            /* Tema Claro */
            body.netfin-light {
                --theme-primary-bg: #ffffff;
                --theme-secondary-bg: #f5f5f5;
                --theme-text-primary: #000000;
                --theme-text-secondary: #666666;
                --theme-border: #e0e0e0;
            }

            /* Tema Escuro (padrão do Jellyfin) */
            body.netfin-dark {
                --theme-primary-bg: #101010;
                --theme-secondary-bg: #1a1a1a;
                --theme-text-primary: #ffffff;
                --theme-text-secondary: #b3b3b3;
                --theme-border: #2a2a2a;
            }

            /* Aplicar cores baseadas no tema (opcional - não sobrescreve tema CSS principal) */
            body.netfin-light .backgroundContainer {
                background: var(--theme-primary-bg) !important;
            }

            /* ========== THEME SWITCHER ========== */
            #netfin-theme-switcher {
                position: fixed;
                top: 15px;
                right: 15px;
                z-index: 10000;
            }

            .netfin-theme-btn {
                width: 44px;
                height: 44px;
                border-radius: 50%;
                background: rgba(20, 20, 20, 0.8);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #ffffff;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            }

            body.netfin-light .netfin-theme-btn {
                background: rgba(255, 255, 255, 0.95);
                border-color: rgba(0, 0, 0, 0.1);
                color: #000000;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }

            .netfin-theme-btn:hover {
                transform: scale(1.05);
                box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
            }

            .netfin-theme-icon {
                width: 22px;
                height: 22px;
                stroke-width: 2;
            }

            .netfin-theme-icon .netfin-sun,
            .netfin-theme-icon .netfin-moon {
                transition: opacity 0.3s ease;
            }

            /* ========== THEME MENU ========== */
            .netfin-theme-menu {
                position: absolute;
                top: 52px;
                right: 0;
                background: rgba(20, 20, 20, 0.95);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 8px;
                min-width: 160px;
                opacity: 0;
                visibility: hidden;
                transform: translateY(-10px);
                transition: all 0.2s ease;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
            }

            body.netfin-light .netfin-theme-menu {
                background: rgba(255, 255, 255, 0.98);
                border-color: rgba(0, 0, 0, 0.1);
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            }

            .netfin-theme-menu.show {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }

            .netfin-theme-option {
                width: 100%;
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 10px 12px;
                background: transparent;
                border: none;
                border-radius: 8px;
                color: #ffffff;
                cursor: pointer;
                transition: background 0.2s ease;
                font-size: 14px;
                font-family: inherit;
            }

            body.netfin-light .netfin-theme-option {
                color: #000000;
            }

            .netfin-theme-option:hover {
                background: rgba(255, 255, 255, 0.1);
            }

            body.netfin-light .netfin-theme-option:hover {
                background: rgba(0, 0, 0, 0.05);
            }

            .netfin-theme-option svg {
                width: 18px;
                height: 18px;
                stroke-width: 2;
                flex-shrink: 0;
            }

            .netfin-theme-option span:first-of-type {
                flex: 1;
                text-align: left;
            }

            .netfin-theme-option .netfin-check {
                opacity: 0;
                color: var(--activeColor, #e50914);
                font-weight: bold;
                font-size: 16px;
            }

            .netfin-theme-option.active .netfin-check {
                opacity: 1;
            }

            /* ========== RESPONSIVO ========== */
            @media (max-width: 768px) {
                #netfin-theme-switcher {
                    top: 10px;
                    right: 10px;
                }

                .netfin-theme-btn {
                    width: 40px;
                    height: 40px;
                }

                .netfin-theme-icon {
                    width: 20px;
                    height: 20px;
                }
            }

            /* ========== ESCONDE EM PÁGINAS ESPECÍFICAS ========== */
            /* Esconde o seletor durante reprodução de vídeo */
            .videoPlayerContainer #netfin-theme-switcher {
                display: none;
            }
        `;

        document.head.appendChild(styles);
    }

    // ==========================================
    // INICIALIZAÇÃO
    // ==========================================
    let themeManager;

    function init() {
        addStyles();

        themeManager = new ThemeManager();
        themeManager.applyTheme(themeManager.currentTheme);

        if (CONFIG.enableThemeSwitcher) {
            createThemeSwitcher();
        }

        if (CONFIG.enableCustomLogo) {
            replaceJellyfinLogo();
        }

        console.log('Netfin Theme Switcher carregado! Tema atual:', themeManager.getActiveTheme());
    }

    // Aguarda DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expõe API global (opcional)
    window.NetfinTheme = {
        setTheme: (theme) => themeManager?.setTheme(theme),
        getTheme: () => themeManager?.currentTheme,
        getActiveTheme: () => themeManager?.getActiveTheme()
    };

})();
