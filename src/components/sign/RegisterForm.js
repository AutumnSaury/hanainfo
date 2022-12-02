import ViewModel from '../../utils/ViewModelUtil.js'
import useUserListStore from '../../stores/userListStore.js'

/**
 * @typedef {Object} User
 * @property {string} name 用户名
 * @property {'male' | 'female'} gender 性別
 * @property {string} password 密码
 * @property {string} email 邮箱
 * @property {string} phone 手机号
 * @property {string} avatar 头像
 */

customElements.define('register-form', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
    <form>
      <div class="k-v-pair">
        <label for="name">用户名</label>
        <input type="text" id="name" bind-two-way="value@{this.data.form.name}">
      </div>
      <div class="k-v-pair">
        <label for="email">邮箱</label>
        <input type="text" id="email" bind-two-way="value@{this.data.form.email}">
      </div>
      <div class="k-v-pair">
        <label for="phone">手机号</label>
        <input type="text" id="phone" bind-two-way="value@{this.data.form.phone}">
      </div>
      <div class="k-v-pair">
        <label for="password">密码</label>
        <input type="password" id="password" bind-two-way="value@{this.data.form.password}">
      </div>
      <div class="k-v-pair">
        <label for="password-repeat">重复密码</label>
        <input type="password" id="password-repeat" bind-two-way="value@{this.data.passwordRepeat}">
      </div>
      <fieldset class="radio-group">
        <legend>性别</legend>
        <div class="radio-pair">
          <input type="radio" name="gender" id="male" value="male" bind-event="change@{this.methods.setGender}">
          <label for="male">男</label>
          </div>
        <div class="radio-pair">
          <input type="radio" name="gender" id="female" value="female" bind-event="change@{this.methods.setGender}">
          <label for="female">女</label>
        </div>
      </fieldset>
      <button type="button" bind-event="click@{this.methods.submit}">注册</button>
    </form>
  `
  #style = /* css */ `
  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2rem;
    width: 300px;
  }

  form>* {
    margin: 0.25rem auto;
  }

  form label {
    user-select: none;
    font-size: 14px;
  }

  .k-v-pair {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .k-v-pair>input {
    height: 2rem;
    width: 300px;
    padding-left: 0.5rem;
    outline: none;
    transition: 0.3s;
    border: 1px solid #888;
    border-radius: 5px;
  }

  .k-v-pair>input:focus {
    border: 1px solid var(--secondary-color);
    box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.14) , 0px 3px 1px -2px rgba(0,0,0,0.12) , 0px 1px 5px 0px rgba(0,0,0,0.2);
    transition: 0.3s;
  }

  .k-v-pair>label {
    margin-bottom: 0.5rem;
  }

  .radio-group {
    display: block;
    align-self: center;
    padding: 0.5rem 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: 2px solid lightgray;
    margin: 0;
  }

  .radio-group > legend {
    font-size: 14px;
    margin: 0 1em;
    padding: 0 1em;
  }

  button {
    height: 2rem;
    width: 300px;
    border: none;
    background-color: var(--primary-color);
    color: white;
    border-radius: 5px;
    margin: 1rem;
  }
  `
  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.innerHTML = `${this.#template} <style>${this.#style}</style>`

    this.vm = new ViewModel(this.#shadowRoot, {
      data: {
        form: {
          name: '',
          email: '',
          phone: '',
          password: '',
          gender: '',
          avatar: ''
        },
        passwordRepeat: ''
      },
      methods: {
        setGender (ev) {
          this.data.form.gender = ev.target.value
        },

        submit () {
          const { name, email, phone, password, gender } = this.data.form
          const { passwordRepeat } = this.data
          if (password !== passwordRepeat) {
            alert('两次输入的密码不一致')
            return
          }
          for (const item of [name, email, phone, password, gender]) {
            if (item === '') {
              console.log(item)
              alert('请完整填写表单')
              break
            }
          }

          // eslint-disable-next-line no-undef
          this.data.form.avatar = `https://cravatar.cn/avatar/${MD5(email)}?size=120`

          const { addUser, findUser } = useUserListStore()
          let flag = true
          for (const item of [name, email, phone]) {
            flag = !findUser(item)
          }
          if (flag) {
            const user = {}
            Object.assign(user, this.data.form)
            addUser(user)
            alert('注册成功')
            window.$router.push({ fullPath: '/sign/sign-in' })
          } else {
            alert('用户已存在')
          }
        }
      }
    })
  }
})
