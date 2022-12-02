customElements.define('banner-with-title', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
    <div class="title"></div>
    <div class="subtitle"></div>
  `
  #style = /* css */ `
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100vw;
      height: 40vh;
      background-image: var(--bgi);
      background-size: cover;
      background-position: center;
      position: relative;
      box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.14) , 0px 3px 1px -2px rgba(0,0,0,0.12) , 0px 1px 5px 0px rgba(0,0,0,0.2);
    }

    .title {
      font-size: 48px;
      font-weight: 600;
      color: white;
      filter: drop-shadow(0 0 5px black);
    }

    .subtitle {
      font-size: 24px;
      font-weight: 400;
      color: white;
    }
  `
  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.innerHTML = `${this.#template} <style>${this.#style}</style>`
    this.maintitle = this.#shadowRoot.querySelector('.title')
    this.subtitle = this.#shadowRoot.querySelector('.subtitle')
  }

  static get observedAttributes () {
    return ['src', 'maintitle', 'subtitle']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    switch (name) {
      case 'maintitle':
        this.maintitle.textContent = newValue
        break
      case 'subtitle':
        this.subtitle.textContent = newValue
        break
      case 'src':
        this.style.setProperty('--bgi', `url(${newValue})`)
        break
      default:
        break
    }
  }
})
