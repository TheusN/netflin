# ⚠️ Limitações e Possibilidades do CSS no Jellyfin

## Respondendo sua pergunta: É possível criar uma nova seção com CSS?

**Resposta Curta:** ❌ **NÃO, apenas com CSS não é possível.**

**Resposta Longa:** CSS sozinho **não pode** criar uma nova seção funcional entre "Minha Mídia" e "Continuar assistindo" que mostre os 10 filmes mais recentes. CSS só pode **estilizar** elementos que já existem no HTML.

---

## O que CSS PODE fazer ✅

### 1. Estilização Visual
- Mudar cores, fontes, tamanhos
- Adicionar bordas, sombras, gradientes
- Aplicar animações e transições
- Modificar transparências

### 2. Layout e Posicionamento
- Reposicionar elementos existentes
- Alterar tamanhos e espaçamentos
- Modificar grids e flexbox
- Ajustar responsividade

### 3. Visibilidade
```css
/* Ocultar uma seção */
.section0 {
    display: none;
}

/* Mostrar elemento oculto */
.hidden-element {
    display: block;
}
```

### 4. Texto Limitado (pseudo-elementos)
```css
/* Adicionar texto simples */
.sectionTitle::after {
    content: " - Novidade!";
    color: red;
}

/* Substituir texto */
.sectionTitle {
    font-size: 0; /* Oculta texto original */
}

.sectionTitle::before {
    font-size: 1.5rem;
    content: "Meu Título Personalizado";
}
```

### 5. Reordenar Seções Existentes
```css
#homeTab > div {
    display: flex;
    flex-direction: column;
}

/* Mover seção 2 para o topo */
.section2 {
    order: -1;
}

/* Mover seção 0 para o final */
.section0 {
    order: 999;
}
```

---

## O que CSS NÃO PODE fazer ❌

### 1. Criar Nova Estrutura HTML
```css
/* ❌ ISTO NÃO FUNCIONA */
#homeTab::after {
    content: "<div class='nova-secao'><h2>Filmes</h2></div>";
}
```

**Por quê?** CSS `content` só aceita **texto simples**, não HTML complexo.

### 2. Buscar Dados do Servidor
```css
/* ❌ IMPOSSÍVEL COM CSS */
.nova-secao {
    /* Não existe propriedade CSS para fazer requisições HTTP */
    data: url("/Items?Limit=10");
}
```

**Por quê?** CSS não tem capacidade de fazer requisições HTTP ou buscar dados.

### 3. Criar Componentes Interativos
```css
/* ❌ NÃO FUNCIONA */
.novo-carrossel {
    /* CSS não pode criar carrosséis funcionais do zero */
    interactive: true;
}
```

**Por quê?** CSS não pode adicionar JavaScript ou lógica de interação.

### 4. Adicionar Cards de Mídia
```css
/* ❌ IMPOSSÍVEL */
.section-custom::after {
    content: "10 cards de filmes aqui";
    /* CSS não pode gerar cards dinâmicos com dados reais */
}
```

**Por quê?** CSS não pode criar elementos HTML complexos nem buscar dados de filmes.

---

## 🔧 Como REALMENTE Adicionar Novas Seções

### Opção 1: Plugin JavaScript (Recomendado)

