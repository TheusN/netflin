# 📘 Guia Completo de Customização CSS do Jellyfin

> **Tema Base**: ElegantFin v25.10.28
> **Autor Original**: [lscambo13](https://github.com/lscambo13)
> **Repositório**: [TheusN/netflin](https://github.com/TheusN/netflin)

---

## 📑 Índice

1. [Variáveis CSS Customizáveis](#variáveis-css-customizáveis)
2. [Cores do Tema](#cores-do-tema)
3. [Componentes da Interface](#componentes-da-interface)
4. [Efeitos Visuais](#efeitos-visuais)
5. [Layout e Espaçamento](#layout-e-espaçamento)
6. [Customizações Avançadas](#customizações-avançadas)
7. [Exemplos Práticos](#exemplos-práticos)

---

## 🎨 Variáveis CSS Customizáveis

### Como Usar

Adicione suas customizações após o `@import` do tema:

```css
@import url("https://cdn.jsdelivr.net/gh/TheusN/netflin@main/Theme/ElegantFin-jellyfin-theme-build-latest-minified.css");

:root {
    /* Suas customizações aqui */
    --activeColor: rgb(255, 0, 0); /* Exemplo: cor de destaque vermelha */
}
```

---

## 🎨 Cores do Tema

### Cores de Fundo Base

| Variável | Padrão | Descrição | Exemplo |
|----------|--------|-----------|---------|
| `--darkerGradientPoint` | `#000000` | Cor de fundo mais escura (base) | `#1a1a1a` |
| `--darkerGradientPointAlpha` | `rgba(0, 0, 0, .85)` | Versão semi-transparente da cor escura | `rgba(26, 26, 26, .85)` |
| `--lighterGradientPoint` | `#0a0a0a` | Cor de fundo mais clara (gradiente) | `#2a2a2a` |
| `--lighterGradientPointAlpha` | `rgba(10, 10, 10, .85)` | Versão semi-transparente da cor clara | `rgba(42, 42, 42, .85)` |

**Exemplo de uso:**
```css
:root {
    --darkerGradientPoint: #0d1117;
    --lighterGradientPoint: #161b22;
}
```

---

### Cores de Interface

| Variável | Padrão | Descrição | Onde é usado |
|----------|--------|-----------|--------------|
| `--headerColor` | `rgba(15, 15, 15, .8)` | Cor do cabeçalho/barra superior | Header, modais |
| `--drawerColor` | `rgba(15, 15, 15, .9)` | Cor do menu lateral | Sidebar, drawers |
| `--borderColor` | `hsl(214, 13%, 32%)` | Cor das bordas padrão | Cards, botões, inputs |
| `--darkerBorderColor` | `hsl(214, 13%, 22%)` | Borda mais escura | Separadores |
| `--lighterBorderColor` | `hsla(0, 0%, 100%, .2)` | Borda mais clara | Hover states |

**Exemplo: tema azulado**
```css
:root {
    --headerColor: rgba(10, 25, 47, .8);
    --drawerColor: rgba(10, 25, 47, .9);
    --borderColor: hsl(210, 50%, 40%);
}
```

---

### Cores de Destaque e Ação

| Variável | Padrão | Descrição | Onde é usado |
|----------|--------|-----------|--------------|
| `--activeColor` | `rgb(119, 91, 244)` | Cor principal de destaque | Itens selecionados, tabs ativas |
| `--activeColorAlpha` | `rgba(119, 91, 244, .9)` | Versão transparente do destaque | Overlays, seleções |
| `--uiAccentColor` | `rgb(117 111 226)` | Cor de acento da UI | Progress bars, checkboxes |
| `--highlightOutlineColor` | `rgb(37, 99, 235)` | Cor do foco/outline | Elementos focados |

**Exemplo: destaque verde**
```css
:root {
    --activeColor: rgb(34, 197, 94);
    --activeColorAlpha: rgba(34, 197, 94, .9);
    --uiAccentColor: rgb(22, 163, 74);
}
```

---

### Cores de Botões

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `--btnMiniPlayColor` | `rgb(41 154 93)` | Botão play pequeno (verde) |
| `--btnMiniPlayBorderColor` | `rgb(50, 167, 105)` | Borda do botão play |
| `--btnDeleteColor` | `rgb(169, 29, 29)` | Botões de deletar (vermelho) |
| `--btnDeleteBorderColor` | `rgb(217, 84, 84)` | Borda de botões delete |
| `--btnSubmitColor` | `rgb(61, 54, 178)` | Botões de submit (azul) |
| `--btnSubmitBorderColor` | `rgb(117 111 226)` | Borda de botões submit |

**Exemplo: botões personalizados**
```css
:root {
    --btnMiniPlayColor: rgb(255, 152, 0);
    --btnMiniPlayBorderColor: rgb(255, 171, 0);
    --btnDeleteColor: rgb(211, 47, 47);
    --btnSubmitColor: rgb(25, 118, 210);
}
```

---

### Cores de Texto

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `--textColor` | `rgb(209, 213, 219)` | Cor do texto principal |
| `--dimTextColor` | `rgb(156, 163, 175)` | Cor do texto secundário/menos importante |

**Exemplo:**
```css
:root {
    --textColor: rgb(255, 255, 255);
    --dimTextColor: rgb(180, 180, 180);
}
```

---

### Cores de Elementos Específicos

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `--selectorBackgroundColor` | `rgb(55, 65, 81)` | Fundo de inputs/selects |
| `--selectorBackgroundColorAlpha` | `rgba(55, 65, 81, .5)` | Versão transparente |
| `--tableBodyColor` | `rgb(31 41 55 / 1)` | Cor de fundo de tabelas |
| `--checkboxCheckedBgColor` | `rgb(79, 70, 229)` | Checkbox marcado |

---

## 🎬 Componentes da Interface

### Player de Vídeo (OSD)

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `--osdSeekBarPlayedColor` | `var(--textColor)` | Cor da barra reproduzida |
| `--osdSeekBarBufferedColorAlpha` | `rgba(128, 128, 128, .5)` | Cor da barra bufferizada |
| `--osdSeekBarThumbColor` | `white` | Cor do marcador da barra |
| `--topOSDGradient` | `linear-gradient(...)` | Gradiente superior do player |
| `--bottomOSDGradient` | `linear-gradient(...)` | Gradiente inferior do player |

**Exemplo: player customizado**
```css
:root {
    --osdSeekBarPlayedColor: rgb(255, 0, 0);
    --osdSeekBarThumbColor: rgb(255, 255, 0);
}
```

---

### Cards de Mídia

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `--cardBackgroundGradient` | `linear-gradient(...)` | Gradiente de fundo dos cards |
| `--cardFooterGradient` | `linear-gradient(...)` | Gradiente do rodapé dos cards |
| `--cardHoverEffect` | `""` | Efeito de hover nos cards (`""` ou `none`) |
| `--overlayPlayButtonPosition` | `2.8em` | Posição do botão play (`2.8em` ou `50%`) |
| `--extraCardButtonsVisibility` | `none` | Botões extras no hover (`none` ou `block`) |

**Exemplo: cards sem efeito hover**
```css
:root {
    --cardHoverEffect: none;
    --extraCardButtonsVisibility: block;
    --overlayPlayButtonPosition: 50%; /* Centraliza botão play */
}
```

---

### Biblioteca/Home

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `--libraryLabelVisibility` | `none` | Labels abaixo dos cards da biblioteca (`none` ou `block`) |
| `--itemBackdropMask` | `linear-gradient(...)` | Máscara do backdrop de itens |
| `--backdropPositionY` | `50%` | Posição vertical do backdrop (`0%` a `100%`) |

---

## ✨ Efeitos Visuais

### Bordas Arredondadas

| Variável | Padrão | Descrição | Onde é usado |
|----------|--------|-----------|--------------|
| `--largerRadius` | `1.25em` | Raio maior | Modais grandes, dialogs |
| `--largeRadius` | `1em` | Raio grande | Cards, botões principais |
| `--smallRadius` | `.5em` | Raio pequeno | Inputs, tags |
| `--smallerRadius` | `.375em` | Raio menor | Badges, labels |

**Exemplo: mais arredondado**
```css
:root {
    --largerRadius: 2em;
    --largeRadius: 1.5em;
    --smallRadius: .75em;
}
```

**Exemplo: estilo quadrado**
```css
:root {
    --largerRadius: 0;
    --largeRadius: 0;
    --smallRadius: 0;
    --smallerRadius: 0;
}
```

---

### Efeitos de Blur

| Variável | Padrão | Descrição | Intensidade |
|----------|--------|-----------|-------------|
| `--blurSmallest` | `blur(2px)` | Blur mínimo | Leve |
| `--blurDefault` | `blur(5px)` | Blur padrão | Médio |
| `--blurLarge` | `blur(10px)` | Blur grande | Forte |
| `--blurLargest` | `blur(20px)` | Blur máximo | Muito forte |

**Exemplo: mais blur**
```css
:root {
    --blurDefault: blur(10px);
    --blurLarge: blur(20px);
    --blurLargest: blur(40px);
}
```

**Exemplo: sem blur**
```css
:root {
    --blurSmallest: blur(0);
    --blurDefault: blur(0);
    --blurLarge: blur(0);
    --blurLargest: blur(0);
}
```

---

### Sombras

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `--shadow` | `.1em .1em .15em hsla(0, 0%, 0%, .3)` | Sombra padrão de elementos |

**Exemplo: sombra mais forte**
```css
:root {
    --shadow: .2em .2em .3em hsla(0, 0%, 0%, .6);
}
```

---

### Gradientes

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `--backgroundGradient` | `linear-gradient(...)` | Gradiente do fundo principal |
| `--headerColorGradient` | `linear-gradient(...)` | Gradiente do header (com blur) |
| `--headerColorGradientAlt` | `linear-gradient(...)` | Gradiente alternativo (sem blur) |
| `--hoverGradientV` | `linear-gradient(...)` | Efeito hover vertical |
| `--hoverGradientH` | `linear-gradient(...)` | Efeito hover horizontal |

---

## 📐 Layout e Espaçamento

### Bordas

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `--borderWidth` | `.06em` | Espessura de borda padrão |
| `--borderWidthDouble` | `.12em` | Borda dupla (mais grossa) |
| `--defaultBorder` | `var(--borderWidth) solid var(--borderColor)` | Borda completa padrão |
| `--defaultLighterBorder` | `var(--borderWidth) solid var(--lighterBorderColor)` | Borda clara |

**Exemplo: bordas mais grossas**
```css
:root {
    --borderWidth: .1em;
    --borderWidthDouble: .2em;
}
```

---

### Espaçamento

| Variável | Padrão | Descrição | Onde é usado |
|----------|--------|-----------|--------------|
| `--sidePadding` | `3.3%` | Padding lateral das páginas | Margens da interface |
| `--itemColumnGap` | `1em` | Espaço entre items/cards | Grid de cards |
| `--primaryItemPageNegativeSpace` | `12vh` | Espaço negativo da página principal | Página de filme/série |
| `--secondaryItemPageNegativeSpace` | `35vh` | Espaço negativo secundário | Páginas secundárias |

**Exemplo: mais espaçoso**
```css
:root {
    --sidePadding: 5%;
    --itemColumnGap: 1.5em;
}
```

---

### Header/AppBar

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `--appBarHeight` | `5em` | Altura da barra superior (5em = fade, 4.6em = solid) |
| `--headerBlurLayerVisibility` | `""` | Blur no header (`""` = habilitado, `none` = desabilitado) |
| `--headerBackground` | `var(--headerColorGradient)` | Background do header |

**Exemplo: header sólido**
```css
:root {
    --appBarHeight: 4.6em;
    --headerBlurLayerVisibility: none;
    --headerBackground: var(--headerColorGradientAlt);
}
```

---

## 🔧 Customizações Avançadas

### Login Page

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `--loginPageBgUrl` | `url("")` | Imagem de fundo do login |
| `--loginPageText` | `"Sign in to continue"` | Texto da página de login |

**Exemplo: background personalizado**
```css
:root {
    --loginPageBgUrl: url("http://seu-servidor:8096/Branding/Splashscreen?format=webp&width=3840");
    --loginPageText: "Bem-vindo ao Jellyfin";
}
```

---

### Ícones

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `--iconPack` | `'Material Icons Round', Material Icons` | Família de ícones |

**Para WebOS TVs com problemas de ícones:**
```css
:root {
    --iconPack: 'Material Icons';
}
```

---

### Versão do Tema

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `--elegantFinFooterText` | `"ElegantFin v25.10.28"` | Texto no rodapé do dashboard |

```css
:root {
    --elegantFinFooterText: "Meu Tema Personalizado v1.0";
}
```

---

## 💡 Exemplos Práticos

### Tema Netflix Style (Vermelho)

```css
@import url("https://cdn.jsdelivr.net/gh/TheusN/netflin@main/Theme/ElegantFin-jellyfin-theme-build-latest-minified.css");

:root {
    /* Cores principais */
    --activeColor: rgb(229, 9, 20);
    --activeColorAlpha: rgba(229, 9, 20, .9);
    --uiAccentColor: rgb(229, 9, 20);

    /* Botões */
    --btnMiniPlayColor: rgb(229, 9, 20);
    --btnMiniPlayBorderColor: rgb(255, 40, 40);
    --btnSubmitColor: rgb(229, 9, 20);
    --btnSubmitBorderColor: rgb(255, 40, 40);

    /* Cards */
    --cardHoverEffect: none;
    --overlayPlayButtonPosition: 50%;

    /* Fundo mais escuro */
    --darkerGradientPoint: #141414;
    --lighterGradientPoint: #1a1a1a;
}
```

---

### Tema Disney+ Style (Azul)

```css
@import url("https://cdn.jsdelivr.net/gh/TheusN/netflin@main/Theme/ElegantFin-jellyfin-theme-build-latest-minified.css");

:root {
    /* Cores principais */
    --activeColor: rgb(17, 60, 207);
    --activeColorAlpha: rgba(17, 60, 207, .9);
    --uiAccentColor: rgb(17, 60, 207);

    /* Fundo azulado */
    --darkerGradientPoint: #040714;
    --lighterGradientPoint: #0c111b;
    --headerColor: rgba(6, 11, 25, .8);
    --drawerColor: rgba(6, 11, 25, .9);

    /* Bordas azuis */
    --borderColor: hsl(221, 83%, 25%);

    /* Cards */
    --libraryLabelVisibility: block;
    --extraCardButtonsVisibility: block;
}
```

---

### Tema Prime Video Style (Verde/Azul)

```css
@import url("https://cdn.jsdelivr.net/gh/TheusN/netflin@main/Theme/ElegantFin-jellyfin-theme-build-latest-minified.css");

:root {
    /* Cor destaque verde-água */
    --activeColor: rgb(0, 165, 222);
    --activeColorAlpha: rgba(0, 165, 222, .9);
    --uiAccentColor: rgb(0, 165, 222);

    /* Fundo escuro azulado */
    --darkerGradientPoint: #0f171e;
    --lighterGradientPoint: #1a2937;

    /* Botão play verde-água */
    --btnMiniPlayColor: rgb(0, 165, 222);
    --btnMiniPlayBorderColor: rgb(0, 185, 242);
}
```

---

### Tema Minimalista (Monocromático)

```css
@import url("https://cdn.jsdelivr.net/gh/TheusN/netflin@main/Theme/ElegantFin-jellyfin-theme-build-latest-minified.css");

:root {
    /* Sem bordas arredondadas */
    --largerRadius: 0;
    --largeRadius: 0;
    --smallRadius: 0;
    --smallerRadius: 0;

    /* Sem efeitos */
    --cardHoverEffect: none;
    --blurSmallest: blur(0);
    --blurDefault: blur(0);
    --blurLarge: blur(0);
    --blurLargest: blur(0);
    --shadow: none;

    /* Cores neutras */
    --activeColor: rgb(255, 255, 255);
    --uiAccentColor: rgb(220, 220, 220);

    /* Fundo preto puro */
    --darkerGradientPoint: #000000;
    --lighterGradientPoint: #000000;
}
```

---

### Tema High Contrast (Acessibilidade)

```css
@import url("https://cdn.jsdelivr.net/gh/TheusN/netflin@main/Theme/ElegantFin-jellyfin-theme-build-latest-minified.css");

:root {
    /* Cores de alto contraste */
    --textColor: rgb(255, 255, 255);
    --dimTextColor: rgb(200, 200, 200);

    /* Fundo preto puro */
    --darkerGradientPoint: #000000;
    --lighterGradientPoint: #000000;

    /* Bordas brancas visíveis */
    --borderColor: rgb(255, 255, 255);
    --borderWidth: .1em;

    /* Destaque amarelo */
    --activeColor: rgb(255, 255, 0);
    --highlightOutlineColor: rgb(255, 255, 0);

    /* Botões com mais contraste */
    --btnMiniPlayColor: rgb(0, 255, 0);
    --btnDeleteColor: rgb(255, 0, 0);

    /* Sem blur */
    --blurSmallest: blur(0);
    --blurDefault: blur(0);
    --blurLarge: blur(0);
    --blurLargest: blur(0);
}
```

---

## 🎯 Dicas Importantes

### 1. Testar Alterações
Sempre teste suas alterações em diferentes telas:
- Desktop
- Mobile
- TV/WebOS

### 2. Cores Legíveis
Mantenha bom contraste entre texto e fundo para acessibilidade.

### 3. Performance
Evite muitos efeitos de blur em dispositivos mais fracos:
```css
:root {
    --blurDefault: blur(3px);
    --blurLarge: blur(5px);
}
```

### 4. Backup
Sempre mantenha uma cópia do CSS original antes de modificar.

### 5. Cache
Lembre-se de limpar o cache (`Ctrl + Shift + R`) após mudanças.

---

## 📚 Referências

- [Documentação Oficial Jellyfin](https://jellyfin.org/docs/)
- [Material Design Icons](https://fonts.google.com/icons)
- [CSS Variables MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

---

## 🤝 Contribuindo

Encontrou algo que pode ser customizado e não está documentado? Abra uma issue ou PR!

**Repositório**: https://github.com/TheusN/netflin

---

**Última atualização**: 27/10/2025 - ElegantFin v25.10.28
