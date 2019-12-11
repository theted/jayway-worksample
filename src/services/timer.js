/**
 * Timer service
 */

class Timer {
  constructor (max) {
    this.current = 0
    this.max = max
    this.interval = 1000 / 20 // update rate / 60 fps
    this.loop = false
  }

  start () {
    this.reset()
    // if (this.loop)
    clearInterval(this.loop)
    this.loop = setInterval(() => this.tick(), this.interval)
  }

  pause () {
    clearInterval(this.loop)
  }

  reset () {
    this.current = 0
  }

  restart () {
    this.reset()
    this.start()
  }

  addTime (ms) {
    this.current -= ms
  }

  setMaxTime (ms) {
    this.max = ms
  }

  watchEffect (func) {
    func(this.current)
  }

  tick () {
    // TODO; make time-accurate!
    this.current += this.interval
  }

  getCurrent () {
    return Math.round(this.current)
  }

  getTimeLeft () {
    return Math.round(this.max - this.current)
  }

  getProgressProcent () {
    return (this.max - this.current) / 100
  }
}

export default Timer
