const globalStyleTarget = {
  '--primary-color': '#1e90ff', // dodgerblue
  '--secondary-color': '#87cefa', // lightskyblue
  '--constract-color': '#f08080', // lightcoral
  '--text-color': 'black',
  '--text-color-light': 'white',
  '--warning-color': '#ffa500', // orange
  '--error-color': '#ff0000' // red
}

!window.globalStyle && (
  window.globalStyle = new Proxy(globalStyleTarget, {
    get (target, key) {
      return target[key]
    },
    set (target, key, value) {
      target[key] = value
      window.dispatchEvent(new CustomEvent('global-style-change', {
        detail: {
          key,
          value
        }
      }))
    }
  })
)

/**
 * 应用全局样式
 * @param {HTMLElement} root 应用全局样式的根节点
 */
function applyGlobalStyle (root) {
  const { style } = root
  Object.entries(window.globalStyle).forEach(([key, value]) => {
    style.setProperty(key, value)
  })
  window.addEventListener('global-style-change', ev => {
    style.setProperty(ev.detail.key, ev.detail.value)
  })
}

HTMLElement.prototype.applyGlobalStyle = function () {
  applyGlobalStyle(this)
}

export default applyGlobalStyle
