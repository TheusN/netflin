<!-- Banner Image -->
<img src="https://github.com/lscambo13/ElegantFin/blob/main/Theme/assets/img/banner.png?raw=true" alt="ElegantFin Theme for Jellyfin - Banner">

# ⭐ Netflin - Tema ElegantFin para Jellyfin

Um tema moderno e elegante para Jellyfin inspirado no Jellyseerr. Oferece uma experiência visual aprimorada com correções de UI/UX, proporcionando ao Jellyfin uma aparência fresca e moderna que funciona perfeitamente em dispositivos móveis, desktop e TV.

---

## ✨ Características Principais
- 🎨 Layouts modernos e paleta de cores refinada
- ✨ Animações aprimoradas na maioria dos elementos
- 🔲 Cantos arredondados e espaçamento uniforme
- 🎭 Bordas estilizadas, efeitos de hover e sombras
- 📐 Layout organizado que destaca o conteúdo importante
- 🧹 Redução de elementos desnecessários
- 🔧 Várias correções para melhorar a experiência do usuário
- 📱 Design consistente em celular, desktop e TV

---

## 🚀 Como Instalar

**Cole o seguinte código na caixa de Custom CSS:**

```css
@import url("https://cdn.jsdelivr.net/gh/TheusN/netflin@main/Theme/ElegantFin-jellyfin-theme-build-latest-minified.css");
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

### 📡 Links Alternativos

**jsDelivr CDN (Recomendado - Mais Rápido):**
```css
@import url("https://cdn.jsdelivr.net/gh/TheusN/netflin@main/Theme/ElegantFin-jellyfin-theme-build-latest-minified.css");
```

**Versão mais recente (v25.10.27):**
```css
@import url("https://cdn.jsdelivr.net/gh/TheusN/netflin@main/Theme/ElegantFin-theme-v25.10.27.css");
```

**Versão Nightly (em desenvolvimento):**
```css
@import url("https://cdn.jsdelivr.net/gh/TheusN/netflin@main/Theme/ElegantFin-theme-nightly.css");
```

---

## 🧩 Como Personalizar

<details>
  <summary><i>1. Capas personalizadas para bibliotecas de mídia</i></summary>

<img width="640" height="auto" alt="image" src="https://github.com/user-attachments/assets/05eb7cb6-3ac9-444b-8988-9776e0815664" />

- Leia mais sobre este complemento experimental [aqui](https://github.com/TheusN/netflin/blob/main/custom-media-covers.md)

</details>

<details>
  <summary><i>2. Imagem de fundo personalizada para a página de login</i></summary>

<img width="auto" height="350" alt="image" src="https://github.com/user-attachments/assets/70834545-d1cd-4496-975a-4310030dedd9" />
<img width="auto" height="350" alt="image" src="https://github.com/user-attachments/assets/c3cf2d96-0db0-4acb-bc61-7b08d5445452" />

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
  <summary><i>3. Ativar botões extras nos cards no desktop</i></summary>

  <img width="400" height="auto" alt="image" src="https://github.com/user-attachments/assets/cb8479c2-c577-4d54-a567-697f54291a3b" />

- Para ativar os botões 'Marcar como Assistido' e 'Adicionar aos Favoritos' que aparecem no canto inferior direito dos cards ao passar o mouse, copie e cole o seguinte código no final da caixa Custom CSS, clique em salvar e atualize seu app/página:
  ```css
  :root{
    --extraCardButtonsVisibility: block;
  }
  ```
- Para ocultá-los novamente, simplesmente remova este bloco de código ou substitua `block` por `none`
</details>

<details>
  <summary><i>4. Posicionar o botão play no centro dos cards no desktop</i></summary>

  <img width="400" height="auto" alt="image" src="https://github.com/user-attachments/assets/ebde9db6-cd2f-47b5-bdb9-cee1e9852e2e" />

- Para trazer o mini botão play para o centro dos cards, copie e cole o seguinte código no final da caixa Custom CSS, clique em salvar e atualize seu app/página:
  ```css
  :root{
    --overlayPlayButtonPosition: 50%;
  }
  ```
- Para desfazer esta alteração, simplesmente remova este bloco de código ou substitua `50%` por `2.8em`
</details>

<details>
  <summary><i>5. Desativar o efeito hover nos cards no desktop</i></summary>

https://github.com/user-attachments/assets/ac22440d-39d7-48d6-a8da-3b7777372ffd

- Para desativar o reflexo nos cards que aparece ao passar o mouse sobre eles no desktop, copie e cole o seguinte código no final da caixa Custom CSS, clique em salvar e atualize seu app/página:
```css
  :root{
    --cardHoverEffect: none;
  }
```
- Para desfazer esta alteração, simplesmente remova este bloco de código ou substitua `none` por `""`
</details>

<details>
  <summary><i>6. Ativar legendas abaixo dos cards de biblioteca</i></summary>

  <img width="640" height="auto" alt="image" src="https://github.com/user-attachments/assets/5999a5de-5134-4b02-94aa-6306768a251c" />

- Para ativar legendas de texto abaixo dos cards de biblioteca de mídia, copie e cole o seguinte código no final da caixa Custom CSS, clique em salvar e atualize seu app/página:
```css
  :root{
    --libraryLabelVisibility: block;
  }
