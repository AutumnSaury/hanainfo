import '../components/BannerWithTitle.js'
import '../components/MarkdownRenderer.js'
import ViewModel from '../utils/ViewModelUtil.js'

customElements.define('markdown-editor', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
    <div class="markdown-editor">
      <markdown-renderer class="markdown-editor__renderer" bind-attr="value@{this.data.value}"></markdown-renderer>
      <textarea class="markdown-editor__editor" bind-two-way="value@{this.data.value}" placeholder="请在此输入正文，支持Markdown语法"></textarea>
    </div>
  `
  #style = /* css */ `

    :host {
      display: flex;
    }

    .markdown-editor {
      flex: 1;
      display: flex;

      background-color: white;
    }

    .markdown-editor__renderer {
      flex: 1;
      box-sizing: border-box;
      width: 50%;
      height: 100%;
      padding: 0.5rem;
    }


    .markdown-editor__editor {
      flex: 1;
      overflow: auto;
      box-sizing: border-box;
      width: 50%;
      height: 100%;
      resize: none;
      padding: 0.5rem;
      border-radius: 0;
      border: none;
      border-left: 1px solid lightgray;
      outline: none;

      font-size: 1rem;
      font-family: sans-serif;
    }
  `
  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.innerHTML = `${this.#template} <style>${this.#style}</style>`

    const host = this
    this.vm = new ViewModel(this.shadowRoot, {
      data: {
        value: ''
      },
      watch: {
        value (newVal) {
          host.dispatchEvent(new CustomEvent('value-change', { detail: { value: newVal } }))
          console.log(newVal)
        }
      }
    })
  }

  static get observedAttributes () {
    return ['value']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    switch (name) {
      case 'value':
        this.vm.data.value = newValue
        break
      default:
        break
    }
  }

  get value () {
    return this.vm.data.value
  }

  set value (value) {
    this.vm.data.value = value
  }
})
