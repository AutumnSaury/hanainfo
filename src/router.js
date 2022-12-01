import Router from './utils/RouterUtil.js'
import './views/FrameworkView.js'
import './views/FrontpageView.js'
import './views/ArticlesView.js'
import './views/OthersView.js'
import './views/AboutView.js'
import './views/SignView.js'
import './components/sign/SignInForm.js'
import './components/sign/RegisterForm.js'

import { useUserStore } from './stores/userStore.js'

/**
 * 路由记录
 * @typedef {Object} Route
 * @property {string?} title 页面标题
 * @property {string?} path 路径
 * @property {string?} componentName 组件名
 * @property {Route[]?} children 子路由
 * @property {string} fullPath 完整路径
 * @property {(from: Route, to: Route) => boolean | Route} before 路由守卫
 */

/**
 * 路由树
 * @type {Route[]}
 */
const routes = [
  {
    title: '登录/注册',
    path: 'sign',
    componentName: 'sign-view',
    before (from, to) {
      if (to.fullPath === '/sign') {
        return { fullPath: '/sign/sign-in' }
      }
    },
    children: [
      {
        title: '登录',
        path: 'sign-in',
        componentName: 'sign-in-form'
      },
      {
        title: '注册',
        path: 'register',
        componentName: 'register-form'
      }
    ]
  },
  {
    title: '',
    path: 'main',
    componentName: 'framework-view',
    before (from, to) {
      console.log(to)
      if (to.fullPath === '/main') {
        return { fullPath: '/main/frontpage' }
      }
    },
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
  return !!Object.keys(useUserStore()).length
}

window.$router = new Router(routes)
/**
 * @param {Route} from
 * @param {Route} to
 * @return {boolean | Route}
 */
window.$router.beforeEach = (from, to) => {
  console.log(from, to)
  if (to.fullPath === '/') {
    return {
      fullPath: '/main'
    }
  }

  if (!isAuthenticated() && !to.fullPath.startsWith('/sign')) {
    alert('请先登录')
    console.log('redirected')
    return { fullPath: '/sign/sign-in' }
  }

  return true
}
