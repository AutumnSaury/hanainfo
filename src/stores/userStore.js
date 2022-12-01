/**
 * @typedef {Object} User
 * @property {string} name 用户名
 * @property {'male' | 'female'} gender 性別
 * @property {string} password 密码
 * @property {string} email 邮箱
 * @property {string} phone 手机号
 * @property {string} avatar 头像
 */

const user = {}
Object.assign(user, JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}'))

/**
 * 用户信息Store Hook
 * @param {'session' | 'local'} persistType 数据持久化类型，默认存入sessionStorage
 * @return {proxy<User>}
 */
function useUserStore (persistType = 'session') {
  return new Proxy(user, {
    get (target, key) {
      return target[key]
    },
    set (target, key, value) {
      target[key] = value
      if (persistType === 'session') {
        console.log('session')
        sessionStorage.setItem('user', JSON.stringify(target))
      } else if (persistType === 'local') {
        localStorage.setItem('user', JSON.stringify(target))
      }
      return true
    }
  })
}

function destructUserStore () {
  Object.keys(user).forEach(key => {
    delete user[key]
  })
  localStorage.removeItem('user')
  sessionStorage.removeItem('user')
}

export { useUserStore, destructUserStore }
