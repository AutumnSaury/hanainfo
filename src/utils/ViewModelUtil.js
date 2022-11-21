// interface confObj {
//   data: any{}
//   methods: any{}
// }

class ViewModel {
  #rootDOM
  /**
   * ViewModel
   * @param {HTMLElement} rootDOM
   * @param {any} confObj
   *
   * @constructor
   */
  constructor (rootDOM, confObj) {
    this.#rootDOM = rootDOM

    this.$effectMap = {}
    this.$attrBindedElements = this.#rootDOM.querySelectorAll('[bind-attr]')
    this.$eventBindedElements = this.#rootDOM.querySelectorAll('[bind-event]')

    // 代理数据
    this.data = new Proxy(confObj.data, {
      get: (target, prop) => {
        return target[prop]
      },

      set: (target, prop, value) => {
        target[prop] = value
        this.$effectMap[prop]?.forEach(effect => effect())
        return true
      }
    })

    // 挂载方法
    this.methods = confObj.methods

    // 处理Attributes单向绑定
    this.$attrBindedElements.forEach(el => {
      // bind-attr="attr1@{expression1} attr2@{expression2}..."
      // 分割绑定属性的字符串
      const elementBindList = el.getAttribute('bind-attr').match(/[a-zA-Z0-9-]+@\{.+\}/g)
      elementBindList.forEach(bind => {
        // 分割属性和表达式
        const pair = bind.split('@')
        const attr = pair[0]
        const expression = pair[1].slice(1, -1)
        // 在表达式中查找this.data的属性
        const match = expression.match(/(?<=this\.data\.)[a-zA-Z0-9]+/g)
        // 将表达式存入属性对应的副作用桶内
        if (match) {
          // key: this的属性名
          match.forEach(key => {
            if (!this.$effectMap[key]) {
              this.$effectMap[key] = new Set()
            }
            this.$effectMap[key].add(() => {
              el.setAttribute(attr, (new Function(`
                'use strict'
                return ${expression}
              `)).bind(this)())
            })
          })
        }
      })
    })

    // 处理事件绑定
    this.$eventBindedElements.forEach(el => {
      // bind-event="event1@{expression1} event2@{expression2}..."
      // expression => Function
      // 分割绑定事件的字符串
      const elementBindList = el.getAttribute('bind-event').match(/[a-zA-Z0-9-]+@\{.+\}/g)
      elementBindList.forEach(bind => {
        // 分割事件和表达式
        const pair = bind.split('@')
        const event = pair[0]
        const expression = pair[1].slice(1, -1)
        // 绑定事件
        console.log(this.methods)
        el.addEventListener(event, (new Function(`
          'use strict'
          return ${expression}
        `)).bind(this)().bind(this))
      })
    })

    // 初始化
    for (const key in confObj.data) {
      this.$effectMap[key].forEach(effect => effect())
    }
  }
}

export default ViewModel
