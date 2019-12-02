import React, { useState } from "react"

const useForceUpdate = () => {
  const [value, setValue] = useState(0)
  return () => setValue(value => ++value)
}

const QuestionCard = props => {
  let { id, question, answers, sendAnswer } = props
  const forceUpdate = useForceUpdate()
  const [answ, setAnws] = useState([])

  // submit answer to backend, handle response
  const handleSendAnswer = async event => {
    let answer = event.target.innerHTML

    return sendAnswer(id, answer).then(result => {
      answ[answer] = (result) ? 'answer correct' : 'answer incorrect'
      // setAnws([...answ])
      forceUpdate()
    })
  }

  return (
    <div className="question animated zoomIn">
      <h3>{question}</h3>
      {answers.map(answer =>
        <div className={answ[answer] || 'answer'} onClick={handleSendAnswer} key={answer}>{answer}</div>
      )}
    </div>
  )
}

export default QuestionCard
