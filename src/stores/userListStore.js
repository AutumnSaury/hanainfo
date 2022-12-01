/**
 * @typedef {Object} User
 * @property {string} name 用户名
 * @property {'male' | 'female'} gender 性別
 * @property {string} password 密码
 * @property {string} email 邮箱
 * @property {string} phone 手机号
 * @property {string} avatar 头像
 */
function useUserListStore () {
  const userList = JSON.parse(localStorage.getItem('userList') || '[]')
  /**
   * 添加用户
   * @param {User} user 用户
   */
  function addUser (user) {
    userList.push(user)
    localStorage.setItem('userList', JSON.stringify(userList))
  }

  /**
   * 查找用户
   * @param {string} key 用户名、邮箱或手机号
   * @return {User | null} 用户
   */
  function findUser (key) {
    return userList.find(user => user.name === key || user.email === key || user.phone === key) || null
  }

  /**
   * 验证用户
   * @param {string} key 用户名、邮箱或手机号
   * @param {string} password 密码
   * @return {User | null} 用户
   */
  function validateUser (key, password) {
    const user = findUser(key)
    if (!user) {
      return null
    }
    if (user.password !== password) {
      return null
    }
    return user
  }

  /**
   * 删除用户
   * @param {string} key 用户名、邮箱或手机号
   * @return {boolean} 是否删除成功
   */
  function removeUser (key) {
    const index = userList.findIndex(user => user.name === key || user.email === key || user.phone === key)
    if (index > -1) {
      userList.splice(index, 1)
      localStorage.setItem('userList', JSON.stringify(userList))
      return true
    }
    return false
  }

  return { userList, addUser, findUser, validateUser, removeUser }
}

export default useUserListStore
