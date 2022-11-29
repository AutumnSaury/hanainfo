customElements.define('autumn-swiper', class extends HTMLElement {
  #current = 1
  #template = /* html */ `
    <div class="autumn-swiper__items">
      <slot></slot>
    </div>
    <div class="autumn-swiper__indicators">
      <!-- 页码指示器 -->
    </div>
    <div class="autumn-swiper__prev-btn">&lt;</div>
    <div class="autumn-swiper__next-btn">&gt;</div>
  `
  #style = `
    <style>
      :host {
        --current: 1;
        --item-height: 100%;
        --item-width: 100%;
        display: block;
        position: relative;
        height: 600px;
        width: 1000px;
        overflow: hidden;
      }

      .autumn-swiper__items {
        overflow: hidden;
        height: 100%;
        width: 100%;
      }

      .autumn-swiper__indicators {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2rem;

        display: flex;
        justify-content: center;
        align-items: center;
      }

      .autumn-swiper__indicator {
        width: 2rem;
        height: 0.25rem;
        background-color: lightgray;
        margin: 0 0.25rem;
        border-radius: 5px;
        box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.14) , 0px 3px 1px -2px rgba(0,0,0,0.12) , 0px 1px 5px 0px rgba(0,0,0,0.2);
        transition: 0.5s;
      }

      .autumn-swiper__indicator:hover,
      .autumn-swiper__indecator_current {
        background-color: white;
        transition: 0.5s;
      }

      .autumn-swiper__prev-btn,
      .autumn-swiper__next-btn {
        position: absolute;
        top: calc(50% - 1.5rem);
        width: 3rem;
        height: 3rem;
        background-color: #00000060;
        color: #fff;
        font-size: 1.5rem;
        line-height: 3rem;
        text-align: center;
        border-radius: 50%;
        cursor: pointer;
        user-select: none;
      }

      .autumn-swiper__prev-btn {
        left: 1rem;
      }

      .autumn-swiper__next-btn {
        right: 1rem;
      }

      slot {
        display: flex;
        height: 100%;
        position: absolute;
        transition: left 0.5s;
        left: calc(-100% * (var(--current, 1) - 1));
      }

      ::slotted(autumn-swiper-item) {
        width: var(--item-width);
        height: var(--item-width);
        flex-grow: 1;
      }

      .notransition {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        transition: none !important;
      }
    </style>
  `

  constructor () {
    super()

    this.$shadowRoot = this.attachShadow({ mode: 'closed' })
    this.$shadowRoot.innerHTML = this.#style + this.#template
    this.$itemSlot = this.$shadowRoot.querySelector('slot')

    const prevBtn = this.$shadowRoot.querySelector('.autumn-swiper__prev-btn')
    const nextBtn = this.$shadowRoot.querySelector('.autumn-swiper__next-btn')

    prevBtn.addEventListener('click', () => {
      this.prev()
    })

    nextBtn.addEventListener('click', () => {
      this.next()
    })

    this.$itemSlot.addEventListener('slotchange', ev => {
      this.generateIndicators()
      this.updateCurrentIndicator(this.current)
      this.$itemSlot.style.width = `${this.total * 100}%`
    })

    this.addEventListener('mouseover', () => {
      this.paused = true
    })

    this.addEventListener('mouseleave', () => {
      this.paused = false
    })
  }

  disconnectedCallback () {
    this.$timer && clearInterval(this.$timer)
  }

  attributeChangedCallback (name, oldValue, newValue) {
    switch (name) {
      case 'autoplay':
        this.setAutoPlay()
        break
      case 'interval':
        this.setAutoPlay()
        break
      case 'pause-on-hover':
        this.setAutoPlay()
        break
    }
  }

  static get observedAttributes () {
    return [
      'autoplay',
      'interval',
      'pause-on-hover'
    ]
  }

  get autoplay () {
    return this.hasAttribute('autoplay')
  }

  get interval () {
    return parseInt(this.getAttribute('interval'))
  }

  get pauseOnHover () {
    return this.hasAttribute('pause-on-hover')
  }

  get current () {
    return this.#current
  }

  set current (value) {
    // 进行一个流的限
    if (this.$pageTransition) {
      return
    }
    // 进行翻页
    do {
      this.$pageTransition = true
      // 左侧尽头
      if (value < 1) {
        value = this.total
        const lastItem = this.$itemSlot.assignedElements()[this.total - 1]
        // 关闭transition
        this.$itemSlot.classList.add('notransition')
        // 将最后一个元素移至开头
        lastItem.style.order = -1
        // 移动到第二张位置
        this.style.setProperty('--current', 2)
        setTimeout(() => {
          // 打开transition
          this.$itemSlot.classList.remove('notransition')
          // 移动到第一张位置
          this.style.setProperty('--current', 1)
        }, 1)
        // 等待transition结束
        setTimeout(() => {
          // 再次关闭transition
          this.$itemSlot.classList.add('notransition')
          // 清除order设定，重置位置，回到最后一张
          lastItem.style.removeProperty('order')
          this.style.setProperty('--current', this.total)
          setTimeout(() => {
            // 打开transition
            this.$itemSlot.classList.remove('notransition')
            this.$pageTransition = false
          }, 1)
        }, 500)
        break
      }

      // 右侧尽头
      if (value > this.total) {
        value = 1
        const firstItem = this.$itemSlot.assignedElements()[0]
        // 关闭transition
        this.$itemSlot.classList.add('notransition')
        // 整体向左移动100%
        this.style.setProperty('--current', this.total - 1)
        // 将第一个元素移至右侧末尾
        firstItem.style.order = 1
        setTimeout(() => {
          // 打开transition
          this.$itemSlot.classList.remove('notransition')
          // 向右移动100%
          this.style.setProperty('--current', this.total)
        }, 1)
        // 等待transition结束
        setTimeout(() => {
          // 再次关闭transition
          this.$itemSlot.classList.add('notransition')
          // 清除order设定，重置位置，回到第一张
          firstItem.style.removeProperty('order')
          this.style.setProperty('--current', 1)
          setTimeout(() => {
            // 打开transition
            this.$itemSlot.classList.remove('notransition')
            this.$pageTransition = false
          }, 1)
        }, 500)
        break
      }

      this.style.setProperty('--current', value)
      this.$pageTransition = false
    } while (false)

    this.updateCurrentIndicator(value)
    this.#current = value
    this.dispatchEvent(new CustomEvent('current-change', {
      detail: { value }
    }))
  }

  get total () {
    return this.$itemSlot.assignedElements().length
  }

  generateIndicators () {
    const indicators = this.$shadowRoot.querySelector('.autumn-swiper__indicators')
    indicators.innerHTML = ''

    for (let i = 0; i < this.total; ++i) {
      const indicator = document.createElement('div')
      indicator.classList.add('autumn-swiper__indicator')
      indicator.addEventListener('mouseover', ev => {
        ev.stopPropagation()
        this.current = i + 1
      })
      indicators.appendChild(indicator)
    }
  }

  /**
   * 更新指示器
   * @param {number} newIndex 新页码
   * @return {void}
   */
  updateCurrentIndicator (newIndex) {
    const indicators = this.$shadowRoot.querySelector('.autumn-swiper__indicators')
    indicators.querySelector('.autumn-swiper__indecator_current')
      ?.classList.remove('autumn-swiper__indecator_current') // 移除当前指示器的current类
    indicators.children[newIndex - 1]
      ?.classList.add('autumn-swiper__indecator_current') // 添加新的current类
  }

  /**
   * 切换至下一页
   */
  next () {
    this.current += 1
  }

  /**
   * 切换至上一页
   */
  prev () {
    this.current -= 1
  }

  setAutoPlay () {
    if (!this.autoplay) {
      return
    }

    this.$timer && clearInterval(this.$timer)
    this.$timer = setInterval(() => {
      !(this.paused && this.pauseOnHover) && this.next()
    }, this.interval || 5000)
  }

  resetItemSize (width, height) {

  }
})

customElements.define('autumn-swiper-item', class extends HTMLElement {
  #template = `
    <slot></slot>
  `

  #style = `
    <style>
      :host {
        display: block;
      }
    </style>
  `

  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = this.#template + this.#style
  }
})
