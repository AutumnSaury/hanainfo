import useArtListStore from '../stores/artsListStore.js'
import '../components/sign/SignInForm.js'
import '../components/MenuItem.js'

const artList = useArtListStore()

customElements.define('sign-view', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
    <div class="sign">
      <div class="sign__menu">
        <menu-item
          icon="/src/assets/icons/sign-in.svg" color="lightgray"
          active-color="var(--primary-color)"
          route='{"fullPath": "/sign/sign-in"}'
        >登录</menu-item>
        <menu-item
          icon="/src/assets/icons/register.svg" color="lightgray"
          active-color="var(--primary-color)"
          route='{"fullPath": "/sign/register"}'
        >注册</menu-item>
      </div>
      <div class="sign__form">
        <router-view path="/sign/"></router-view>
      </div>
    </div>
  `
  #style = /* css */ `
    :host {
      width: 100vw;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: var(--bgi, url("src/assets/images/anohana-arts/101946334.jpg"));
      background-size: cover;
      background-position: center;
      background-blend-mode: overlay;
      background-color: transparent;
      transition: 0.5s;
    }

    .sign {
      height: 500px;
      width: 500px;
      border-radius: 10px;
      margin: auto;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.14) , 0px 3px 1px -2px rgba(0,0,0,0.12) , 0px 1px 5px 0px rgba(0,0,0,0.2);
      background-color: white;
      opacity: 0.8;
      transition: 0.5s;
      position: relative;
    }

    .sign:hover {
      opacity: 1;
    }

    .sign__menu {
      position: absolute;
      left: 5px;
      top: 20px;
    }

    .sign__menu > * {
      margin: 1rem;
    }

    .sign__form {
      flex: 1;
      display: flex;
      height: 100%;
      width: 100%;
    }

    .sign__logo {
      width: 25%;
      height: auto;
    }
  `

  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.innerHTML = `${this.#template} <style>${this.#style}</style>`
  }

  switchBackgroundImage (url) {
    this.style.backgroundImage = `url(${url})`
  }

  connectedCallback () {
    this.timer = setInterval(() => {
      const randomArt = artList[Math.floor(Math.random() * artList.length)]
      this.switchBackgroundImage(randomArt)
    }, 10000)
  }

  disconnectedCallback () {
    this.timer && clearInterval(this.timer)
  }
})
