import '../components/AutumnPagination.js'
import '../components/JigsawComponent.js'
import ViewModel from '../utils/ViewModelUtil.js'

customElements.define('others-view', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
  <banner-with-title
    maintitle="其他"
    subtitle="Others"
    src="src/assets/images/anohana-arts/19171530.jpg"
  ></banner-with-title>
  <div>
    <div class="container">
      <h1 class="title">废案、未使用的组件、视图和之前的作业</h1>
      <h2>评论区</h2>
      <section>
        <p>原本计划在每个页面下面展示一个评论区，用localStorage存放数据，但因为页面数量实在太少而且没啥实用价值而搁置。</p>
      </section>
      <h2>分页 Pagination</h2>
      <section>
        <p>一个简单的分页组件，可以自定义颜色、页码数量和可见页码数量，作为最后一次作业的一部分完成。原本打算用在评论区上。</p>
        <p>下面是一个示例</p>
        <div class="pagination-container">
          <autumn-pagination
            bind-attr="color@{this.data.pagination.color}"
            bind-two-way="current@{this.data.pagination.current}"
            total="10"
            visible-size="5"
            current="1"
          ></autumn-pagination>
          <p>
            <input type="color" bind-two-way="value@{this.data.pagination.color}" id="pagination-colorpicker">
            当前颜色：<bind-text>this.data.pagination.color</bind-text>
          </p>
          <p>
            <input type="number" bind-two-way="value@{this.data.pagination.current}">
            当前页码：<bind-text>this.data.pagination.current</bind-text>
          </p>
        </div>
        <h3>示例</h3>
        <p>也顺便展示一下自己造的数据绑定轮子的功能。</p>
      </section>
      <h2>独立的音乐播放器页面</h2>
      <section>
        <p>省流：请看页面左下角正在转动的播放器。</p>
      </section>
      <h2>拼图</h2>
      <section>
        <p>某次作业，使用了D&D API</p>
        <div class="jigsaw-container">
          <jigsaw-component></jigsaw-component>
        </div>
        <p>转制成Web Component之后出了一些奇怪的问题，而且和主题不太相符，于是没用上</p>
      </section>
      <h2>文字排版类页面</h2>
      <section>
        <p>本来是打算做一个接收一个article标签并对其应用样式的组件，但感觉自己写不出技术博客之外的大段文字，于是作罢。</p>
        <p>另外路由把hash占了，之前作业写的页面也没法直接搬过来。</p>
        <p>不过这个页面和旁边的关于页大概也能算是某种程度的文字排版吧。</p>
      </section>
    </div>
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
  `
  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.innerHTML = `${this.#template} <style>${this.#style}</style>`

    this.vm = new ViewModel(this.#shadowRoot, {
      data: {
        pagination: {
          color: '#1e90ff',
          current: 1
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