```
- Para desfazer esta alteração, simplesmente remova este bloco de código ou substitua `block` por `none`
</details>

<details>
  <summary><i>7. Ativar suporte experimental para o plugin Media Bar</i></summary>

  <img width="640" height="auto" alt="image" src="https://github.com/user-attachments/assets/3e88e270-40f9-48ba-8173-f65b94344f8d" />

- O ElegantFin não suporta plugins por padrão, então para adicionar suporte externo para [este plugin](https://github.com/IAmParadox27/jellyfin-plugin-media-bar), copie e cole o seguinte código no final da caixa Custom CSS, clique em salvar e atualize seu app/página:
```css
@import url("https://cdn.jsdelivr.net/gh/TheusN/netflin@main/Theme/assets/add-ons/media-bar-plugin-support-latest-min.css");
```
- Para desfazer esta alteração, simplesmente remova este bloco de código
</details>

---

## 🆗 Testado em
- Jellyfin Server v10.10.7
- Microsoft Edge (Chromium)
- Jellyfin Android App v2.6.3

**Nota:** Suporte para v10.11.0 está em desenvolvimento

---

## 🛠️ Solução de Problemas

<details>
  <summary>1️⃣ - <i>Como verifico se estou usando a versão mais recente do ElegantFin?</i></summary>

- Para garantir que você está usando a versão mais recente do ElegantFin, verifique o número da versão na parte inferior da tela do Dashboard
- Deve ser algo como ElegantFin v25.10.XX
</details>

<details>
  <summary>2️⃣ - <i>Vejo que uma nova versão está disponível, mas ainda não a recebi. Por quê?</i></summary>

- Se o rodapé do Dashboard mostra uma versão antiga, significa que seu app ainda está usando um cache antigo
- Quando o cache for atualizado, a nova versão será carregada
- Para obter a versão mais recente, você precisará limpar o cache. Existem várias maneiras de fazer isso:
- Na versão web, force uma atualização da página usando CTRL + F5
- Nos apps, tente fazer logout e login novamente. OU no caso do Jellyfin Media Player no Windows, você pode precisar deletar a pasta de cache. Isso definitivamente puxará a versão mais recente
</details>

<details>
  <summary>3️⃣ - <i>Por que noto bugs visuais e inconsistências no Jellyfin Media Player?</i></summary>

- A partir da versão 1.12.0, o JMP é baseado em Qt 5.x que usa um motor web muito desatualizado, então não suporta muitos recursos CSS novos. Quando uma nova versão baseada em Qt 6.x for lançada, a maioria dos problemas deve ser resolvida automaticamente. Até lá, o JMP não é suportado e eu recomendo usar o app web
</details>

<details>
  <summary>4️⃣ - <i>Funciona na versão AndroidTV do app Jellyfin?</i></summary>

- A partir da versão 0.18.11, o app oficial Jellyfin para AndroidTVs não suporta temas CSS, mas o app Android para celular suporta. A versão WebOS do app parece ser baseada na versão do celular, então suporta o tema perfeitamente
</details>

<details>
  <summary>5️⃣ - <i>Todos os ícones na minha TV LG parecem quebrados. Como corrigir?</i></summary>

- Parece que os ícones Material modernos que este tema usa [não são compatíveis com algumas TVs WebOS](https://github.com/lscambo13/ElegantFin/issues/39). Há [uma thread similar enorme](https://www.reddit.com/r/youtubetv/comments/e27go3/chinese_symbols_instead_of_icons_on_lg_tv/) sobre isso
- Este bug pode ser corrigido usando os ícones antigos, então implementei a seguinte solução para trazer de volta os ícones antigos suportados
- Simplesmente adicione o seguinte código no final da caixa Custom CSS e salve, depois atualize seus apps e páginas web:

  ```css
  :root{
    --iconPack: 'Material Icons';
  }
  ```
</details>

<details>
  <summary>6️⃣ - <i>Como reporto bugs/problemas?</i></summary>

- Primeiro verifique [aqui](https://github.com/TheusN/netflin/issues?q=) se um problema similar já foi reportado. Se existir, vote e comente lá para me avisar
- Alternativamente, crie um novo issue [aqui](https://github.com/TheusN/netflin/issues/new/choose)
</details>

---

## 📌 Contribuindo

Por favor, leia as [Diretrizes de Contribuição](./CONTRIBUTING.md) antes de abrir pull requests.

## 🙏 Feedback Apreciado

Por favor, use o template correto ao criar um [issue](https://github.com/TheusN/netflin/issues/new/choose) para [reportar bugs](https://github.com/TheusN/netflin/issues/new?template=bug_report.md) ou [fornecer sugestões](https://github.com/TheusN/netflin/issues/new?template=feature_request.md).

---

## 📜 Créditos e Licença

Este projeto é uma continuação e fork do **[ElegantFin](https://github.com/lscambo13/ElegantFin)** criado originalmente por **[lscambo13](https://github.com/lscambo13)**.

**Mantido atualmente por:** [TheusN](https://github.com/TheusN)

Todo o crédito pelo design e conceito original vai para o autor do ElegantFin. Este fork mantém o espírito e qualidade do projeto original, com melhorias e manutenção contínua.

### 📄 Licença
GPL-2.0 License - Use livremente!

---

<div align="center">

**Desenvolvido com ❤️ para a comunidade Jellyfin**

[⭐ ElegantFin Original](https://github.com/lscambo13/ElegantFin) • [🐛 Reportar Bug](https://github.com/TheusN/netflin/issues) • [💡 Sugerir Feature](https://github.com/TheusN/netflin/issues)

</div>
