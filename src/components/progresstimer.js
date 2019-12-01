import React from "react"
import Progressbar from './progressbar.js'
import * as Config from '../config.js'

const ProgressTimer = props => {
  const { progress, endCallback } = props

  let remainingPercent = (progress / Config.maxAnswerTime) * 100

  if (remainingPercent <= 0) {
    endCallback()
  }

  return (
    <div className="progress-timer">
      <Progressbar progress={remainingPercent} />
    </div >
  )
}

export default ProgressTimer
