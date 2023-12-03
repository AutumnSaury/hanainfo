import '../components/BannerWithTitle.js'
import '../components/ArticleListItem.js'
import useArticleStore from '../stores/articleStore.js'
import ViewModel from '../utils/ViewModelUtil.js'

customElements.define('articles-view', class extends HTMLElement {
  #template = /* html */ `
    <banner-with-title
      maintitle="文章"
      subtitle="Articles"
      src="src/assets/images/anohana-arts/92614673.png"
      color="white"
    ></banner-with-title>
    <div class="new-article-btn-wrapper">
      <button class="new-article-btn" bind-event="click@{this.methods.handleUpload}">投稿新文章</button>
    </div>
    <div class="article-list">
      <article-list-item
        maintitle="万字长评《未闻花名》——庆祝十周年"
        preview="高中的时候，从前只会在电教室和微机课堂出现的电脑成为了每个班里的必备物件，同学们经常会用它来播放各种视频，内容以恐怖片居多…"
        cover="src/assets/images/anohana-arts/92307653.jpg"
        date="2021-08-29"
        author="莫帕孙夜迪"
        href="https://www.bilibili.com/read/cv12919484/"
      ></article-list-item>
    </div>
  `
  #style = /* css */ `
    :host {
      display: flex;
      width: 100vw;
      flex-direction: column;
      align-items: center;
    }

    .new-article-btn-wrapper {
      width: 60vw;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      margin: 2rem 0;
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      background-color: var(--primary-color);
      color: white;
      border-radius: 5px;
    }

    .article-list {
      width: 60vw;
      min-width: 768px;
    }

    article-list-item {
      margin-bottom: 2rem;
    }
  `
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `${this.#template} <style>${this.#style}</style>`
    this.vm = new ViewModel(this.shadowRoot, {
      data: {},
      methods: {
        handleUpload () {
          window.$router.push({ fullPath: '/main/article-edit' })
        }
      }
    })

    const listEl = this.shadowRoot.querySelector('.article-list')
    const { articleList } = useArticleStore()

    articleList.forEach(article => {
      console.log(article)
      const helper = document.createElement('div')
      helper.innerHTML = /* html */ `
        <article-list-item
          maintitle="${article.title}"
          preview="${article.abstract}"
          cover="${article.cover}"
          date="${article.createdAt}"
          author="${article.author}"
          href="/?id=${article.id}#/main/article"
          original
        ></article-list-item>
      `
      listEl.appendChild(helper)
    })
  }
})
