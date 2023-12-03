import '../components/BannerWithTitle.js'
import '../components/MarkdownEditor.js'
import '../components/MarkdownRenderer.js'

import useArticleStore from '../stores/articleStore.js'
import { useUserStore } from '../stores/userStore.js'
import ViewModel from '../utils/ViewModelUtil.js'

customElements.define('article-edit-view', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
    <div class="article-edit-view">
      <banner-with-title
        maintitle="文章投稿"
        subtitle="Article Editor"
        src="src/assets/images/anohana-arts/19171530.jpg"
        color="white"
      ></banner-with-title>
      <form class="editor-container" bind-event="submit@{this.methods.submit}">
        <div class="k-v-pair">
          <label for="title">标题</label>
          <input name="title" id="title" type="text" bind-two-way="value@{this.data.title}" placeholder="请输入文章标题">
        </div>
        <div class="k-v-pair">
          <label for="abstract">简介</label>
          <textarea name="abstract" id="abstract" type="text" bind-two-way="value@{this.data.abstract}" placeholder="请输入简介"></textarea>
        </div>
        <div class="k-v-pair">
          <label for="cover">封面图片URL</label>
          <input name="cover" id="cover" type="text" bind-two-way="value@{this.data.cover}" placeholder="请输入封面图片URL">
        </div>
        <div class="k-v-pair">
          <label>正文</label>
          <markdown-editor class="editor" bind-two-way="value@{this.data.content}" />
        </div>
        <button type="submit">提交</button>
      </form>
    </div>
  `
  #style = /* css */ `
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .editor-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      width: 80vw;
      background-color: white;
      margin: 2rem auto;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.14) , 0px 3px 1px -2px rgba(0,0,0,0.12) , 0px 1px 5px 0px rgba(0,0,0,0.2);
    }

    .k-v-pair {
      display: flex;
      flex-direction: column;
      margin: 0.5rem 0;
    }

    .k-v-pair>input {
      height: 2rem;
      width: calc(300px - 1em);
      outline: none;
      transition: 0.3s;
      border: 1px solid #888;
      border-radius: 5px;
      padding: 0 0.5em;
    }

    .k-v-pair>textarea {
      width: calc(300px - 1em);
      padding: 0.5rem;
      border: 1px solid #888;
      border-radius: 5px;
      resize: vertical;
      font-size: 1rem;
      font-family: sans-serif;
    }

    .k-v-pair>input:focus {
      border: 1px solid var(--secondary-color);
      box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.14) , 0px 3px 1px -2px rgba(0,0,0,0.12) , 0px 1px 5px 0px rgba(0,0,0,0.2);
      transition: 0.3s;
    }

    .k-v-pair>textarea:focus {
      border: 1px solid var(--secondary-color);
      outline: none;
      box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.14) , 0px 3px 1px -2px rgba(0,0,0,0.12) , 0px 1px 5px 0px rgba(0,0,0,0.2);
      transition: 0.3s;
    }

    .k-v-pair>label {
      margin-bottom: 0.5rem;
    }

    .k-v-pair:has(.editor) {
      width: 100%;
    }

    .editor {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.14) , 0px 3px 1px -2px rgba(0,0,0,0.12) , 0px 1px 5px 0px rgba(0,0,0,0.2);
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      background-color: var(--primary-color);
      color: white;
      border-radius: 5px;
    }
  `
  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.innerHTML = `${this.#template} <style>${this.#style}</style>`
    this.vm = new ViewModel(this.shadowRoot, {
      data: {
        title: '',
        abstract: '',
        cover: '',
        content: ''
      },
      methods: {
        submit (ev) {
          ev.preventDefault()
          useArticleStore().addArticle({
            abstract: this.data.abstract,
            title: this.data.title,
            cover: this.data.cover,
            author: useUserStore('local').name ?? useUserStore('session').name ?? '匿名',
            content: this.data.content,
            createdAt: (new Date()).toISOString().split('T')[0]
          })
          alert('已提交文章')
          window.$router.push({ fullPath: '/main/articles' })
        }
      }
    })
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
