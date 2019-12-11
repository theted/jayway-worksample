import React from 'react'
import PropTypes from 'prop-types'
import Progressbar from './progressbar.js'
import * as Config from '../config.js'

const ProgressTimer = props => {
  const { progress, endCallback } = props

  const remainingPercent = (progress / Config.maxAnswerTime) * 100
  const displayText = Math.round(progress / 1000) + ' seconds left'

  if (remainingPercent <= 0) {
    endCallback()
  }

  return (
    <div className="progress-timer">
      <Progressbar progress={remainingPercent} text={displayText} />
    </div >
  )
}

ProgressTimer.propTypes = {
  progress: PropTypes.number,
  endCallback: PropTypes.func
}

export default ProgressTimer
