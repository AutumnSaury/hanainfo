import '../components/HorizontalMenu.js'
import '../components/MusicPlayer.js'

customElements.define('framework-view', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
    <horizontal-menu></horizontal-menu>
    <router-view path="/main/"></router-view>
    <music-player></music-player>
  `
  #style = /* css */ `
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    :host:before {
      content: "";
      background-color: var(--primary-color);
      position: fixed;
      z-index: -1;
      width: 100vw;
      height: 100vh;
  
      mask-image: url("src/assets/images/flower-rain.svg");
      mask-size: cover;
      mask-position: center;
  
      -webkit-mask-image: url("src/assets/images/flower-rain.svg");
      -webkit-mask-size: cover;
      -webkit-mask-position: center;
    }

    horizontal-menu {
      z-index: 1;
    }

    music-player {
      z-index: 1;
    }
  `
  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.innerHTML = `${this.#template} <style>${this.#style}</style>`
  }
})
