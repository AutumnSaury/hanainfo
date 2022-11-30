/**
 * @typedef {Object} User
 * @property {string} name 用户名
 * @property {'male' | 'female'} gender 性別
 * @property {string} password 密码
 * @property {string} email 邮箱
 * @property {string} phone 手机号
 * @property {string} avatar 头像
 */

/**
 * @type {User}
 */
const user = {
  name: '秋サンマ',
  gender: 'male',
  password: '111',
  email: 'autumnsaury@outlook.com',
  phone: '111',
  avatar: 'https://cravatar.cn/avatar/c8288b14c875abb75c7c82d7785d7545'
}

/**
 * 用户信息Store Hook
 * @param {'session' | 'local' | null} persistType 数据持久化类型，默认不进行持久化
 * @return {proxy<User>}
 */
function useUserStore (persistType) {
  return new Proxy(user, {
    get (target, key) {
      if (Object.keys.length === 0) {
        Object.assign(target, JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user')) || {})
      }
      return target[key]
    },
    set (target, key, value) {
      target[key] = value
      if (persistType === 'session') {
        sessionStorage.setItem(user, JSON.stringify(target))
      } else if (persistType === 'local') {
        localStorage.setItem(user, JSON.stringify(target))
      }
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
