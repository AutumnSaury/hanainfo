import '../components/BannerWithTitle.js'
import '../components/ArticleListItem.js'

customElements.define('articles-view', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
    <banner-with-title
      maintitle="文章"
      subtitle="Articles"
      src="src/assets/images/anohana-arts/92614673.png"
    ></banner-with-title>
    <div class="article-list">
      <article-list-item
        maintitle="万字长评《未闻花名》——庆祝十周年"
        preview="高中的时候，从前只会在电教室和微机课堂出现的电脑成为了每个班里的必备物件，同学们经常会用它来播放各种视频，内容以恐怖片居多。但有一次他们放了一组动漫剪辑，其中就有未闻花名…"
        cover="src/assets/images/anohana-arts/92307653.jpg"
        date="2021-08-29"
        author="莫帕孙夜迪"
        href="https://www.bilibili.com/read/cv12919484/"
      ></article-list-item>
      <article-list-item
        maintitle="最终，我没有被感动~"
        preview="今年四月番双花人气高涨，尤其是那朵花。在其还未完结之时就出现在各大榜单上，在animeone上半年番投票中居然力压了治郁小圆脸荣登top1。只是，不知大家对于那朵花的最后一话怎么看…"
        cover="src/assets/images/anohana-arts/92614673.png"
        date="2011-06-30"
        author="Woodring"
        href="https://movie.douban.com/review/5006852/"
      ></article-list-item>
      <article-list-item
        maintitle="如何评价《未闻花名》?"
        preview="在这部剧场版情报公开的时候，官方也正式宣布了这是以长井龙雪、冈田麿里、田中将贺为核心的动画制…"
        cover="src/assets/images/anohana-arts/101946334.jpg"
        date="2019-10-16"
        author="星象馆"
        href="https://www.zhihu.com/question/22722688/answer/859162533"
      ></article-list-item>
      <article-list-item
        maintitle="致我正在进行的青春"
        preview="熟悉的主题，类似的背景，但是加倍的感动，和不一样的情绪。青春不是谁的专属品，每个人都正在或曾经抑或即将拥有的…"
        cover="src/assets/images/anohana-arts/46074035.png"
        date="2014-06-18"
        author="陈楚生日记泪水"
        href="https://tieba.baidu.com/p/3113541172"
      ></article-list-item>
      <article-list-item
        maintitle="浅谈《未闻花名》与《心欲呼喊》中的友谊与爱情"
        preview="2011年，《未闻花名》播出，让人感动落泪。2015年，《心灵想要大声呼喊》上映，感动之潮再度来袭…"
        cover="src/assets/images/anohana-arts/18231910.jpg"
        date="2018-03-31"
        author="qingqingzhuzi"
        href="https://www.bilibili.com/read/cv336681"
      ></article-list-item>
      <article-list-item
        maintitle="《未闻花名》原班人马新作释预告 讲述穿越四角恋"
        preview="1905电影网讯 7月12日，日本动画电影《知晓天空之蓝的人啊》释出正式预告，本作是长井龙雪、冈田麿里…"
        cover="src/assets/images/anohana-arts/41147271.jpg"
        date="2019-07-12"
        author="qiucen"
        href="https://www.1905.com/news/20190712/1392406.shtml"
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

    .article-list {
      margin-top: 2rem;
      width: 60vw;
      min-width: 768px;
    }

    article-list-item {
      margin-bottom: 2rem;
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
