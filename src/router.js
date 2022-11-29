import Router from './utils/RouterUtil.js'
import './views/FrameworkView.js'
import './views/FrontpageView.js'
import './views/ArticlesView.js'
import './views/OthersView.js'
import './views/AboutView.js'
import './views/SignView.js'
/**
 * 路由记录
 * @typedef {Object} Route
 * @property {string?} title 页面标题
 * @property {string?} path 路径
 * @property {string?} componentName 组件名
 * @property {Route[]?} children 子路由
 * @property {string} fullPath 完整路径
 * @property {string?} redirect 重定向路径
 */

/**
 * 路由树
 * @type {Route[]}
 */
const routes = [
  {
    title: '登录/注册',
    path: 'sign',
    componentName: 'sign-view'
  },
  {
    title: '',
    path: 'main',
    componentName: 'framework-view',
    children: [
      {
        title: '首页',
        path: 'frontpage',
        componentName: 'frontpage-view'
      },
      {
        title: '文章',
        path: 'articles',
        componentName: 'articles-view'
      },
      {
        title: '其他',
        path: 'others',
        componentName: 'others-view'
      },
      {
        title: '关于',
        path: 'about',
        componentName: 'about-view'
      }
    ]
  }
]

/**
 * @return {boolean} 是否已登录
 */
function isAuthenticated () {
  return true
}

window.$router = new Router(routes)
/**
 * @param {Route} from
 * @param {Route} to
 * @return {boolean | Route}
 */
window.$router.beforeEach = (from, to) => {
  // console.log(from, to)
  if (to.fullPath === '/') {
    return {
      fullPath: '/main'
    }
  }

  if (!isAuthenticated() && to.fullPath !== '/sign') {
    alert('请先登录')
    return {
      fullPath: '/sign'
    }
  }

  return true
}
