import React, { useState } from "react"
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

export default Lifelines
