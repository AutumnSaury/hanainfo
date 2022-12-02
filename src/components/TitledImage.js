function openInNewTab (url) {
  const a = document.createElement('a')
  a.href = url
  a.target = '_blank'
  a.click()
  a.remove()
}

customElements.define('titled-image', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
    <div class="overlay">
      <slot class="overlay__title"></slot>
    </div>
  `
  #style = /* css */ `
    :host {
      display: block;
      height: 100%;
      width: 100%;
      background-image: var(--src);
      background-color: white;
      background-size: cover;
      background-position: center;
      cursor: pointer;
    }

    .overlay {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      background-image: radial-gradient(transparent 50%, black);
      opacity: 0;
      transition: 0.5s
    }

    .overlay:hover {
      opacity: 1;
      transition: 0.5s;
    }

    .overlay__title {
      display: block;
      font-size: 12px;
      padding: 6px;
      color: white;
    }
  `

  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.innerHTML = `${this.#template} <style>${this.#style}</style>`

    this.addEventListener('click', () => {
      const href = this.getAttribute('href')
      href && openInNewTab(href)
    })
  }

  static get observedAttributes () {
    return ['src', 'href']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    switch (name) {
      case 'src':
        this.style.setProperty('--src', 'url("' + newValue + '")')
        break
    }
  }
})
