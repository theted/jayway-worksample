import React, { useState } from "react"
import Button from './button.js'

const Lifelines = props => {
  const { removeHalf, addTime } = props
  const [usedLifeLines, setUsedLifelines] = useState([])

  const addTimeCallback = () => {
    console.log('Add time callback..!')
    addTime()
  }

  return (
    <div className="life-lines">
      <Button onClick={addTimeCallback} text="+10s" />
      <Button onClick={removeHalf} text="50/50" />
      {/* hidden={usedLifeLines.indedOf['removeHalf']} */}
      {/* hidden={() => usedLifeLines.indedOf['removeHalf'] > 0} */}
    </div>
  )
}

export default Lifelines
