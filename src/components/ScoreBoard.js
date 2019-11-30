import React from "react"

const ScoreBoard = props => {
  const { answers, score } = props
  const incorrectAnswers = answers - score
  const percentageWin = (score) ? Math.round((score / answers) * 100) : '0'

  return (
    <div className="ScoreBoard">
      <p>{answers} answers</p>
      <p>{score} correct answers</p>
      <p>{incorrectAnswers} incorrect answers</p>
      <p>Percentage win: {percentageWin} %</p>
    </div>
  )
}

export default ScoreBoard
