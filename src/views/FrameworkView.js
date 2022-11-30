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
