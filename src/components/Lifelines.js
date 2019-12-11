import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from './Button.js'

const Lifelines = props => {
  const { removeHalf, addTime } = props
  const [removeHalfUsed, setRemoveHalfUsed] = useState(false)
  const [addTimeUsed, setAddTimeUsed] = useState(false)

  const addTimeCallback = () => {
    setAddTimeUsed(true)
    addTime()
  }

  const removeHalfCallback = () => {
    setRemoveHalfUsed(true)
    removeHalf()
  }

  return (
    <div className="life-lines">
      <Button onClick={addTimeCallback} text="+10s" disabled={addTimeUsed} />
      <Button onClick={removeHalfCallback} text="50/50" disabled={removeHalfUsed} />
    </div>
  )
}

Lifelines.propTypes = {
  removeHalf: PropTypes.func.isRequired,
  addTime: PropTypes.func.isRequired
}

export default Lifelines
