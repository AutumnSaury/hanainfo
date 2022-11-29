import './MenuItem.js'
import './SettingsComponent.js'
import './UserInfo.js'

customElements.define('horizontal-menu', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
    <div class="horizontal-menu">
      <div class="horizontal-menu__logo">
      </div>
      <nav class="horizontal-menu__nav">
        <user-info></user-info>
        <menu-item
          icon="/src/assets/icons/home.svg" color="white"
          active-color="var(--primary-color)"
          route='{"fullPath": "/main/frontpage"}'
        >主页</menu-item>
        <menu-item
          icon="/src/assets/icons/article.svg" color="white"
          active-color="var(--primary-color)"
          route='{"fullPath": "/main/articles"}'
        >文章</menu-item>
        <menu-item
          icon="/src/assets/icons/more.svg" color="white"
          active-color="var(--primary-color)"
          route='{"fullPath": "/main/others"}'
        >其他</menu-item>
        <menu-item
          icon="/src/assets/icons/about.svg" color="white"
          active-color="var(--primary-color)"
          route='{"fullPath": "/main/about"}'
        >关于</menu-item>
        <settings-component></settings-component>
      </nav>
    </div>
  `

  #style = /* css */ `
    :host {
      z-index: 1; /* 迫不得已了属于是 */
      display: flex;
      width: 100%;
      height: 4rem;
      justify-content: space-between;
      align-items: center;
      transition: 1s;

      position: fixed;
      top: 0;
      left: 0;
    }

    .horizontal-menu {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: space-between;
      align-items: center;
      background-color: #ffffffe0;
      transition: 0.5s;
    }

    .horizontal-menu .horizontal-menu__logo {
      height: 100%;
      width: 10rem;
      background-image: url("src/assets/images/hanainfo-dark.png");
      background-size: 50%;
      background-repeat: no-repeat;
      background-position: center;
    }

    .horizontal-menu>*{
      margin: 0 1rem;
    }

    .horizontal-menu_at-top {
      background-color: transparent;
      color: top;
    }

    .horizontal-menu_at-top .horizontal-menu__logo {
      background-image: url("src/assets/images/hanainfo-light.png");
    }

    .horizontal-menu__nav {
      display: flex;
    }

    .horizontal-menu__nav>* {
      margin: 10px;
    }
  `

  #positionChecker
  #thenPos = 0
  #nowPos = 0

  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.innerHTML = `${this.#template} <style>${this.#style}</style>`
    this.atTop = false
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

  connectedCallback () {
    const menu = this.#shadowRoot.querySelector('.horizontal-menu')
    this.#positionChecker = setInterval(() => {
      this.#thenPos = this.#nowPos
      this.#nowPos = window.scrollY
      // 滚动条位于页面顶部
      if (this.#nowPos === 0) {
        menu.classList.add('horizontal-menu_at-top')
        this.style.removeProperty('top')
        this.#shadowRoot.querySelectorAll('menu-item').forEach(item => {
          item.setAttribute('color', 'white')
        })
        this.#shadowRoot.querySelector('settings-component').setAttribute('color', 'white')
      } else {
        menu.classList.remove('horizontal-menu_at-top')
        this.#shadowRoot.querySelectorAll('menu-item').forEach(item => {
          item.setAttribute('color', 'gray')
        })
        this.#shadowRoot.querySelector('settings-component').setAttribute('color', 'gray')
      }

      // 向下滚动时隐藏菜单，向上滚动时展示菜单
      if (this.#nowPos > this.#thenPos) {
        this.style.top = '-4rem'
      } else if (this.#nowPos < this.#thenPos) {
        this.style.removeProperty('top')
      }
    }, 500)
  }

  disconnectedCallback () {
    clearInterval(this.#positionChecker)
  }
})
