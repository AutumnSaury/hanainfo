import '../components/BannerWithTitle.js'

customElements.define('about-view', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
  <banner-with-title
    maintitle="关于"
    subtitle="About"
    src="src/assets/images/anohana-arts/92307653.jpg"
  ></banner-with-title>
  <div class="container">
    <h2>关于本站</h2>
    <section>
      <p>您现在浏览的网站是某蒟蒻制作的期末大作业，由于万恶的CORS限制，ESModule无法在file:///协议下加载，不得不将其部署到公网上。</p>
      <p>由于素材版权等原因，本项目代码并未托管在公开仓库内。本网站会在答辩结束后第一时间下线。</p>
      <p>本网站使用Web Components以及某蒟蒻自己造的路由和数据绑定轮子构建。</p>
    </section>
    <h2>关于作者</h2>
    <section>
      <div class="bio">
        <img class="avatar" src="https://cravatar.cn/avatar/c8288b14c875abb75c7c82d7785d7545?size=200" alt="头像">
        <div class="name">秋サンマ</div>
      </div>
      <p>蒟蒻，就读于郑州航空工业管理学院，目前主攻Web前端方向。</p>
      <p>数学不精，算法无力，只能写写前端这样子。</p>
      <p>很喜欢《未闻花名》这部动画，于是将其选作这次作业的主题。</p>
    </section>
    <h3>如何联系我</h3>
    <section>
      <p>
        <a href="https://github.com/AutumnSaury" target="_blank">我的Github</a>
      </p>
      <p>
        <a href="https://blog.autumnsaury.com/" target="_blank">我的个人博客</a>
      </p>
    </section>
    <h2>最后</h2>
    <section>
      <p>感谢本网站使用的图标、插画和音乐的作者们，他们的工作使本网站的制作成为可能。</p>
      <p>感谢范慧昊、王艺展、任宝卓、吴朝铄、申晓宇、张金辽、陈代庆同学和刘明勋学长的评价及反馈意见。</p>
      <p>感谢Ashiterui在交互、排版设计方面提供的宝贵建议。</p>
      <p>最后，也感谢您的来访。</p>
    </section>
  </div>
  `
  #style = /* css */ `
  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 60vw;
    background-color: white;
    margin: 2rem auto;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.14) , 0px 3px 1px -2px rgba(0,0,0,0.12) , 0px 1px 5px 0px rgba(0,0,0,0.2);
  }

  h1, h2, h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    margin: 1em;
    color: gray;
  }

  :is(h1, h2, h3)::before, 
  :is(h1, h2, h3)::after {
    content: "";
    display: inline-block;
    width: 1em;
    height: 1em;
    margin: 0 1em;
    background-color: var(--secondary-color);

    mask-image: url(src/assets/icons/forget-me-not.svg);
    -webkit-mask-image: url(src/assets/icons/forget-me-not.svg);

    mask-size: cover;
    -webkit-mask-size: cover;
  }

  section {
    display: flex;
    margin: 0 4em;
    flex-direction: column;
    width: calc(100% - 8em);
  }

  section :not(p) {
    align-self: center;
  }

  .bio {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1em 0;
  }

  .bio > img {
    border-radius: 50%;
  }

  .bio > .name {
    margin-top: 1em;
    font-size: 14px;
    color: gray;
  }

  section a {
    text-decoration: none;
    color: var(--secondary-color);
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
