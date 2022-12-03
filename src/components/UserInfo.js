import { useUserStore, destructUserStore } from '../stores/userStore.js'
import './ColoredIcon.js'

const userStore = useUserStore()

customElements.define('user-info', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
    <img class="user-info__avatar" alt="头像" src="${userStore.avatar}">
    <div class="user-info__drop">
      <div class="drop__name">${userStore.name}</div>
      <div class="drop__email">
        ${userStore.email}
        <colored-icon
          class="drop__email-icon"
          src="src/assets/icons/${userStore.gender}.svg"
          color="${userStore.gender === 'male'
            ? 'dodgerblue'
            : 'pink'
          }"
          size="1em"
        ></colored-icon>
      </div>
      <div class="drop__sign-out">
        退出登录
        <colored-icon size="1.2rem" src="src/assets/icons/sign-out.svg" color="${window.globalStyle['--error-color']}"></colored-icon>
      </div>
    </div>
  `

  #style = /* css */ `
    :host {
      display: flex;
      position: relative;
    }

    .user-info__avatar {
      position: relative;
      z-index: 1;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      object-fit: cover;
      top: 0;
      right: 0;
      transition: 0.5s;
    }

    .user-info__avatar:hover,
    .user-info__avatar:has(+ .user-info__drop:hover) {
      transition: 0.5s;
      top: 1rem;
      right: 1rem;
      transform: scale(2);
    }

    .user-info__drop {
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;

      position: absolute;
      top: 2.5rem;
      right: calc((2.5rem - 20rem) / 2 + 1rem);

      width: 20rem;
      height: 0;
      border-radius: 10px;
      background-color: #ffffff;
      box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.14) , 0px 3px 1px -2px rgba(0,0,0,0.12) , 0px 1px 5px 0px rgba(0,0,0,0.2);

      transition: 0.5s;
    }

    .user-info__avatar:hover + .user-info__drop,
    .user-info__drop:hover {
      height: 10rem;
      transition: 0.5s;
    }

    .drop__name {
      margin-top: 2.5rem;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .drop__email {
      display: flex;
      margin-top: 0.5rem;
      font-size: 12px;
      color: gray;
    }

    .drop__email__icon {
      display: inline-block;
    }

    .drop__sign-out {
      position: absolute;
      bottom: 0;

      width: calc(100% - 2rem);
      height: 3rem;
      margin: 0 1rem;
      border-top: 1px solid lightgray;

      display: flex;
      align-items: center;
      justify-content: space-between;

      font-size: 14px;
    }
  `
  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.innerHTML = `${this.#template} <style>${this.#style}</style>`
  }

  connectedCallback () {
    this.#shadowRoot.querySelector('.drop__sign-out').addEventListener('click', () => {
      destructUserStore()
      window.$router.push({ fullPath: '/sign' })
    })
  }
})
