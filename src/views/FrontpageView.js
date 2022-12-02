import '../components/ColoredIcon.js'
import '../components/FrontpageContent.js'
import '../components/FrontpageBriefIntro.js'

customElements.define('frontpage-view', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
    <div class="frontpage__banner">
      <div class="banner__title">
      <span>HANA</span>INFO
        <colored-icon class="banner__flower" src="src/assets/icons/forget-me-not.svg" color="var(--primary-color)"></colored-icon>
      </div>
      <div class="banner__subtitle">Anohana情报站</div>
      <img class="banner__curve" alt="curve" src="src/assets/images/curve.svg">
      <colored-icon class="banner__down-arrow" src="src/assets/icons/arrows/arrow-down-bold.svg" color="white"></colored-icon>
    </div>
    <frontpage-brief-intro></frontpage-brief-intro>
    <frontpage-content></frontpage-content>
  `
  #style = /* css */ `
    :host {
      width: 100vw;
      height: 300vh
    }

    .frontpage__banner {
      height: 100vh;
      width: 100vw;
      background-image: url("src/assets/images/anohana-arts/101946334.jpg");
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .frontpage__banner::before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      opacity: 0.1;
      background-color: black;
    }

    .banner__title {
      font-size: 120px;
      color: white;
      font-family: "Times New Roman", Times, serif;
      filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
      position: relative;
    }

    .banner__title>span {
      color: var(--primary-color);
    }

    .banner__subtitle {
      color: white;
      filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
    }

    .banner__curve {
      position: absolute;
      height: 50%;
      filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
    }

    .banner__flower {
      position: absolute;
      height: 2rem;
      bottom: -10%;
      right: -10%;
    }

    .banner__down-arrow {
      position: absolute;
      bottom: 4rem;
    }

    frontpage-content {
      width: 100%;
    }
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
