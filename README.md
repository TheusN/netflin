<!-- Banner Image -->
<img src="https://github.com/lscambo13/ElegantFin/blob/main/Theme/assets/img/banner.png?raw=true" alt="ElegantFin Theme for Jellyfin - Banner">

# Netflin - Tema ElegantFin para Jellyfin

Um tema moderno e elegante para Jellyfin inspirado no Jellyseerr. Oferece uma experiência visual aprimorada com correções de UI/UX, proporcionando ao Jellyfin uma aparência fresca e moderna que funciona perfeitamente em dispositivos móveis, desktop e TV.

---

## Características Principais

- Layouts modernos e paleta de cores refinada
- Animações aprimoradas na maioria dos elementos
- Cantos arredondados e espaçamento uniforme
- Bordas estilizadas, efeitos de hover e sombras
- Layout organizado que destaca o conteúdo importante
- Redução de elementos desnecessários
- Várias correções para melhorar a experiência do usuário
- Design consistente em celular, desktop e TV
- **Scripts JavaScript opcionais** para funcionalidades avançadas

---

## Como Instalar o Tema CSS

**Cole o seguinte código na caixa de Custom CSS:**

```css
@import url("https://cdn.jsdelivr.net/gh/TheusN/netflin@main/temas/ElegantFin-jellyfin-theme-build-latest-minified.css");
```

<details>
  <summary><i>Passos detalhados para implementação no servidor</i></summary>

1. Abra o Dashboard na aba Administração em Configurações
2. Selecione a aba General na barra lateral
3. Role para baixo até encontrar a caixa Custom CSS na seção Branding
4. Cole o código CSS personalizado na caixa Custom CSS
5. Clique em Salvar
</details>

<details>
  <summary><i>Passos detalhados para implementação no cliente</i></summary>

1. Abra a aba Display em Configurações
2. Role para baixo até encontrar a caixa Custom CSS
3. Cole o código CSS personalizado na caixa Custom CSS
4. Clique em Salvar
</details>

### Links Alternativos

**jsDelivr CDN (Recomendado - Mais Rápido):**
```css
@import url("https://cdn.jsdelivr.net/gh/TheusN/netflin@main/temas/ElegantFin-jellyfin-theme-build-latest-minified.css");
```

**Versão Nightly (em desenvolvimento):**
```css
@import url("https://cdn.jsdelivr.net/gh/TheusN/netflin@main/temas/ElegantFin-theme-nightly.css");
```

---

## Scripts JavaScript (Funcionalidades Avançadas)

O tema CSS transforma a aparência do Jellyfin, mas para funcionalidades mais avançadas como carrosséis dinâmicos e melhorias de navegação, oferecemos scripts JavaScript opcionais.

### Pré-requisito: Instalar o JavaScript Injector

