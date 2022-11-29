customElements.define('frontpage-content', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
  <div class="parent">
    <div class="div1"></div>
    <div class="div2"></div>
    <div class="div3"></div>
    <div class="div4"></div>
    <div class="div5"></div>
    <div class="div6"></div>
    <div class="div7"></div>
    <div class="div8"></div>
    <div class="div9"></div>
    <div class="div10"></div>
    <div class="div11"></div>
    <div class="div12"></div>
  </div>
  `

  #style = /* css */ `
  :host {
    display: block;
    width: 100vw;
    height: 100vh;
    background-color: var(--primary-color);

    mask-image: url("src/assets/images/flower-rain.svg");
    mask-size: cover;
    mask-repeat: no-repeat;
    mask-position: center;

    -webkit-mask-image: url("src/assets/images/flower-rain.svg");
    -webkit-mask-size: cover;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
    -webkit-mask-attachment: fixed;
  }

  .parent {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);
    grid-column-gap: 5px;
    grid-row-gap: 5px;

    width: 90vw;
    height: 100vh;
    scroll-margin-top: 0;
  }

  .div1 { grid-area: 1 / 5 / 3 / 7; }
  .div2 { grid-area: 1 / 7 / 3 / 9; }
  .div3 { grid-area: 3 / 5 / 5 / 7; }
  .div4 { grid-area: 3 / 7 / 5 / 9; }
  .div5 { grid-area: 1 / 1 / 6 / 5; }
  .div6 { grid-area: 6 / 1 / 7 / 2; }
  .div7 { grid-area: 6 / 2 / 7 / 3; }
  .div8 { grid-area: 6 / 3 / 7 / 4; }
  .div9 { grid-area: 6 / 4 / 7 / 5; }
  .div10 { grid-area: 5 / 5 / 9 / 9; }
  .div11 { grid-area: 7 / 3 / 9 / 5; }
  .div12 { grid-area: 7 / 1 / 9 / 3; }
  `

  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.innerHTML = `${this.#template} <style>${this.#style}</style>`
  }

  static get observedAttributes () {
    return []
  }

  attributeChangedCallback (name, oldValue, newValue) {
    switch (name) {
      case '':
        break
      default:
        break
    }
  }
})
