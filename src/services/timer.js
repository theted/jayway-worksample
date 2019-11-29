/**
 * Timer service
 */

class Timer {
  constructor() {
    this.current = 0
    this.max = 15 * 1000 // max time, in ms
    this.interval = 1000 / 60 // update rate / 60 fps
  }

  start() {
    this.reset()
    this.loop = setInterval(() => this.tick(), this.interval)
  }

  pause() {
    clearInterval(this.loop)
  }

  reset() {
    this.current = 0
  }

  restart() {
    this.reset()
    this.start()
  }

  watchEffect(func) {
    func(this.current)
  }

  tick() {
    // TODO; make time-accurate!
    this.current += this.interval
  }

  getCurrent() {
    return Math.round(this.current)
  }

  getTimeLeft() {
    return Math.round(this.max - this.current)
  }

  getProgressProcent() {
    return (this.max - this.current) / 100
  }

}

export default Timer
