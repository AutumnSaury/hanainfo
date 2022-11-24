/**
 * 数据绑定模块
 * @param {HTMLElement} rootElement
 * @param {Object} options
 */
class ViewModel {
  /**
   * 挂载根节点
   */
  #rootDOM

  /**
   * 放置副作用函数的临时变量
   */
  #registeringEffect

  /**
   * ViewModel构造函数
   * @param {HTMLElement} rootDOM
   * @param {{}} confObj
   *
   * @constructor
   */
  constructor (rootDOM, confObj) {
    this.#rootDOM = rootDOM

    /**
     * @type {Map<Proxy, Map<string, Set<Function>>>}
     */
    this.$effectMap = new Map()
    this.$attrBindedElements = this.#rootDOM.querySelectorAll('[bind-attr]')
    this.$propBindedElements = this.#rootDOM.querySelectorAll('[bind-prop]')
    this.$eventBindedElements = this.#rootDOM.querySelectorAll('[bind-event]')
    this.$twoWayBindedElements = this.#rootDOM.querySelectorAll('[bind-two-way]')

    // 代理数据
    const handlers = {
      get: (target, prop) => {
        if (this.#registeringEffect && !(target[prop] instanceof Object)) {
          this.#registerEffect(target, prop, this.#registeringEffect)
          this.#registeringEffect = null
        }
        return target[prop]
      },

      set: (target, prop, value) => {
        if (!(target[prop] instanceof Object)) {
          target[prop] = value
        } else {
          target[prop] = this.#createNestedProxy(value, handlers)
        }
        // HACK: 监听类似input这样的事件会造成无限循环，但不知道为什么循环到第二次的时候副作用桶会变成空值造成异常然后跳出，这里判断一下effect是否为空让它不至于报错
        this.$effectMap.get(target)?.get(prop)?.forEach(effect => effect && effect())
        return true
      }
    }
    this.data = this.#createNestedProxy(confObj.data, handlers)

    // 挂载方法
    this.methods = {}
    for (const key in confObj.methods) {
      this.methods[key] = confObj.methods[key].bind(this)
    }

    // 处理Attributes单向绑定
    this.$attrBindedElements.forEach(el => {
      // 分割绑定属性的字符串
      const bindStr = el.getAttribute('bind-attr')
      const bindList = this.#resolveBindStr(bindStr)
      bindList.forEach(({ target, expression }) => {
        // 根据表达式创建副作用函数
        this.#registeringEffect = () => { el.setAttribute(target, expression()) }
        this.#registeringEffect()
      })
    })

    // 处理Properties单向绑定
    this.$propBindedElements.forEach(el => {
      // 分割绑定属性的字符串
      const bindStr = el.getAttribute('bind-prop')
      const bindList = this.#resolveBindStr(bindStr)
      bindList.forEach(({ target, expression }) => {
        // 根据表达式创建副作用函数
        this.#registeringEffect = () => { el[target] = expression() }
        this.#registeringEffect()
      })
    })

    // 处理事件绑定
    this.$eventBindedElements.forEach(el => {
      // bind-event="event1@{expression1} event2@{expression2}..."
      // expression => Function
      // 分割绑定事件的字符串
      const bindList = this.#resolveBindStr(el.getAttribute('bind-event'))
      bindList.forEach(({ target, expression }) => {
        el.addEventListener(target, expression().bind(this))
      })
    })

    // 处理双向绑定
    // this.$twoWayBindedElements.forEach(el => {
    //   // 分割绑定属性的字符串
    //   const bindStr = el.getAttribute('bind-two-way')
    //   const bindList = this.#resolveBindStr(bindStr)
    //   bindList.forEach(({ target, expression }) => {
    //     // 根据表达式创建副作用函数
    //     this.#registeringEffect = () => { el[target] = expression() }
    //     this.#registeringEffect()
    //     // 对某些表单元素的特别处理
    //     const isFormElement = ['input', 'textarea', 'select'].includes(el.tagName.toLowerCase())
    //     const eventName = isFormElement ? 'input' : `${target}-change`
    //     const newValue = isFormElement ? el.value : el[target] || el.getAttribute(target)
    //     el.addEventListener(eventName, () => {
    //       if (isFormElement) {
    //         expression() = newValue
    //       } else {
    //         el.setAttribute(target, newValue)
    //       }
    //     })
    //   })
    // })

    // 初始化
    this.init()
  }

  init (effectMap) {
    for (const key in effectMap) {
      if (effectMap[key] instanceof Set) {
        effectMap[key].forEach(effect => effect())
      } else {
        this.init(effectMap[key])
      }
    }
  }

  /**
   * 解析绑定字符串
   * @param {string} bindStr 绑定字符串，格式为：target1@{expression1} target2@{expression2}...
   * @return {{target: string, expression: () => Function, origin?: string}[]} target: 绑定目标, expression: 由表达式生成的副作用函数，origin: 原始字符串
   */
  #resolveBindStr (bindStr) {
    const bindList = bindStr.match(/[a-zA-Z0-9-]+@\{.+\}/g)
    return bindList.map(bind => {
      const pair = bind.split('@')
      const target = pair[0]
      const expression = new Function(`
        'use strict'
        return ${pair[1].slice(1, -1)}
      `).bind(this)
      return { target, expression, origin: pair[1].slice(1, -1) }
    })
  }

  /**
   * 注册副作用函数
   * @param {Proxy} obj 代理对象
   * @param {any} key 单向绑定对象键名
   * @param {() => void} effect 副作用函数
   */
  #registerEffect (obj, key, effect) {
    if (!this.$effectMap.has(obj)) {
      this.$effectMap.set(obj, new Map())
    }
    if (!this.$effectMap.get(obj).has(key)) {
      this.$effectMap.get(obj).set(key, new Set())
    }
    this.$effectMap.get(obj).get(key).add(effect)
  }

  /**
   * 将嵌套对象结构转换为嵌套代理
   * @param {object} obj 待处理对象
   * @return {proxy} 代理对象
   */
  #createNestedProxy (obj, handler) {
    const proxy = new Proxy(obj, handler)
    for (const key in obj) {
      if (obj[key] instanceof Object) {
        proxy[key] = this.#createNestedProxy(obj[key], handler)
      }
    }
    return proxy
  }
}

export default ViewModel
