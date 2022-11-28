customElements.define('colored-icon', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
  `

  #style = /* css */ `
    :host {
      display: block;
      content: "";
      background-color: ${this.color || 'black'};

      mask-image: url(${this.src});
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center;

      -webkit-mask-image: url(${this.src});
      -webkit-mask-size: contain;
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-position: center;

      min-height: ${this.size || this.height || '50px'};
      min-width: ${this.size || this.width || '50px'};
    }
  `

  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.innerHTML = `${this.#template} <style>${this.#style}</style>`
  }

  // 虽然创建之后不会用到，但还是在这里声明一下
  static get observedAttributes () {
    return ['color', 'src', 'size', 'width', 'height']
  }

  get color () {
    return this.getAttribute('color')
  }

  get src () {
    return this.getAttribute('src')
  }

  get size () {
    return this.getAttribute('size')
  }

  get width () {
    return this.getAttribute('width')
  }

  get height () {
    return this.getAttribute('height')
  }
})
