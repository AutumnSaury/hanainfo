import './ColoredIcon.js'

customElements.define('menu-item', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
    <colored-icon id="icon" src="${this.icon}" size="1.5rem" color="${this.color}"></colored-icon>
    <slot></slot>
  `

  #style = /* css */ `
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
      cursor: pointer;
    }

    slot {
      display: block;
      color: var(--color);
      margin-left: 0.5rem;
      transition: 0.5s
    }

    colored-icon:hover,
    colored-icon:has(+ slot:hover) {
      --color: var(--secondary-color) !important;
    }

    slot:hover,
    colored-icon:hover + slot {
      color: var(--secondary-color);
    }
  `

  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.innerHTML = `${this.#template} <style>${this.#style}</style>`
    this.coloredIcon = this.#shadowRoot.querySelector('#icon')
    this.activeTarget = false
    this.color = 'white'
    this.activeColor = 'var(--primary-color)'
    this.route = {}
  }

  static get observedAttributes () {
    return ['route', 'icon', 'color', 'active', 'active-color']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    switch (name) {
      case 'color':
        this.color = newValue
        if (!this.active) {
          this.coloredIcon.setAttribute('color', newValue)
          this.style.setProperty('--color', newValue)
        }
        break
      case 'active-color':
        this.activeColor = newValue
        if (this.active) {
          this.coloredIcon.setAttribute('color', newValue)
          this.style.setProperty('--color', newValue)
        }
        break
      case 'active':
        if (this.hasAttribute('active')) {
          this.active = true
        } else {
          this.active = false
        }
        break
      case 'route':
        this.route = JSON.parse(newValue)
        break
    }
  }

  connectedCallback () {
    window.addEventListener('route-change', ev => {
      if (ev.detail.to.fullPath === this.route.fullPath) {
        this.active = true
      } else {
        this.active = false
      }
    })
    this.addEventListener('click', ev => {
      window.$router.push(this.route)
    })
    if (window.$router.currentRoute.fullPath === this.route.fullPath) {
      this.active = true
    }
  }

  // #region [ active getter & setter ]
  get active () {
    return this.activeTarget
  }

  set active (value) {
    this.activeTarget = value
    if (value) {
      this.coloredIcon.setAttribute('color', this.activeColor)
      this.style.setProperty('--color', this.activeColor)
    } else {
      this.coloredIcon.setAttribute('color', this.color)
      this.style.setProperty('--color', this.color)
    }
  }
  // #endregion

  // #region [ property getters ]

  get icon () {
    return this.getAttribute('icon')
  }

  // #endregion
})
