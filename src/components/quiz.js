import React, { useState, useEffect } from "react"
import API from '../services/api.js'
import Button from './button.js'
import Progressbar from './progressbar.js'
import QuestionCard from './questionCard.js'
import Timer from './timer.js'
import * as Config from '../config.js'

console.log(Config)

const Quiz = props => {
  const [isStarted, setQuizStarted] = useState(false)
  const [questions, setQuestions] = useState([])
  const startQuiz = () => setQuizStarted(true)

  // get quiz questions from API backend on component init
  useEffect(() => API.getQuestions().then(setQuestions), [])

  // submit user anser to API
  const handleSendAnswer = async (question, answer) => {
    let result = await API.sendAnwer(question, answer)
    let correctResult = (result === 'Correct answer!')
    if (correctResult) alert('Was correct!')
  }

  // ? Lists _all questions, which is of course not intended.
  let questionsList = (questions) ? questions.map(({ id, question, answers }) =>
    <QuestionCard question={question} answers={answers} key={id} id={id} sendAnswer={handleSendAnswer} />
  ) : <p>Waiting for questions...</p>

  let output = (!isStarted) ?
    <div>
      <h1>Quiz time!</h1>
      <p>Start quiz</p>
      <Button onClick={startQuiz} text="Start quiz!" className="success" />
    </div> :

    <div>
      <Timer />
      <Progressbar />
      {questionsList}
    </div>

  return (
    <div className="quiz">
      {output}
    </div>
  )
}

export default Quiz
