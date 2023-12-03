import ViewModel from '../../utils/ViewModelUtil.js'
import { useUserStore } from '../../stores/userStore.js'
import useUserListStore from '../../stores/userListStore.js'

// import md5 from '../../utils/MD5Util.js'
// MD5直接从unpkg引了，打包过的IIFE实在看不懂

const originalLogo = 'src/assets/images/hanainfo-dark.png'

customElements.define('sign-in-form', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
    <form>
    <img src="src/assets/images/hanainfo-dark.png" class="avatar">
      <div class="k-v-pair">
        <label for="username">用户名/邮箱/手机号</label>
        <input name="username" id="username" type="text" bind-two-way="value@{this.data.form.username}" bind-event="change@{this.methods.switchAvatar}" placeholder="请输入用户名/邮箱/手机号">
      </div>
      <div class="k-v-pair">
        <label for="password">密码</label>
        <input name="password" id="password" type="password" bind-two-way="value@{this.data.form.password}" placeholder="请输入密码">
      </div>
      <div class="persist-pair">
        <input name="password" id="persist" type="checkbox" bind-two-way="checked@{this.data.persist}">
        <label for="persist">自动登录</label>
      </div>
      <button type="button" bind-event="click@{this.methods.submit}">登录</button>
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

    .avatar {
      width: 120px;
      height: 120px;
      object-fit: contain;
      object-position: center;
      align-self: center;
      border-radius: var(--avatar-radius, 0);
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
      margin: 1rem auto;
    }

    form label {
      user-select: none;
      font-size: 14px;
    }

    .k-v-pair {
      display: flex;
      flex-direction: column;
    }

    .k-v-pair>input {
      height: 2rem;
      width: calc(300px - 1em);
      outline: none;
      transition: 0.3s;
      border: 1px solid #888;
      border-radius: 5px;
      padding: 0 0.5em;
    }

    .k-v-pair>input:focus {
      border: 1px solid var(--secondary-color);
      box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.14) , 0px 3px 1px -2px rgba(0,0,0,0.12) , 0px 1px 5px 0px rgba(0,0,0,0.2);
      transition: 0.3s;
    }

    .k-v-pair>label {
      margin-bottom: 0.5rem;
    }

    .persist-pair {
      margin: 0;
      align-self: flex-start;
      display: flex;
      align-items: center;
      font-size: 12px;
    }

    button {
      height: 2rem;
      width: 300px;
      border: none;
      background-color: var(--primary-color);
      color: white;
      border-radius: 5px;
    }
  `
  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.innerHTML = `${this.#template} <style>${this.#style}</style>`

    this.avatar = this.#shadowRoot.querySelector('.avatar')
    this.avatar.addEventListener('error', ev => {
      ev.target.src = originalLogo
      this.style.setProperty('--avatar-radius', '0')
    })

    const host = this
    this.vm = new ViewModel(this.#shadowRoot, {
      data: {
        form: {
          username: '',
          password: ''
        },
        persist: false
      },
      methods: {
        submit () {
          // window.$router.push({ fullPath: '/main/frontpage' })
          const { username, password } = this.data.form
          const { validateUser } = useUserListStore()
          const userStore = useUserStore(this.data.persist ? 'local' : 'session')
          const user = validateUser(username, password)
          if (user) {
            Object.assign(userStore, user)
            window.$router.push({ fullPath: '/main/frontpage' })
          } else {
            alert('用户名或密码错误')
          }
        },
        switchAvatar (ev) {
          const { username } = this.data.form
          // eslint-disable-next-line no-undef
          host.avatar.src = `https://cravatar.cn/avatar/${MD5(username)}?size=120&d=404`
          host.style.setProperty('--avatar-radius', '50%')
        }
      }
    })
  }
})
