import './AutumnSwiper.js'
import './ColoredCard.js'
import './TitledImage.js'
import useArtsListStore from '../stores/artsListStore.js'

customElements.define('frontpage-content', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
  <div class="content__grid">
    <div class="grid__item--swiper-wrapper grid__item">
      <autumn-swiper
        pause-on-hover
        autoplay
        interval="5000"
      ></autumn-swiper>
    </div>
    <div class="grid__item--character-info grid__item ci1">
      <colored-card
        src="src/assets/images/characters/jintan.jpg"
        image-position="left"
        maintitle="宿海仁太"
        subtitle="じんたん"
        color="#f08080"
      >
        幼年时成绩优秀、体育优异，创立了超平和Busters，性格相当活泼，是众人的领袖，在面码死后变得不善与人交流。是个左撇子。
        秩父市立绿之丘第三中学校毕业，曾在中学时代得过校内马拉松第三名及市内硬笔展银赏。
        高中没能考上第一志愿的明星高中，拒绝入读他所考上在其住家附近的高中。
        外出时为了不被国中同学认出，总是配戴着针织帽和粗黑框眼镜才出门。有许多件不同汉字的T-shirt。
      </colored-card>
    </div>
    <div class="grid__item--character-info grid__item ci2">
      <colored-card
        src="src/assets/images/characters/anaru_18667829.jpg"
        image-position="left"
        maintitle="安城鸣子"
        subtitle="あなる"
      >
        看上去很时髦的女高中生，有些傲娇。容易害羞。与仁太同班，从小的时候就喜欢仁太。
        自己童年时因为尚不知道其昵称"安鸣"不雅，导致之后闹出很多笑话，使得长大后已明了其意思的自己不是很喜欢被这样叫，而且被朋友以外的人这样称呼时会惊慌失措并急忙否认。
        最喜欢的是本间芽衣子，最讨厌的也是本间芽衣子。现在，在游戏商店打工。喜欢随波逐流但又非常想改掉这个毛病。从小收集很多漫画还有游戏碟，到现在也是这样。
      </colored-card>
    </div>
    <div class="grid__item--character-info grid__item ci3">
      <colored-card
        src="src/assets/images/characters/yukiatsu_19230237.jpg"
        image-position="right"
        maintitle="松雪集"
        subtitle="ゆきあつ"
      >
      个性好强，很早就对仁太抱有竞争意识，认为自己在各方面都能胜过他。
      童年曾勇敢地向为了挽留而追赶仁太的芽衣子告白，并拿出一只有粉色花的发夹要送给芽衣子，但却被敷衍（拒绝）。
      之后更认为自己的告白是把芽衣子给害死的原因，并以强大的罪恶感看待自己，从此一直坚持是自己害死了芽衣子。
      在十年后更因为希望芽衣子就算是报复或诅咒也好，也要出现在自己的面前，进而做出了一些扭曲的举动例如扮成芽衣子的行为。最后却在知利子的机智之下，暴露在仁太等人的面前。
      而在这个契机之下，其扭曲的心理终于得以冷静，假扮成芽衣子的举动也终于停止，事后对知利子以言语表达感谢。
      </colored-card>
    </div>
    <div class="grid__item--character-info grid__item ci4">
      <colored-card
        src="src/assets/images/characters/menma_52031923.jpg"
        image-position="right"
        maintitle="本间芽衣子"
        subtitle="めんま"
        image-width="50%"
        color="#d3d3d3"
      >
        皮肤白皙、银发蓝瞳、身材娇小的少女。性格天真，是大家的吉祥物。有着独特的说话方式。总是想着别人，即使心里很难受也傻呵呵地笑，每次哭都是为了别人。
      </colored-card>
    </div>
    <div class="grid__item--character-info grid__item ci5">
      <colored-card
        src="src/assets/images/characters/tsuruko_19385432.png"
        image-position="left"
        maintitle="鹤见知利子"
        subtitle="つるこ"
        color="#808080"
      >
        具有作为成年人的性格，喜好读书。与松雪集入读同一间高中学校，学业成绩为年级第四。对人态度有些冷漠，说话也有些刻薄，但没有恶意，其实内心很善良而且冷静，也有可爱的一面。喜欢雪集，而且对雪集相当了解。集去买女性用品时常叫她同去当掩护，知道雪集假扮芽间。
        有优秀的观察力，知道安城鸣子容易受人影响的缺点（从儿时起就一直在模仿芽衣子）和集暗中做的事。正因为在早些阶段就察觉到集的变异，为此而向仁太要求协助，最后在行动上成功拯救集的心理。
      </colored-card>
    </div>
    <div class="grid__item--character-info grid__item ci6">
      <colored-card
        src="src/assets/images/characters/poppo18478081.jpg"
        image-position="right"
        maintitle="久川铁道"
        subtitle="ぽっぽ"
        color="#deb887"
      >
        昔日个头娇小，有如大家的弟弟。
        现在是最强壮的男人，虽然外表变化很大，但内心一点没变。
        小时候一直认为自己是被人排挤的，所以很珍惜6人的友情。
        超和平Busters6人中年纪最小的一个，没有去高中读书，正在环游世界的自由人。
        在仁太找寻面码的过程中，与仁太相见。
      </colored-card>
    </div>
    <div class="grid__item--activity grid__item a1">
      <titled-image
        src="src/assets/images/activities/anohana-fes.webp"
        href="https://www.bilibili.com/video/av668501997"
      >
        演唱会Anohana Fes.
      </titled-image>
    </div>
    <div class="grid__item--activity grid__item a2">
      <titled-image
        src="src/assets/images/activities/chichibu-railway.jpg"
        href="https://www.chichibu-railway.co.jp/blog/news/210403-2/"
      >
        秩父铁道痛火车
      </titled-image>
    </div>
    <div class="grid__item--activity grid__item a3">
      <titled-image
        src="src/assets/images/activities/radio.png"
        href="https://10th.anohana.jp/radio/"
      >
        广播剧「あの花ラジオ」最终回放送
      </titled-image>
    </div>
    <div class="grid__item--activity grid__item a4">
      <titled-image
        src="src/assets/images/activities/10th-anniversary.png"
        href="https://10th.anohana.jp/"
      >
        十周年纪念
      </titled-image>
    </div>
    <div class="grid__item--activity grid__item a5">
      <titled-image
      src="src/assets/images/activities/stage.jpg"
      href="https://twitter.com/anohanastage/status/1492060847916478466"
      >
        舞台剧「未闻花名」DVD发售
    </titled-image>
    </div>
    <div class="grid__item--banner grid__item">
      <autumn-swiper
        pause-on-hover
        autoplay
      >
      </autumn-swiper>
    </div>
  </div>
  `

  #style = /* css */ `
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
  }

  .content__grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;

    width: 90vw;
    height: 90vh;
    scroll-margin-top: 0;
  }

  .grid__item {
    background-color: white;
    height: calc(100% - 5px * 2);
    width: calc(100% - 5px * 2);
    margin: 5px;
    box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.14) , 0px 1px 10px 0px rgba(0,0,0,0.12) , 0px 2px 4px -1px rgba(0,0,0,0.2);
    border-radius: 10px;
    overflow: hidden;
  }

  .grid__item--swiper-wrapper {
    grid-area: 1 / 1 / 6 / 5;
  }

  .grid__item--swiper-wrapper > autumn-swiper {
    width: 100%;
    height: 100%;
  }

  .ci1 { grid-area: 1 / 5 / 5 / 7; }
  .ci2 { grid-area: 1 / 7 / 3 / 9; }
  .ci3 { grid-area: 5 / 5 / 7 / 7; }
  .ci4 { grid-area: 3 / 7 / 7 / 9; }
  .ci5 { grid-area: 7 / 5 / 9 / 7; }
  .ci6 { grid-area: 7 / 7 / 9 / 9; }

  .grid__item--character-info > colored-card {
    height: 100%;
    width: 100%;
  }

  .a1 { grid-area: 6 / 1 / 7 / 2; }
  .a2 { grid-area: 6 / 2 / 7 / 3; }
  .a3 { grid-area: 6 / 3 / 7 / 4; }
  .a4 { grid-area: 6 / 4 / 7 / 5; }
  .a5 { grid-area: 7 / 1 / 9 / 3; }

  .grid__item--banner {
    grid-area: 7 / 3 / 9 / 5;
  }

  .grid__item--banner > autumn-swiper {
    width: 100%;
    height: 100%;
  }

  .grid__item--brief { grid-area: 7 / 5 / 9 / 9; }

  .grid__item--brief > colored-card {
    width: 100%;
    height: 100%;
  }
  `

  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.innerHTML = `${this.#template} <style>${this.#style}</style>`
    this.artSwiper = this.#shadowRoot.querySelector('.grid__item--swiper-wrapper > autumn-swiper')
    this.bannerSwiper = this.#shadowRoot.querySelector('.grid__item--banner > autumn-swiper')

    const artList = useArtsListStore()
    artList.forEach(src => {
      const item = document.createElement('autumn-swiper-item')
      item.innerHTML = /* html */ `
        <img src="${src}" alt="${src.match(/\d+(?=\.jpg)/)}" />
      `
      this.artSwiper.appendChild(item)
    })

    for (let i = 1; i < 8; ++i) {
      const item = document.createElement('autumn-swiper-item')
      item.innerHTML = /* html */ `
        <img src="src/assets/images/banners/${i}.webp" alt="${i}" style="object-position: top"/>
      `
      this.bannerSwiper.appendChild(item)
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
