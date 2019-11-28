import React from "react"

const ScoreBoard = props => {
  const { answers, score } = props

  return (
    <div className="ScoreBoard">
      <p>{answers} answers</p>
      <p>{score} correct answers</p>
    </div>
  )
}

export default ScoreBoard
