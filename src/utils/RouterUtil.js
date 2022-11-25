/**
 * 路由记录
 * @typedef {Object} Route 一条路由记录
 * @property {string?} title 页面标题
 * @property {string?} path 路径
 * @property {string?} componentName 组件名
 * @property {Route[]?} children 子路由
 * @property {string?} fullPath 完整路径
 * @property {string?} redirect 重定向路径
 */

// 路由类
class Router {
  /**
   * 路由类构造函数
   * @param {Route[]} routes 路由记录
   */
  constructor (routes) {
    this.routes = routes
    this.currentRoute = {}
    this.init()
  }

  init () {
    this.handleHashChange = this.handleHashChange.bind(this)
    this.initHash = this.initHash.bind(this)
    window.addEventListener('hashchange', this.handleHashChange)
    window.addEventListener('load', this.initHash)
  }

  handleHashChange () {
    window.removeEventListener('hashchange', this.handleHashChange)
    const path = location.hash.slice(1)
    const route = this.matchRouteByPath(path)
    console.log(route)
    if (route) {
      this.push(route)
    } else {
      console.warn(`路由${path}不存在`)
    }
    window.addEventListener('hashchange', this.handleHashChange)
  }

  initHash () {
    const path = location.hash.slice(1)
    if (path) {
      window.dispatchEvent(new CustomEvent('route-change', {
        detail: {
          from: {},
          to: this.matchRouteByPath(path)
        }
      }))
      this.currentRoute = this.matchRouteByPath(path)
    } else {
      window.location.hash = '/'
    }
  }

  /**
   * 路由跳转
   * @param {Route} route 路由记录，必须包含fullPath属性
   */
  push (route) {
    if (!this.beforeEach(this.currentRoute, route)) {
      return
    }
    route = this.matchRouteByPath(route.fullPath)
    if (!route) {
      console.warn(`路由${route.fullPath}不存在`)
      return
    }
    // 关闭对hashchange的监听
    window.removeEventListener('hashchange', this.handleHashChange)
    window.location.hash = route.fullPath
    window.dispatchEvent(new CustomEvent('route-change', {
      detail: {
        from: this.currentRoute,
        to: route
      }
    }))
    // 打开对hashchange的监听
    window.addEventListener('hashchange', this.handleHashChange)
    this.currentRoute = route
  }

  /**
   * 解析路由路径
   * @param {string} path 路由路径
   * @returns {string[]} 包含每一层路径的数组
   */
  resolveRoute (path) {
    return path.split('/').filter(Boolean)
  }

  /**
   * 匹配路由记录
   * @param {string} fullPath 绝对路径，以/开头
   * @returns {Route?} 路由记录
   */
  matchRouteByPath (fullPath) {
    const pathArr = this.resolveRoute(fullPath)
    let route
    for (let i = 0; i < pathArr.length; i++) {
      if (i === 0) {
        route = this.routes.find(s => s.path === pathArr[i])
      } else {
        route = route.children.find(s => s.path === pathArr[i])
      }
      if (!route) {
        return null
      }
    }
    if (route) {
      route.fullPath = fullPath
    }
    return route
  }

  /**
   * 路由守卫
   * @type {(from: Route, to: Route) => boolean}
   * @param {Route} from 路由来源
   * @param {Route} to 路由目标
   * @returns {boolean | Route} 是否允许跳转或重定向本次跳转
   */
  beforeEach (from, to) {
    return true
  }
}

// 路由视图元素
customElements.define('router-view', class extends HTMLElement {
  #shadowRoot
  #template = ''
  #style = /* css */ `
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    slot {
      display: block;
      width: 100%;
      height: 100%;
    }
  `
  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open', slotAssignment: 'manual' })
    this.#shadowRoot.innerHTML = `${this.#template} <style>${this.#style}</style>`
    this.currentView = ''
  }

  static get observedAttributes () {
    return ['path']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    switch (name) {
      case 'path':
        this.path = newValue
        break
    }
  }

  connectedCallback () {
    window.addEventListener('route-change', ev => {
      const { from, to } = ev.detail
      console.log(from, to)
      const childPattern = new RegExp(`(?<=${this.path})[\\w-]+`)
      if (this.isPathStartWith(to.fullPath) &&
        from?.fullPath?.match(childPattern)[0] !== to.fullPath.match(childPattern)[0]) {
        this.changeView(to.componentName)
      }
    })
  }

  /**
   * 切换视图
   * @param {string} view 新视图
   */
  changeView (view) {
    console.log('changeView', view)
    this.#template = `<${view}></${view}>`
    this.#shadowRoot.innerHTML = `${this.#template} <style>${this.#style}</style>`
  }

  /**
   * 判断是否匹配路由
   * @param {string} fullPath 绝对路径
   * @returns {boolean} 匹配结果
   */
  isPathStartWith (fullPath) {
    return fullPath.startsWith(this.path)
  }
})

export default Router
