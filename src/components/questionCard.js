import React from "react"

const QuestionCard = props => {
  let { id, question, answers, sendAnswer } = props

  const handleSendAnswer = async event => {
    let answer = event.target.innerHTML
    return sendAnswer(id, answer)
  }

  return (
    <div className="question">
      <h3>{question}</h3>

      {answers.map(answer =>
        <div className="answer" onClick={handleSendAnswer} key={answer}>{answer}</div>
      )}

    </div>
  )
}

export default QuestionCard
