class PauseableInterval {
  constructor (callback, interval) {
    this.callback = () => {
      if (!this.paused) {
        callback()
      }
    }
    this.paused = false
    this.interval = interval
    this.timer = setInterval(this.callback, this.interval)
  }

  resume () {
    this.paused = false
  }

  pause () {
    this.paused = true
  }

  clear () {
    clearInterval(this.timer)
  }
}

export default PauseableInterval