**1. Instale o plugin:**
- [jellyfin-plugin-custom-javascript](https://github.com/johnpc/jellyfin-plugin-custom-javascript)

**2. Adicione JavaScript customizado:**

```javascript
// Este código cria uma nova seção com filmes recentes
document.addEventListener('viewshow', function(e) {
    if (window.location.hash === '#/home.html') {
        setTimeout(function() {
            // Buscar 10 filmes mais recentes via API
            fetch('/Items?SortBy=DateCreated&SortOrder=Descending&Limit=10&Recursive=true&IncludeItemTypes=Movie&api_key=SEU_API_KEY')
                .then(response => response.json())
                .then(data => {
                    // Criar nova seção
                    const newSection = document.createElement('div');
                    newSection.className = 'section section-custom';
                    newSection.innerHTML = `
                        <div class="sectionTitleContainer sectionTitleContainer-cards padded-left">
                            <h2 class="sectionTitle sectionTitle-cards">
                                🎬 Últimos Filmes Adicionados
                            </h2>
                        </div>
                        <div class="itemsContainer padded-left padded-right scrollX hiddenScrollX focuscontainer-x">
                            ${data.Items.map(item => `
                                <a href="#/details?id=${item.Id}" class="card portraitCard">
                                    <div class="cardBox visualCardBox">
                                        <div class="cardScalable">
                                            <div class="cardPadder cardPadder-portrait"></div>
                                            <div class="cardContent cardImageContainer">
                                                <img src="/Items/${item.Id}/Images/Primary?maxWidth=400" alt="${item.Name}">
                                            </div>
                                        </div>
                                        <div class="cardText cardTextCentered">${item.Name}</div>
                                    </div>
                                </a>
                            `).join('')}
                        </div>
                    `;

                    // Inserir entre Minha Mídia (section0) e Continuar assistindo (section1)
                    const homeTab = document.querySelector('#homeTab > div');
                    const continueWatching = homeTab.querySelector('.section1');

                    if (continueWatching) {
                        homeTab.insertBefore(newSection, continueWatching);
                    }
                });
        }, 1000); // Aguarda 1 segundo para garantir que a página carregou
    }
});
```

**3. Estilize com CSS:**

```css
/* Agora você pode estilizar a nova seção com CSS */
.section-custom {
    padding: 0 3.3%;
    margin: 2em 0;
}

.section-custom .sectionTitle {
    color: rgb(255, 100, 100);
    font-size: 1.5rem;
}

.section-custom .itemsContainer {
    display: flex;
    gap: 1em;
    overflow-x: auto;
}

.section-custom .card:hover {
    transform: scale(1.05);
}
```

---

### Opção 2: Modificar Arquivos do Jellyfin Web

**⚠️ Atenção:** Modificações serão perdidas em atualizações!

```bash
# Linux
cd /usr/share/jellyfin/web/

# Windows
cd C:\Program Files\Jellyfin\Server\jellyfin-web\

# Editar arquivo home.html ou scripts
nano home/home.html
```

---

### Opção 3: Fork do Jellyfin Web

Para modificações permanentes:

```bash
# Clone o repositório
git clone https://github.com/jellyfin/jellyfin-web
cd jellyfin-web

# Faça suas modificações
# Compile
npm install
npm run build:production

# Use sua versão customizada
```

---

## 📊 Comparação de Métodos

| Método | Sobrevive Atualizações | Dificuldade | Flexibilidade | Recomendado? |
|--------|----------------------|-------------|---------------|--------------|
| **Só CSS** | ✅ Sim | ⭐ Fácil | ⭐ Baixa | Para estilo apenas |
| **Plugin JS** | ✅ Sim | ⭐⭐ Média | ⭐⭐⭐⭐ Alta | ✅ **SIM** |
| **Modificar Web** | ❌ Não | ⭐⭐ Média | ⭐⭐⭐⭐⭐ Total | Não recomendado |
| **Fork** | ❌ Não | ⭐⭐⭐⭐ Difícil | ⭐⭐⭐⭐⭐ Total | Para projetos grandes |

---

## 💡 Exemplos do que DÁ para fazer só com CSS

### Exemplo 1: Renomear e Reordenar Seções

```css
/* Mover "Continuar assistindo" para o topo */
#homeTab > div {
    display: flex;
    flex-direction: column;
}

.section1 {
    order: -1; /* Vai para o topo */
}

/* Renomear seção */
.section1 .sectionTitle {
    font-size: 0;
}

.section1 .sectionTitle::before {
    font-size: 1.5rem;
    content: "🔥 Continue De Onde Parou";
}
```

### Exemplo 2: Adicionar "Badge" em uma Seção

```css
.section2 .sectionTitle::after {
    content: " NOVO";
    background: red;
    color: white;
    padding: 0.2em 0.5em;
    border-radius: 0.3em;
    font-size: 0.7em;
    margin-left: 0.5em;
}
```

### Exemplo 3: Criar Separador Visual

```css
/* Adicionar linha separadora antes de uma seção */
.section3::before {
    content: "";
    display: block;
    height: 2px;
    background: linear-gradient(90deg, transparent, red, transparent);
    margin: 2em 3.3%;
}
```

### Exemplo 4: Destacar uma Seção Específica

```css
.section2 {
    background: linear-gradient(90deg, rgba(119, 91, 244, 0.1), transparent);
    padding: 2em 0;
    border-left: 4px solid rgb(119, 91, 244);
}

.section2 .sectionTitle {
    color: rgb(119, 91, 244);
    font-size: 2em;
    text-shadow: 0 0 10px rgba(119, 91, 244, 0.5);
}
```

---

## 🎯 Resumo Final

### Para o seu caso específico:

**Você quer:** Criar nova seção entre "Minha Mídia" e "Continuar assistindo" com 10 filmes recentes

**Solução:**
1. ❌ **CSS sozinho não é suficiente**
2. ✅ **Use Plugin JavaScript + CSS**
   - JavaScript cria a seção e busca os dados
   - CSS estiliza a seção criada
3. ✅ **Resultado:** Nova seção funcional e estilizada

**Passos:**
1. Instale [jellyfin-plugin-custom-javascript](https://github.com/johnpc/jellyfin-plugin-custom-javascript)
2. Copie o código JavaScript acima no plugin
3. Adicione o CSS de estilização no Custom CSS do Jellyfin
4. Pronto! 🎉

---

## 📚 Recursos Úteis

- [Plugin Custom JavaScript](https://github.com/johnpc/jellyfin-plugin-custom-javascript)
- [Jellyfin API Documentation](https://api.jellyfin.org/)
- [Jellyfin Web Repository](https://github.com/jellyfin/jellyfin-web)
- [CSS Customization Guide](https://jellyfin.org/docs/general/clients/css-customization/)

---

**Última atualização:** 27/10/2025
