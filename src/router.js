import Router from './utils/RouterUtil.js'
import './views/FrameworkView.js'
import './views/SignView.js'
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
        title: '关于',
        path: 'about',
        componentName: 'about-view'
      }
    ]
  }
]

window.$router = new Router(routes)
window.$router.beforeEach = (from, to) => {
  console.log(from, to)
  return true
}
