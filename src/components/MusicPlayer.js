import './ColoredIcon.js'

// 这里就不让父元素传json进来了，摸了

/**
 * 音乐信息
 * @typedef {Object} Music
 * @property {string} title 标题
 * @property {string} src 音源
 * @property {string} cover 专辑封面
 * @property {string} duration 时长
 * @property {string} artist 艺术家
 * @property {string} album 专辑
 */

/**
 * @type {Music[]}
 */
const playList = [
  {
    title: 'Tamerai',
    src: 'src/assets/music/Tamerai.mp3',
    cover: 'src/assets/images/album-cover.jpg',
    duration: '1:14',
    artist: 'REMEDIOS',
    album: 'あの日見た花の名前を僕達はまだ知らない Original Soundtrack'
  },
  {
    title: 'I Left You Last',
    src: 'src/assets/music/I Left You Last.mp3',
    cover: 'src/assets/images/album-cover.jpg',
    duration: '1:39',
    artist: 'REMEDIOS',
    album: 'あの日見た花の名前を僕達はまだ知らない Original Soundtrack'
  },
  {
    title: 'Dynamic Sunset',
    src: 'src/assets/music/Dynamic Sunset.mp3',
    cover: 'src/assets/images/album-cover.jpg',
    duration: '3:11',
    artist: 'REMEDIOS',
    album: 'あの日見た花の名前を僕達はまだ知らない Original Soundtrack'
  },
  {
    title: 'Back In The Old Hut',
    src: 'src/assets/music/Back In The Old Hut.mp3',
    cover: 'src/assets/images/album-cover.jpg',
    duration: '1:56',
    artist: 'REMEDIOS',
    album: 'あの日見た花の名前を僕達はまだ知らない Original Soundtrack'
  },
  {
    title: "When We're All Together",
    src: "src/assets/music/When We're All Together.mp3",
    cover: 'src/assets/images/album-cover.jpg',
    duration: '1:51',
    artist: 'REMEDIOS',
    album: 'あの日見た花の名前を僕達はまだ知らない Original Soundtrack'
  },
  {
    title: "Let's Go Look For Her",
    src: "src/assets/music/Let's Go Look For Her.mp3",
    cover: 'src/assets/images/album-cover.jpg',
    duration: '1:33',
    artist: 'REMEDIOS',
    album: 'あの日見た花の名前を僕達はまだ知らない Original Soundtrack'
  },
  {
    title: 'Bored With Loose Friends',
    src: 'src/assets/music/Bored With Loose Friends.mp3',
    cover: 'src/assets/images/album-cover.jpg',
    duration: '1:37',
    artist: 'REMEDIOS',
    album: 'あの日見た花の名前を僕達はまだ知らない Original Soundtrack'
  },
  {
    title: 'Dokidoki',
    src: 'src/assets/music/Dokidoki.mp3',
    cover: 'src/assets/images/album-cover.jpg',
    duration: '0:55',
    artist: 'REMEDIOS',
    album: 'あの日見た花の名前を僕達はまだ知らない Original Soundtrack'
  },
  {
    title: 'Before It Gets Dark',
    src: 'src/assets/music/Before It Gets Dark.mp3',
    cover: 'src/assets/images/album-cover.jpg',
    duration: '3:10',
    artist: 'REMEDIOS',
    album: 'あの日見た花の名前を僕達はまだ知らない Original Soundtrack'
  },
  {
    title: 'All About Her Death',
    src: 'src/assets/music/All About Her Death.mp3',
    cover: 'src/assets/images/album-cover.jpg',
    duration: '2:10',
    artist: 'REMEDIOS',
    album: 'あの日見た花の名前を僕達はまだ知らない Original Soundtrack'
  },
  {
    title: 'Lost Childhood',
    src: 'src/assets/music/Lost Childhood.mp3',
    cover: 'src/assets/images/album-cover.jpg',
    duration: '2:18',
    artist: 'REMEDIOS',
    album: 'あの日見た花の名前を僕達はまだ知らない Original Soundtrack'
  },
  {
    title: 'I Lie Asleep ~ interlude',
    src: 'src/assets/music/I Lie Asleep ~ interlude.mp3',
    cover: 'src/assets/images/album-cover.jpg',
    duration: '2:26',
    artist: 'REMEDIOS',
    album: 'あの日見た花の名前を僕達はまだ知らない Original Soundtrack'
  },
  {
    title: 'Dear Love ～ when I first met you',
    src: 'src/assets/music/Dear Love ～ when I first met you.mp3',
    cover: 'src/assets/images/album-cover.jpg',
    duration: '3:43',
    artist: 'REMEDIOS',
    album: 'あの日見た花の名前を僕達はまだ知らない Original Soundtrack'
  },
  {
    title: 'Last Train Home ～ still far',
    src: 'src/assets/music/Last Train Home ～ still far.mp3',
    cover: 'src/assets/images/album-cover.jpg',
    duration: '3:21',
    artist: 'REMEDIOS',
    album: 'あの日見た花の名前を僕達はまだ知らない Original Soundtrack'
  },
  {
    title: 'Thin Moonlight',
    src: 'src/assets/music/Thin Moonlight.mp3',
    cover: 'src/assets/images/album-cover.jpg',
    duration: '2:54',
    artist: 'REMEDIOS',
    album: 'あの日見た花の名前を僕達はまだ知らない Original Soundtrack'
  },
  {
    title: 'Flash Back',
    src: 'src/assets/music/Flash Back.mp3',
    cover: 'src/assets/images/album-cover.jpg',
    duration: '0:38',
    artist: 'REMEDIOS',
    album: 'あの日見た花の名前を僕達はまだ知らない Original Soundtrack'
  },
  {
    title: 'Secret Feelings ～ now revealed',
    src: 'src/assets/music/Secret Feelings ～ now revealed.mp3',
    cover: 'src/assets/images/album-cover.jpg',
    duration: '2:26',
    artist: 'REMEDIOS',
    album: 'あの日見た花の名前を僕達はまだ知らない Original Soundtrack'
  },
  {
    title: 'Dear Love',
    src: 'src/assets/music/Dear Love.mp3',
    cover: 'src/assets/images/album-cover.jpg',
    duration: '3:56',
    artist: 'REMEDIOS',
    album: 'あの日見た花の名前を僕達はまだ知らない Original Soundtrack'
  },
  {
    title: 'Denial',
    src: 'src/assets/music/Denial.mp3',
    cover: 'src/assets/images/album-cover.jpg',
    duration: '3:32',
    artist: 'REMEDIOS',
    album: 'あの日見た花の名前を僕達はまだ知らない Original Soundtrack'
  },
  {
    title: 'I Left You',
    src: 'src/assets/music/I Left You.mp3',
    cover: 'src/assets/images/album-cover.jpg',
    duration: '6:48',
    artist: 'REMEDIOS',
    album: 'あの日見た花の名前を僕達はまだ知らない Original Soundtrack'
  }
]

