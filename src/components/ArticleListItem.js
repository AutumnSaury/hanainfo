import './ColoredIcon.js'

customElements.define('article-list-item', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
    <img class="cover" src="${this.cover}" alt="封面">
    <div class="content">
      <div class="title">${this.maintitle}</div>
      <div class="preview">${this.preview}</div>
      <div class="meta">
        <div class="date">
          <colored-icon
            color="lightgray"
            src="src/assets/icons/date.svg"
            size="14px"
          ></colored-icon>
          ${this.date}
        </div>
        <div class="author">
        <colored-icon
          color="lightgray"
          src="src/assets/icons/quill.svg"
          size="14px"
        ></colored-icon>
          ${this.author}
        </div>
        <div class="from">${this.hasAttribute('original') ? '原创' : '站外'}</div>
      </div>
    </div>
  `

  #style = /* css */ `
    :host {
      display: flex;
      width: 100%;
      height: 200px;
      border-radius: 10px;
      box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.14) , 0px 3px 1px -2px rgba(0,0,0,0.12) , 0px 1px 5px 0px rgba(0,0,0,0.2);
      background-color: white;
      cursor: pointer;
    }

    .cover {
      display: block;
      width: 300px;
      height: 200px;
      border-radius: 10px;
      object-fit: cover;
      object-position: center;
    }

    .content {
      display: flex;
      max-width: calc(100% - 300px);
      flex-direction: column;
      width: 100%;
      height: 100%;
    }

    .title {
      font-size: 24px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 1em;
      font-weight: 500;
      color: gray;
    }

    .preview {
      flex: 1;
      font-size: 14px;
      margin: 1em;
      color: gray;
    }

    .meta {
      display: flex;
      justify-content: flex-end;

      font-size: 14px;
      color: gray;
      margin: 1em;
    }

    .meta > * {
      margin: 0 1em;
    }

    .date > colored-icon,
    .author > colored-icon {
      display: inline-block;
    }    
  `
  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.innerHTML = `${this.#template} <style>${this.#style}</style>`

    this.addEventListener('click', () => {
      if (this.hasAttribute('href')) {
        const a = document.createElement('a')
        a.href = this.href
        a.target = '_blank'
        a.click()
      } else if (this.hasAttribute('route')) {
        window.$router.push(this.route.fullPath)
      }
    })
  }

  get cover () {
    return this.getAttribute('cover')
  }

  get maintitle () {
    return this.getAttribute('maintitle')
  }

  get preview () {
    return this.getAttribute('preview')
  }

  get date () {
    return this.getAttribute('date')
  }

  get route () {
    return JSON.parse(this.getAttribute('route'))
  }

  get href () {
    return this.getAttribute('href')
  }

  get author () {
    return this.getAttribute('author')
  }
})
