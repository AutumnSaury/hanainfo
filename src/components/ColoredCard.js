import { getAverageColor, invertColor } from '../utils/AverageColorUtil.js'

customElements.define('colored-card', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
    <div class="image-wrapper">
      <img src="${this.src}">
    </div>
    <div class="text-overlay">
      <div class="overlay-titles">
        <div class="overlay__title">${this.title || ''}</div>
        <div class="overlay__subtitle">${this.subtitle || ''}</div>
      </div>
      <slot class="overlay__body"></slot>
    </div>
  `

  #style = /* css */ `
    :host {
      display: flex;
      flex-direction: var(--direction, row);
      width: 200px;
      height: 100px;
    }

    .image-wrapper {
      width: var(--image-width, 50%);
      height: 100%;
      position: relative;
      background-color: var(--bg-color, white);
    }

    .image-wrapper::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(var(--gradient-deg, 270deg), var(--bg-color), transparent 50%);
    }

    .image-wrapper > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .text-overlay {
      display: flex;
      flex-direction: column;
      flex: 1;
      height: 100%;
      background-color: var(--bg-color, white);
      color: var(--inverted-color, black);
    }

    .overlay-titles {
      padding: 0.5rem;
    }

    .overlay__title {
      font-size: 20px;
      font-weight: 600;
    }

    .overlay__subtitle {
      font-size: 14px;
      font-weight: 400;
    }

    .overlay__body {
      flex: 1;
      display: block;
      -webkit-box-orient: vertical;
      font-size: 12px;
      line-height: 20px;
      margin: 12px;
      max-width: 120%;
      overflow: auto;
      text-indent: 2em;
    }

    ::-webkit-scrollbar {
      width: 5px;
      background-color: transparent;
    }

    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: var(--inverted-color, black);
      transition: 0.5s;
    }

    @media (max-width: 1200px) {
      .overlay-titles {
        padding: 0.5rem;
      }
  
      .overlay__title {
        font-size: 20px;
        font-weight: 600;
      }
  
      .overlay__subtitle {
        font-size: 14px;
        font-weight: 400;
      }
    }

    @media (min-width: 1600px) {
      .overlay-titles {
        padding: 1rem;
      }
  
      .overlay__title {
        font-size: 36px;
        font-weight: 600;
      }
  
      .overlay__subtitle {
        font-size: 14px;
        font-weight: 400;
      }
    }
  `

  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.innerHTML = `${this.#template} <style>${this.#style}</style>`
    this.img = this.#shadowRoot.querySelector('img')
    this.avgColor = ''

    if (this.imagePosition === 'right') {
      this.style.setProperty('--direction', 'row-reverse')
      this.style.setProperty('--gradient-deg', '90deg')
    } else {
      this.style.setProperty('--direction', 'row')
      this.style.setProperty('--gradient-deg', '270deg')
    }
  }

  async connectedCallback () {
    this.avgColor = await getAverageColor(this.img)
    // console.log(this.avgColor)
    if (!this.hasAttribute('color')) {
      this.style.setProperty('--bg-color', this.avgColor)
      this.style.setProperty('--inverted-color', invertColor(this.avgColor))
    } else {
      this.style.setProperty('--bg-color', this.color)
      this.style.setProperty('--inverted-color', invertColor(this.color))
    }
    this.style.setProperty('--image-width', this.imageWidth)
  }

  static get observedAttributes () {
    return ['src', 'maintitle', 'subtitle', 'image-position', 'image-width', 'color']
  }

  attributesChangedCallback (name, oldValue, newValue) {
    switch (name) {
      case 'color':
        this.style.setProperty('--bg-color', newValue)
        this.style.setProperty('--inverted-color', invertColor(newValue))
        break
      case 'image-width':
        this.style.setProperty('--image-width', newValue)
        break
    }
  }

  // #region getters
  get src () {
    return this.getAttribute('src')
  }

  get title () {
    return this.getAttribute('maintitle')
  }

  get subtitle () {
    return this.getAttribute('subtitle')
  }

  get color () {
    return this.getAttribute('color')
  }

  /**
   * @return {'left' | 'right'}
   */
  get imagePosition () {
    return this.getAttribute('image-position') || 'left'
  }

  get imageWidth () {
    return this.getAttribute('image-width')
  }
  // #endregion
})
