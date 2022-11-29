customElements.define('colored-icon', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
  `

  #style = /* css */ `
    :host {
      display: block;
      content: "";
      background-color: var(--color, ${this.color || 'black'});
      transition: 0.5s;

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

  static get observedAttributes () {
    return ['color', 'src', 'size', 'width', 'height']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    switch (name) {
      case 'color':
        this.style.setProperty('--color', newValue)
        break
    }
  }

  // #region [ property getters ]

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

  // #endregion
})
