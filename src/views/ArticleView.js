import '../components/BannerWithTitle.js'
import '../components/MarkdownEditor.js'

import useArticleStore from '../stores/articleStore.js'
import ViewModel from '../utils/ViewModelUtil.js'

/**
 * @typedef Article
 *
 * @property {string} title
 * @property {string} cover
 * @property {string} abstract
 * @property {string} author
 * @property {string} createdAt
 * @property {string} content
 */

customElements.define('article-view', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
    <div class="article-view">
      <banner-with-title
        bind-attr="maintitle@{this.data.article.title} src@{this.data.article.cover}"
        subtitle="文章"
        color="white"
      ></banner-with-title>
      <div class="content">
        <markdown-renderer bind-attr="value@{this.data.article.content}" />
      </div>
    </div>
  `
  #style = /* css */ `
    .content {
      width: 60vw;
      min-width: 768px;
      margin: 2rem auto;
      padding: 2rem;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.14) , 0px 3px 1px -2px rgba(0,0,0,0.12) , 0px 1px 5px 0px rgba(0,0,0,0.2);
    }
  `
  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.innerHTML = `${this.#template} <style>${this.#style}</style>`
    this.vm = new ViewModel(this.#shadowRoot, {
      data: {
        /**
         * @type {Article}
         */
        article: {
          abstract: '',
          author: '',
          content: '',
          cover: '',
          createdAt: '',
          title: ''
        }
      }
    })

    const articleID = parseInt(new URLSearchParams(location.search).get('id').split('/')[0])
    const article = useArticleStore().getArticle(articleID)
    Object.assign(this.vm.data.article, article)
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
