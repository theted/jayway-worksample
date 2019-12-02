import React from "react"

const ScoreBoard = props => {
  const { answers, score, timedOutAnswers } = props
  const incorrectAnswers = answers - score
  const percentageWin = (score) ? Math.round((score / answers) * 100) : '0'

  return (
    <div className="container">
      <h2>Score</h2>
      <p>{answers} questions answered</p>
      <p>{timedOutAnswers} questions timed-out</p>
      <p>{score} correct answers</p>
      <p>{incorrectAnswers} incorrect answers</p>
      <p>Percentage correct answers: {percentageWin}%</p>
    </div>
  )
}

export default ScoreBoard
