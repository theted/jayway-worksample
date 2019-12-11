import React, { useState } from 'react'
import Button from './Button.js'

const useForceUpdate = () => {
  const [value, setValue] = useState(0)
  return () => setValue(value => ++value)
}

const QuestionCard = props => {
  const { id, question, answers, sendAnswer } = props
  const forceUpdate = useForceUpdate()
  const [answ, setAnws] = useState([])
  const [isClicked, setClicked] = useState(false)

  // submit answer to backend, handle response
  const handleSendAnswer = async event => {
    const answer = event.target.innerHTML

    // TODO: temporarily disable button?
    console.log('CLICKY::', id, answer)

    setClicked(true)

    // ... bit hack:y..!
    setTimeout(() => {
      console.log('RESET click!')
      setClicked(false)
    }, 3000) // <- ! very hack:y!!

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
        <Button className={answ[answer] || 'answer'} onClick={handleSendAnswer} key={answer} text={answer} disabled={isClicked} />
      )}
    </div>
  )
}

export default QuestionCard
