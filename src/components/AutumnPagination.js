class AutumnPagination extends HTMLElement {
  #template = /* html */ `
    <div class="autumn-pagination__prev-btn">
        &lt;
    </div>
    <div class="autumn-pagination__index-list">
        <!-- 列表项目 -->
    </div>
    <div class="autumn-pagination__goto">
      Go to
      <input type="number" class="goto__input">
    </div>
    <div class="autumn-pagination__next-btn">
        &gt;
    </div>
  `
  #style = /* css */ `
    :host {
      --primary: #000;

      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 5px;
      background-color: #fff;
      box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.14) , 0px 3px 1px -2px rgba(0,0,0,0.12) , 0px 1px 5px 0px rgba(0,0,0,0.2);
      height: 3rem;
    }

    :host>* {
      margin: 0.5rem 1rem;
    }

    .autumn-pagination__prev-btn,
    .autumn-pagination__next-btn {
      display: inline-block;
      color: #fff;
      background-color: var(--primary);
      padding: 0.5rem 1rem;
      line-height: 1em;
      text-align: center;
      border-radius: 5px;
      cursor: pointer;
      user-select: none;
    }

    .autumn-pagination__index-list {
      display: flex;
      user-select: none;
    }

    .index-list__index-item {
      display: inline-block;
      width: 1.5rem;
      height: 2rem;
      line-height: 2rem;
      text-align: center;
      border: 1px solid lightgray;
      background-color: #fff;
      color: gray;
      border-radius: 5px;
      cursor: pointer;
      user-select: none;
      margin: auto 0.5rem;
      transition: 0.5s
    }

    .index-list__placeholder {
      font-weight: bold;
    }

    .index-list__index-item_current,
    .index-list__index-item:hover {
      border-color: var(--primary);
      color: var(--primary);
      transition: 0.5s;
    }

    .index-list__index-item_current {
      font-weight: bold;
    }

    .autumn-pagination__goto {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: nowrap;
      margin: auto 1rem;
    }

    .goto__input {
      margin: auto 0.5rem;
      width: 3rem;
      height: 1.2rem;
      border: none;
      border-bottom: 2px solid var(--primary);
      text-align: center;
      -moz-appearance: textfield;
    }

    .goto__input:focus {
      outline: none;
    }

    .goto__input::-webkit-outer-spin-button,
    .goto__input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  `
  constructor () {
    super()

    const shadowRoot = this.attachShadow({ mode: 'closed' })
    this.$shadowRoot = shadowRoot
    shadowRoot.innerHTML = this.#template + '<style>' + this.#style + '</style>'

    const prevBtn = this.$shadowRoot.querySelector('.autumn-pagination__prev-btn')
    const nextBtn = this.$shadowRoot.querySelector('.autumn-pagination__next-btn')
    const gotoInput = this.$shadowRoot.querySelector('.goto__input')

    prevBtn.addEventListener('click', () => {
      this.setAttribute('current', this.current - 1)
    })

    nextBtn.addEventListener('click', () => {
      this.setAttribute('current', this.current + 1)
    })

    gotoInput.addEventListener('change', () => {
      if (gotoInput.value > 0 && gotoInput.value <= this.total) {
        this.setAttribute('current', gotoInput.value)
        gotoInput.value = null
      }
    })
  }

  static get observedAttributes () {
    return [
      'current',
      'total',
      'visible-size',
      'color'
    ]
  }

  get current () {
    return parseInt(this.getAttribute('current'))
  }

  get total () {
    return parseInt(this.getAttribute('total'))
  }

  get visibleSize () {
    return parseInt(this.getAttribute('visible-size'))
  }

  attributeChangedCallback (name, oldValue, newValue) {
    switch (name) {
      case 'current':
        this.dispatchEvent(new CustomEvent('page-change', {
          detail: {
            oldValue: parseInt(oldValue),
            newValue: parseInt(newValue)
          }
        }))
        this.refillList(this.total || 1, this.visibleSize || 1, this.current || 1)
        break
      case 'total':
        this.dispatchEvent(new CustomEvent('total-change', {
          detail: {
            oldValue: parseInt(oldValue),
            newValue: parseInt(newValue)
          }
        }))
        this.refillList(this.total || 1, this.visibleSize || 1, this.current || 1)
        break
      case 'visible-size':
        this.dispatchEvent(new CustomEvent('visible-size-change', {
          detail: {
            oldValue: parseInt(oldValue),
            newValue: parseInt(newValue)
          }
        }))
        this.refillList(this.total || 1, this.visibleSize || 1, this.current || 1)
        break

      case 'color':
        this.setColor(newValue)
        break
    }
  }

  refillList (total, visibleSize, current) {
    const list = this.$shadowRoot.querySelector('.autumn-pagination__index-list')
    const that = this
    function generateListItem (index, isCurrent) {
      const item = document.createElement('div')
      item.classList.add('index-list__index-item')
      item.innerText = index
      if (isCurrent) {
        item.classList.add('index-list__index-item_current')
      }
      item.addEventListener('click', () => {
        that.setAttribute('current', index)
      })
      return item
    }

    function generatePlaceholder () {
      const item = document.createElement('div')
      item.classList.add('index-list__placeholder')
      item.innerText = '...'
      return item
    }

    function appendItems (from, to) {
      for (let i = from; i <= to; i++) {
        list.appendChild(generateListItem(i, i === current))
      }
    }

    list.innerHTML = ''

    do {
      if (total <= visibleSize) {
        appendItems(1, total)
        break
      }

      if (current <= visibleSize / 2 + 1) {
        appendItems(1, visibleSize)
        list.appendChild(generatePlaceholder())
        list.appendChild(generateListItem(total))
        break
      }

      if (current >= total - visibleSize / 2) {
        list.appendChild(generateListItem(1))
        list.appendChild(generatePlaceholder())
        appendItems(total - visibleSize + 1, total)
        break
      }

      list.appendChild(generateListItem(1))
      list.appendChild(generatePlaceholder())
      appendItems(current - Math.floor(visibleSize / 2), current + Math.floor(visibleSize / 2))
      list.appendChild(generatePlaceholder())
      list.appendChild(generateListItem(total))
    } while (false)
  }

  setColor (color) {
    this.style.setProperty('--primary', color)
  }
}

customElements.define('autumn-pagination', AutumnPagination)

// export default AutumnPagination
