import './ColoredCard.js'
import './ColoredIcon.js'

customElements.define('frontpage-brief-intro', class extends HTMLElement {
  #shadowRoot
  #template = /* html */ `
    <article>
      <hgroup>
        <h1>故事简介</h1>
        <h4>あの日見た花の名前を僕達はまだ知らない。</h4>
      </hgroup>
      <section>
        <p>昔日孩童时期总是一起结伴同玩的6位好朋友，因女主角·本间芽衣子的意外死亡而各自心存芥蒂导致关系疏离。但某一天，虽然各种事物都在变化，但唯独她不变的芽衣子却突然出现在已像隐蔽青年般的主人公·宿海仁太面前，并要仁太帮助她完成心愿从而成佛。在这个过程中昔日的好友，散发着辣妹气息的安城鸣子、进入了以大学为目标的学校的松雪集和鹤见知利子、以及在高中便放弃升学现正四处游历的久川铁道慢慢加入到帮助芽间完成心愿的队伍中来。而在大家努力帮助她完成心愿的同时，十年前发生的种种往事以及彼此心中的秘密也渐渐浮现在大家面前</p>
        <p>仁太是超和平buster的队长，玩伴都喜欢吃仁太母亲的蒸松糕，后来母亲病重住院，仁太没有安慰，却冲母亲抱怨，为什么不做蒸馒头，然后转身就走。后来母亲对芽间说，仁太是个坚强的孩子，不想在自己面前哭，让自己担心，但她希望儿子该哭的时候哭出来。于是芽间答应她要让仁太哭。雪集喜欢芽间和安鸣喜欢仁太，他们计划挑拨一下仁太和芽间的感情，于是大家在秘密基地时，安鸣问仁太：“你喜欢芽间么？”仁太很慌张地回复：“谁会喜欢这种丑女？”芽间听到后却只是笑笑（那笑容真让人心疼）。仁太跑出秘密基地，芽间去追。受了仁太妈妈的愿望让仁太哭，芽间找大家商量时、不小心失足掉入河中，从此只能出现在大家的记忆中……</p>
        <p>仁太之后也没能专心学习，因为他总能想起芽间，而这个幽灵般的芽间也一直在他身边，所以，尽管脑子好使，仁太却进了个垃圾高中。芽间突然说自己好像要实现一个愿望，要超和平buster的伙伴一起实现。大家慢慢重新走到一起，为了芽间的愿望而努力，却一次次猜错愿望。最后大家认为芽间想做个烟花，要成佛升天转世。然而，烟花绽放之后，仁太却发现芽间没有升天，愿望再次猜错。当晚，大家说明了自己要为芽间的梦想而努力的动机，其实都是为了自己。</p>
        <p>于是仁太回家问问芽间自己的想法。然而，芽间感觉到自己快消失了，她说：“我的愿望就要实现了”。仁太将她背到秘密基地，却看不到那个幽灵的芽间了，大家去森林里寻找。芽间努力的在日记上写下了自己对大家的喜爱。终于，清晨时候，大家都看到了芽间，芽间的愿望实现了，就是当初答应仁太母亲——要仁太该哭的时候，就哭出来……</p>
        <p>看起来已经改变但却依旧没有改变的大家。《未闻花名》的故事不禁使人想起昔日很要好的朋友，现在到底在哪里呢？若我们再次遇见，已各自生活在各个领域的大家又能否像以往般的要好？《未闻花名》便正是这样的一个故事了。</p>
        <p>该作品情感真挚，令人感动。是ACGN中公认的“催泪弹”之一。</p>
      </section>
    </article>
    <img src="src/assets/images/anohana.png" alt="anohana">
    <colored-icon src="src/assets/icons/arrows/arrow-down-bold.svg" color="var(--primary-color)" class="down-arrow"></colored-icon>
  `
  #style = /* css */ `
    :host {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      height: 100vh;
      width: 100vw;
      background-image: url("src/assets/images/bg2_52609969.jpg");
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      position: relative;
    }

    article {
      color: white;
      display: flex;
      justify-content: space-between;
      width: 100%;
      position: relative;
    }

    hgroup {
      margin: 4rem;
      filter: drop-shadow(0 0 1px black);
    }

    h1 {
      font-size: 60px;
      margin: 0;
    }

    h4 {
      margin-left: 4em;
    }

    section {
      margin: 4rem;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
      width: calc(2 * 20 * 16px + 5rem);
      max-height: 800px;
      top: 0;
    }

    p {
      text-indent: 2em;
      width: 20em;
      font-size: 16px;
      filter: drop-shadow(0 0 1px black);
    }

    @media (min-width: 1600px) {
      h1 {
        font-size: 80px;
      }
      
      section {
        max-height: 800px;
        width: calc(2 * 20 * 18px + 10rem);
      }

      p {
        font-size: 18px;
      }
    }

    img {
      position: absolute;
      bottom: 10%;
      left: 5rem;
    }

    colored-icon {
      align-self: center;
      position: absolute;
      bottom: 4rem;
      cursor: pointer;
    }
  `
  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.innerHTML = `${this.#template} <style>${this.#style}</style>`
    this.downArrow = this.#shadowRoot.querySelector('.down-arrow')
    this.downArrow.addEventListener('click', () => {
      window.scrollTo({
        top: window.innerHeight * 2,
        behavior: 'smooth'
      })
    })
  }
})
