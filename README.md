# 🧬 Jogo da Vida de Conway — JavaScript Modular

Simulação interativa do clássico **Jogo da Vida de Conway**, implementado em **JavaScript modularizado**, com geração procedural de botões, zoom e controle de frames.

- Para ver clique aqui: [Jogo Da Vida ConWay](https://nathan8bits.github.io/gameLifeConway/)
---

## 📦 Estrutura Modular

A aplicação está organizada em arquivos modulares para manter a organização e facilitar manutenções:

- `main.js` — ponto de entrada, inicializa o jogo.
- `mapa.js` — classe `Mapa`, responsável pela lógica do jogo, grid e controles.
- `mapa.css` — folha de estilo

---

## 🚀 Como usar

1. Baixe os arquivos: `mapa.js` e `mapa.css`. Em seguida, mova-os para a estrutura do seu projeto;

2. Crie uma `div` com a classe `mapa` no body do seu HTML:
  ```html
    <div class="mapa"></div>
  ```

3. Adicione o caminho pra o `mapa.css` e `mapa.js` no head do seu HTML:
   ```html
     <link rel="stylesheet" type="text/css" href="assets/css/style.css" media="screen" />
     <script type="module" src="assets/js/Classes/main.js" defer></script>
   ```

4. Importe o módulo no seu main.js:

  ```js
    import { Mapa } from "./mapa.js"; //mude o caminho dependendo da estrutura do seu projeto
    const mapaHtml = document.querySelector(".mapa"); //div onde o jogo vai rodar
    let mapaObj = new Mapa(mapaHtml, 100, 100); //definindo a div e o tamanho do tabuleiro
  ```
5. O jogo será renderizado automaticamente dentro da `div.mapa`, com todos os controles funcionais.

---

## 🕹️ Controles Disponíveis
### A interface gera automaticamente os seguintes botões:

  - ▶️ Run — Inicia a simulação.

  - ⏸️ Pause — Pausa a simulação.

  - 🔄 Próximo — Avança um frame manualmente.

  - ❌ Clear — Limpa o mapa.

  - 🔍 Zoom + / - — Ajusta o zoom da grade.

---
## 🔁 Atualização Assíncrona
### A simulação roda com uma função async, que atualiza o grid a cada 500ms usando await.

- A lógica de evolução das células é baseada nas regras originais de Conway:
  - Qualquer célula viva com 2 ou 3 vizinhos sobrevive.
  - Qualquer célula morta com exatamente 3 vizinhos renasce.

- Todas as outras morrem ou permanecem mortas.

---

## 🛠️ Tecnologias
- HTML5
- CSS3
- JavaScript ES6 (módulos nativos)
- Git/Github

---

## 📸 Preview
![Jogo de ConWay rodando](./assets/img/conWay.mp4)

---
Criado por: Nathan8bits.
