Node.prototype.swap = function (node1, node2) {
  const newNode = document.createElement('div')
  this.insertBefore(newNode, node2)
  this.insertBefore(node2, node1)
  this.insertBefore(node1, newNode)
  newNode.remove()
}
NodeList.prototype.shuffle = function () {
  const parent = this[0].parentNode
  let m = this.length
  let i
  while (m) {
    i = Math.floor(Math.random() * m--)
    parent.swap(this[m], this[i])
  }
  return this
}

function handleDragStart (e) {
  e.dataTransfer.setData('text/plain', e.target.id)
}
function handleDragOver (e) {
  e.preventDefault()
}

customElements.define('jigsaw-component', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
  <div id="target-container">
    <div id="target">
      <div id="p1" class="piece"></div>
      <div id="p2" class="piece"></div>
      <div id="p3" class="piece"></div>
      <div id="p4" class="piece"></div>
      <div id="p5" class="piece"></div>
      <div id="p6" class="piece"></div>
      <div id="p7" class="piece"></div>
      <div id="p8" class="piece"></div>
      <div id="p9" class="piece"></div>
    </div>
  </div>
  <div id="controls">
    <div id="progress">
      <span>完成度</span>
      <progress max="100" value="0" id="progress-bar"></progress>
    </div>
    <button id="reset">打乱</button>
  </div>
  <div id="candidates">
    <div class="jigsaw" id="j1" draggable="true"></div>
    <div class="jigsaw" id="j2" draggable="true"></div>
    <div class="jigsaw" id="j3" draggable="true"></div>
    <div class="jigsaw" id="j4" draggable="true"></div>
    <div class="jigsaw" id="j5" draggable="true"></div>
    <div class="jigsaw" id="j6" draggable="true"></div>
    <div class="jigsaw" id="j7" draggable="true"></div>
    <div class="jigsaw" id="j8" draggable="true"></div>
    <div class="jigsaw" id="j9" draggable="true"></div>
  </div>
  `

  #style = /* css */ `
  :host {
    margin: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 800px;
    width: 100%;
  }

  #content-box {
    margin: auto;
    position: relative;
    display: flex;
  }

  hgroup {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  h1 {
    /* font-family: 'Times New Roman', Times, serif; */
    color: #fff;
    font-size: 40px;
    filter: drop-shadow(rgba(0, 0, 0, 0.377) 5px 5px);
  }

  h6 {
    color: #fff;
  }

  #target-container {
    border-radius: 25px;
    background-color: #fff;
    height: 400px;
    width: 400px;
    display: flex;
    justify-content: center;
    align-items: baseline;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12), 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
  }

  #target {
    display: grid;
    grid-template-rows: 100px 100px 100px;
    grid-template-columns: 100px 100px 100px;
    gap: 0px;
    height: 300px;
    width: 300px;
    margin: auto;
  }

  .piece {
    height: 100px;
    width: 100px;
    /* border: 1px solid lightgrey; */
    background-image: url("https://lsky.autumnsaury.com/i/2022/10/01/63381edbd6071.jpeg");
    background-repeat: no-repeat;
    background-size: 50%;
    background-position: 50% 50%;
  }

  .jigsaw {
    background-color: #fff;
    background-image: url("src/assets/images/jigsaw_22544325.jpg");
    background-size: 400% 400%;
    height: 100px;
    width: 100px;
  }

  /* 假装在切雪碧图 */

  #j2 {
    background-position: 33.3% 0;
  }

  #j3 {
    background-position: 66.7% 0;
  }

  #j4 {
    background-position: 0 33.3%;
  }

  #j5 {
    background-position: 33.3% 33.3%;
  }

  #j6 {
    background-position: 66.7% 33.3%;
  }

  #j7 {
    background-position: 0 66.7%;
  }

  #j8 {
    background-position: 33.3% 66.7%;
  }

  #j9 {
    background-position: 66.7% 66.7%;
  }

  #candidates .jigsaw {
    flex-shrink: 0;
    border-radius: 10px;
    margin: 0 25px;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12), 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
    transition: all 0.5s;
  }

  #candidates {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    overflow: hidden;
    /* position: absolute;
    bottom: -200px;
    right: calc(50% - 250px); */
    height: 150px;
    width: 500px;
    background-color: azure;
    border-radius: 10px;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12), 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
    margin: 100px;
  }

  #controls {
    background-color: #fff;
    display: flex;
    padding: 20px;
    margin: 20px;
    width: 20vw;
    justify-content: space-between;
    border-radius: 10vw;
  }

  #progress {
    display: flex;
    justify-content: baseline;
    align-items: center;
  }

  #progress span {
    margin: 0 10px;
  }

  button {
    width: 5em;
    height: 2em;
    border: medium none;
    border-radius: 5em;
    background-color: lightskyblue;
    font-size: 16px;
    color: #FFF;
    cursor: pointer;
  }
  `
  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.innerHTML = `${this.#template} <style>${this.#style}</style>`
    do {
      const candidates = this.#shadowRoot.querySelector('#candidates')
      const target = this.#shadowRoot.querySelector('#target')
      candidates.childNodes.forEach((el) => {
        if (el instanceof Text) {
          el.remove()
        }
      })
      target.childNodes.forEach((el) => {
        if (el instanceof Text) {
          el.remove()
        }
      })
      candidates.childNodes.shuffle()
    } while (false)

    this.#shadowRoot.querySelectorAll('.jigsaw').forEach(el => {
      el.addEventListener('dragstart', handleDragStart)
    })

    this.#shadowRoot.querySelectorAll('.piece').forEach(el => {
      el.addEventListener('dragover', handleDragOver)
      el.addEventListener('drop', this.handleDrop.bind(this))
    })

    this.#shadowRoot.querySelector('#candidates').addEventListener('dragover', handleDragOver)
    this.#shadowRoot.querySelector('#candidates').addEventListener('drop', this.handleDrop.bind(this))

    this.#shadowRoot.querySelector('#reset').addEventListener('click', this.handleReset.bind(this))
  }

  handleReset (e) {
    const candidates = this.#shadowRoot.querySelector('#candidates').childNodes
    if (candidates.length) candidates.shuffle()
  }

  refreshProgress () {
    const bar = this.#shadowRoot.getElementById('progress-bar')
    const targets = this.#shadowRoot.querySelector('#target').childNodes
    let val = 0.0
    targets.forEach((el) => {
      if (el.childElementCount === 1 &&
            el.id[1] === el.firstChild.id[1]
      ) {
        val += 11.1
      }
    })
    bar.value = val
  }

  handleDrop (e) {
    if (e.target.className !== 'jigsaw') {
      const id = e.dataTransfer.getData('text/plain')
      e.target.appendChild(this.#shadowRoot.getElementById(id))
      this.refreshProgress()
    } else {
      alert('Here\'s already a puzzle.')
    }
  }

  static get observedAttributes () {
    return []
  }

  attributeChangedCallback (name, oldValue, newValue) {
    switch (name) {
      case '':
        break
      default:
        break
    }
  }
})