customElements.define('music-player', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
    <div class="wrapper">
      <audio class="audio" src="${playList[0].src}" autoplay></audio>
      <div class="player">
        <div class="player__inner">
          <div class="player__title">${playList[0].title}</div>
          <div class="player__controls">
            <colored-icon
              class="controls__button controls__button--prev"
              size="2rem"
              src="src/assets/icons/player-control/prev.svg"
              color="var(--secondary-color)"
            ></colored-icon>
            <colored-icon
              class="controls__button controls__button--play"
              size="2rem"
              src="src/assets/icons/player-control/pause.svg"
              color="var(--secondary-color)"
            ></colored-icon>
            <colored-icon
              class="controls__button controls__button--next"
              size="2rem"
              src="src/assets/icons/player-control/next.svg"
              color="var(--secondary-color)"
            ></colored-icon>
            <colored-icon
              class="controls__button controls__button--list"
              size="2rem"
              src="src/assets/icons/player-control/list.svg"
              color="var(--secondary-color)"
            ></colored-icon>
          </div>
        </div>
        <div class="player__cover"></div>
        <div class="player__play-list">
          <table>
            <thead>
              <tr>
                <th>编号</th>
                <th>标题</th>
                <th>艺术家</th>
                <th>专辑</th>
                <th>时长</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `

  #style = /* css */ `
    .wrapper {
      display: flex;

      position: fixed;
      bottom: 10rem;
      left: -20rem;

      height: 5rem;
      width: 25rem;
      transition: 0.5s;
    }

    .wrapper:has(:is(.player--list-expanded, .player:hover)) {
      transition: 0.5s;
      left: 0rem;
    }

    .player {
      display: flex;
      overflow: hidden;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      width: 100%;
      background-color: white;
      box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.14) , 0px 3px 1px -2px rgba(0,0,0,0.12) , 0px 1px 5px 0px rgba(0,0,0,0.2);
      border-radius: 0 1rem 1rem 0;
      transition: 0.5s;

      position: absolute;
      bottom: 0;
    }

    .player--list-expanded {
      height: calc(100% + 50vh);
      bottom: 0;
      transition: 0.5s;
    }

    .player__inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      width: 18rem;
      margin: 0 1rem;
      height: 5rem;

      position: absolute;
      bottom: 0;
      left: 0;
    }

    .player__title {
      display: flex;
      white-space: nowrap;
      overflow: hidden;
      font-size: 12px;
      color: gray;
    }

    .player__controls {
      width: 100%;
      display: flex;
      justify-content: center;
      position: relative;
    }

    .controls__button {
      cursor: pointer;
    }

    .controls__button--list {
      position: absolute;
      right: 0;
    }

    .player__cover {
      display: flex;
      margin: 0.5rem;
      height: 4rem;
      width: 4rem;
      background-image: url(${playList[0].cover});
      background-size: cover;
      animation: playing 20s linear infinite;
      border-radius: 50%;
      cursor: pointer;

      position: absolute;
      bottom: 0;
      right: 0;
    }

    .player__cover--paused {
      animation-play-state: paused;
    }

    .player__play-list {
      display: flex;
      position: absolute;
      bottom: 5rem;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      min-width: 25rem;
      max-height: 50vh;
      background-color: white;
      font-size: 12px;
      border-radius: 10px 10px 0 0;
      overflow: hidden;
    }

    ::-webkit-scrollbar {
      width: 5px;
      background-color: white;
    }

    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: var(--primary-color);
      transition: 0.5s;
    }

    .player__play-list > table {
      display: block;
      border-collapse:collapse;
      height: 100%;
      
      overflow-y: auto;
      overflow-x: hidden;
    }

    .player__play-list > table > thead th {
      height: 3em;
      font-weight: normal;
    }

    .player__play-list > table > tbody {
      width: 100%;
      overflow-y: auto;
      max-height: calc(50vh - 3em);
    }

    .player__play-list > table td {
      padding: 0 1em;
    }

    .player__play-list > table > tbody tr {
      background-color: white;
      cursor: pointer;
    }

    .player__play-list > table > tbody tr:nth-child(2n - 1) {
      background-color: #bbb;
      color: white;
    }

    @keyframes playing {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }
  `

  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.innerHTML = `${this.#template} <style>${this.#style}</style>`

    this.audio = this.#shadowRoot.querySelector('.audio')
    this.player = this.#shadowRoot.querySelector('.player')
    this.titleEl = this.#shadowRoot.querySelector('.player__title')
    this.prevBtn = this.#shadowRoot.querySelector('.controls__button--prev')
    this.playBtn = this.#shadowRoot.querySelector('.controls__button--play')
    this.nextBtn = this.#shadowRoot.querySelector('.controls__button--next')
    this.listBtn = this.#shadowRoot.querySelector('.controls__button--list')
    this.cover = this.#shadowRoot.querySelector('.player__cover')
    this.currentTrack = 1
    this.listExpanded = false

    this.prevBtn.addEventListener('click', () => this.prev())
    this.playBtn.addEventListener('click', () => this.playOrPause())
    this.nextBtn.addEventListener('click', () => this.next())
    this.listBtn.addEventListener('click', () => this.toggleList())
    this.cover.addEventListener('click', () => this.playOrPause())
    this.audio.addEventListener('ended', () => this.next())

    const playListTab = this.#shadowRoot.querySelector('.player__play-list > table > tbody')
    playList.forEach((track, index) => {
      const row = document.createElement('tr')
      row.innerHTML = /* html */ `
        <td>${index + 1}</td>
        <td>${track.title}</td>
        <td>${track.artist}</td>
        <td>${track.album}</td>
        <td>${track.duration}</td>
      `
      row.addEventListener('click', () => { this.switchToTrack(index + 1) })
      playListTab.appendChild(row)
    })

    this.audio.addEventListener('canplay', () => {
      this.play()
    })
  }

  prev () {
    this.switchToTrack(this.currentTrack === 0 ? playList.length : this.currentTrack - 1)
  }

  next () {
    this.switchToTrack(this.currentTrack === playList.length ? 1 : this.currentTrack + 1)
  }

  playOrPause () {
    if (this.audio.paused) {
      this.play()
    } else {
      this.pause()
    }
  }

  play () {
    this.audio.play().catch(() => this.pause())
    this.cover.classList.remove('player__cover--paused')
    this.playBtn.setAttribute('src', 'src/assets/icons/player-control/pause.svg')
  }

  pause () {
    this.audio.pause()
    this.cover.classList.add('player__cover--paused')
    this.playBtn.setAttribute('src', 'src/assets/icons/player-control/play.svg')
  }

  switchToTrack (trackNo) {
    this.currentTrack = trackNo
    this.audio.src = playList[trackNo - 1].src
    this.titleEl.innerHTML = playList[trackNo - 1].title
  }

  toggleList () {
    if (!this.listExpanded) {
      this.player.classList.add('player--list-expanded')
      this.listBtn.setAttribute('color', 'var(--primary-color)')
      this.listExpanded = true
    } else {
      this.player.classList.remove('player--list-expanded')
      this.listBtn.setAttribute('color', 'var(--secondary-color)')
      this.listExpanded = false
    }
  }
})
