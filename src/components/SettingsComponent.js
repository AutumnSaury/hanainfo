import './ColoredIcon.js'

customElements.define('settings-component', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
    <colored-icon class="settings__icon" src="src/assets/icons/settings.svg" color="white" size="30px"></colored-icon>
    <ul class="settings__container">
      <li>
        <input type="color" id="primary" value="${window.globalStyle['--primary-color']}" oninput="window.globalStyle['--primary-color'] = event.target.value">
        <label for="primary">主色调</label>
      </li>
      <li>
        <input type="color" id="secondary" value="${window.globalStyle['--secondary-color']}" oninput="window.globalStyle['--secondary-color'] = event.target.value">
        <label for="secondary">次色调</label>
      </li>
      <li>
        <input type="color" id="constract" value="${window.globalStyle['--constract-color']}" oninput="window.globalStyle['--constract-color'] = event.target.value">
        <label for="constract">对比色</label>
      </li>
      <li>
        <input type="color" id="warning" value="${window.globalStyle['--warning-color']}" oninput="window.globalStyle['--warning-color'] = event.target.value">
        <label for="warning">警告色</label>
      </li>
      <li>
        <input type="color" id="error" value="${window.globalStyle['--error-color']}" oninput="window.globalStyle['--error-color'] = event.target.value">
        <label for="error">错误色</label>
      </li>
    </ul>
  `

  #style = /* css */ `
    :host {
      position: relative;
      display: flex;
      align-items: center;
    }

    .settings__container {
      display: flex;
      border-radius: 5px;
      flex-direction: column;
      align-items: center;
      position: absolute;
      top: calc(30px / 2);
      right: 0;
      color: black;
      width: 10rem;
      background-color: white;
      height: 0;
      overflow: hidden;
      transition: 0.5s;
      box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.14) , 0px 3px 1px -2px rgba(0,0,0,0.12) , 0px 1px 5px 0px rgba(0,0,0,0.2);

      list-style: none;
      padding: 0;
    }

    .settings__icon:hover {
      --color: var(--secondary-color) !important;
    }

    .settings__icon:hover + .settings__container,
    .settings__container:hover {
      display: flex;
      height: calc(5 * 2.5rem);
    }

    .settings__container>li {
      display: flex;
      height: 100%;
      width: calc(100% - 2rem);
      align-items: center;
      justify-content: space-between;
      margin: 0 1rem;
      height: 2.5rem;
      border-bottom: 1px lightgray solid;
    }

    .settings__container>li:last-child {
      border-bottom: none;
    }

    li>input[type="color"] {
      position: relative;
      height: 1rem;
      width: 1rem;
      -webkit-appearance: none;
      border: none;
      padding: 0;
      margin: 0;
      background-color: transparent;
    }

    li>input[type="color"]::-webkit-color-swatch-wrapper {
      padding: 0;
    }

    li>input[type="color"]::-webkit-color-swatch {
      border: none;
      border-radius: 1rem;
    }
  `
  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.innerHTML = `${this.#template} <style>${this.#style}</style>`
    this.icon = this.#shadowRoot.querySelector('.settings__icon')
  }

  static get observedAttributes () {
    return ['color']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    switch (name) {
      case 'color':
        this.icon.setAttribute('color', newValue)
        break
      default:
        break
    }
  }
})