Para usar os scripts, você precisa instalar o plugin **[Jellyfin JavaScript Injector](https://github.com/n00bcodr/Jellyfin-JavaScript-Injector)**:

1. Acesse **Dashboard > Plugins > Repositories**
2. Adicione o repositório: `https://raw.githubusercontent.com/n00bcodr/jellyfin-plugin-repo/main/manifest.json`
3. Vá em **Catalog**, busque "JavaScript Injector" e instale
4. Reinicie o Jellyfin
5. Acesse **Dashboard > Plugins > JavaScript Injector** para adicionar scripts

### Scripts Disponíveis

| Script | Descrição | Documentação |
|--------|-----------|--------------|
| **Banner Carousel** | Carrossel com os últimos filmes e séries adicionados, estilo Netflix | [Ver detalhes](docs/scripts.html#banner-carousel) |
| **Netflix Mobile Experience** | Transforma a interface mobile no estilo Netflix com bottom nav, filtros e gestos | [Ver detalhes](docs/scripts.html#netflix-mobile) |

**Acesse a [página de scripts](docs/scripts.html) para ver o código completo e instruções de instalação.**

---

## Personalização CSS

<details>
  <summary><i>1. Imagem de fundo personalizada para a página de login</i></summary>

- Para ativar o papel de parede na tela de login, primeiro marque a opção 'Ativar tela inicial' no seu Dashboard do Jellyfin abaixo da caixa Custom CSS
- Segundo, copie e cole o seguinte código no final da caixa Custom CSS, mas não salve ainda:
  ```css
  :root{
    --loginPageBgUrl: url("<SEU-ENDEREÇO-SERVIDOR-JELLYFIN>/Branding/Splashscreen?format=webp&foregroundLayer=1&quality=33&width=3840&height=2160&blur=2");
  }
  ```
- Terceiro, substitua `<SEU-ENDEREÇO-SERVIDOR-JELLYFIN>` pelo endereço do seu servidor Jellyfin, por exemplo, `http://192.168.0.1:8097`
- Não esqueça do http ou https correto no seu domínio
- Você também pode modificar os parâmetros, por exemplo, tamanho do blur ou resolução, de acordo com sua preferência
- Quando terminar, salve e atualize seus aplicativos e páginas web
</details>

<details>
  <summary><i>2. Ativar botões extras nos cards no desktop</i></summary>

- Para ativar os botões 'Marcar como Assistido' e 'Adicionar aos Favoritos' que aparecem no canto inferior direito dos cards ao passar o mouse, copie e cole o seguinte código no final da caixa Custom CSS, clique em salvar e atualize seu app/página:
  ```css
  :root{
    --extraCardButtonsVisibility: block;
  }
  ```
- Para ocultá-los novamente, simplesmente remova este bloco de código ou substitua `block` por `none`
</details>

<details>
  <summary><i>3. Posicionar o botão play no centro dos cards no desktop</i></summary>

- Para trazer o mini botão play para o centro dos cards, copie e cole o seguinte código no final da caixa Custom CSS, clique em salvar e atualize seu app/página:
  ```css
  :root{
    --overlayPlayButtonPosition: 50%;
  }
  ```
- Para desfazer esta alteração, simplesmente remova este bloco de código ou substitua `50%` por `2.8em`
</details>

<details>
  <summary><i>4. Desativar o efeito hover nos cards no desktop</i></summary>

- Para desativar o reflexo nos cards que aparece ao passar o mouse sobre eles no desktop, copie e cole o seguinte código no final da caixa Custom CSS, clique em salvar e atualize seu app/página:
```css
  :root{
    --cardHoverEffect: none;
  }
```
- Para desfazer esta alteração, simplesmente remova este bloco de código ou substitua `none` por `""`
</details>

<details>
  <summary><i>5. Ativar legendas abaixo dos cards de biblioteca</i></summary>

- Para ativar legendas de texto abaixo dos cards de biblioteca de mídia, copie e cole o seguinte código no final da caixa Custom CSS, clique em salvar e atualize seu app/página:
```css
  :root{
    --libraryLabelVisibility: block;
  }
```
- Para desfazer esta alteração, simplesmente remova este bloco de código ou substitua `block` por `none`
</details>

<details>
  <summary><i>6. Suporte para o plugin Media Bar</i></summary>

- O ElegantFin não suporta plugins por padrão, então para adicionar suporte externo para [este plugin](https://github.com/IAmParadox27/jellyfin-plugin-media-bar), copie e cole o seguinte código no final da caixa Custom CSS, clique em salvar e atualize seu app/página:
```css
@import url("https://cdn.jsdelivr.net/gh/TheusN/netflin@main/temas/assets/add-ons/media-bar-plugin-support-latest-min.css");
```
- Para desfazer esta alteração, simplesmente remova este bloco de código
</details>

<details>
  <summary><i>7. Correção de ícones para TVs LG WebOS</i></summary>

- Se os ícones aparecem quebrados na sua TV LG, adicione o seguinte código:
  ```css
  :root{
    --iconPack: 'Material Icons';
  }
  ```
</details>

---

## Testado em

- Jellyfin Server v10.10.7
- Microsoft Edge (Chromium)
- Jellyfin Android App v2.6.3
- WebOS TV App

**Nota:** Suporte para v10.11.0 está em desenvolvimento. O app AndroidTV não suporta temas CSS.

---

## Solução de Problemas

<details>
  <summary>Como verifico a versão do tema?</summary>

Verifique o número da versão na parte inferior da tela do Dashboard. Deve ser algo como `ElegantFin v25.10.XX`
</details>

<details>
  <summary>A versão não atualiza</summary>

Se o rodapé do Dashboard mostra uma versão antiga, limpe o cache:
- **Web:** Force atualização com CTRL + F5
- **Apps:** Faça logout e login novamente
</details>

<details>
  <summary>Problemas no Jellyfin Media Player</summary>

O JMP é baseado em Qt 5.x com motor web desatualizado. Recomendamos usar o app web até o lançamento de versão baseada em Qt 6.x
</details>

---

## Créditos e Licença

Este projeto é uma continuação e fork do **[ElegantFin](https://github.com/lscambo13/ElegantFin)** criado originalmente por **[lscambo13](https://github.com/lscambo13)**.

**Mantido atualmente por:** [TheusN](https://github.com/TheusN)

### Licença
GPL-2.0 License - Use livremente!

---

<div align="center">

**Desenvolvido com amor para a comunidade Jellyfin**

[ElegantFin Original](https://github.com/lscambo13/ElegantFin) | [Reportar Bug](https://github.com/TheusN/netflin/issues) | [Sugerir Feature](https://github.com/TheusN/netflin/issues)

</div>
