import './router.js'
import './utils/GlobalStyleUtil.js'

customElements.define('entry-point', class extends HTMLElement {
  #shadowRoot
  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.innerHTML = /* html */ `
      <router-view path="/"></router-view>
    `
  }
})
