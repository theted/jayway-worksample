import React, { useState, useEffect } from "react"
import API from '../services/api.js'
import Button from './button.js'
import QuestionCard from './questionCard.js'
import TimerService from '../services/timer.js'
import ProgressTimer from './progresstimer.js'
import LifeLines from './Lifelines.js'
import ScoreBoard from './ScoreBoard.js'
import Notificatios from './Notifications.js'
import config, * as Config from '../config.js'
// import Timer from "./timer.js"
import Timer from '../services/timer.js'
import Debug from './Debug.js'
const timer = new Timer()

// debug
console.log('Using timer:', timer)
// console.log('Using config:', Config)

const Quiz = props => {
  const [isStarted, setQuizStarted] = useState(true)
  const [questions, setQuestions] = useState([])
  const [answeredQuestions, setAnsweredQuestions] = useState(0)
  const [correctAnwers, setCorrectAnswers] = useState(0)
  const [currentQustionId, setCurrentQuestionId] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(10 * 1000)
  const [currentQuestionID, setCurrentQuestionID] = useState(0)

  // get quiz questions from API backend on component init
  useEffect(() => API.getQuestions().then(setQuestions), [])

  // setup timer stuff
  timer.watchEffect(time => {
    console.log('TIMER affect;', time)
  })

  const startQuiz = () => {
    setQuizStarted(true)
    timer.start()
  }

  const resetQuiz = () => {
    // TODO: re-fetch questions?
    setQuizStarted(0)
    setAnsweredQuestions(0)
    setCorrectAnswers(0)
    timer.reset()
  }

  // submit user anser to API
  const handleSendAnswer = async (question, answer) => {

    // pause the timer first
    timer.pause()

    let result = await API.sendAnwer(question, answer)
    let correctResult = (result === 'Correct answer!')

    // update score
    setAnsweredQuestions(answeredQuestions + 1)
    if (correctResult) setCorrectAnswers(correctAnwers + 1)

    // increment number of answered questions, triggering update to show next question
    setCurrentQuestionID(currentQuestionID + 1)

    // re-start the timer...
    timer.restart()

    // set state depending on result
    return correctResult
  }

  let getQuestion = questionData => {
    let { id, question, answers } = questionData
    return <QuestionCard question={question} answers={answers} key={id} id={id} sendAnswer={handleSendAnswer} />
  }

  // loop through questions as gam progresses...
  let currentQuestion = id => {
    if (!questions) return <p>loading questions...</p>
    if (id == 'undefined' || !questions[id]) return <p>No question ID specified...</p>
    return getQuestion(questions[id])
  }

  let output = (!isStarted) ?
    <div>
      <h1>Quiz time!</h1>
      <p className="lead">This quiz will test your general knowledge! You have 10 seconds to answer each question, with 2 life-lines. Best of luck!</p>
      <Button onClick={startQuiz} text="Start quiz!" className="success" />
    </div> :
    <div>
      <Debug data={timer.getCurrent()} />
      <ScoreBoard score={correctAnwers} answers={answeredQuestions} />
      <ProgressTimer progress={timeRemaining} />
      <Notificatios message="Waiting for notes..." />
      <LifeLines />
      {currentQuestion(currentQuestionID)}
      <Button onClick={resetQuiz} text="Reset game" />
    </div>


  return (
    <div className="quiz">
      {output}
    </div>
  )
}

export default Quiz
