import React, { useState, useEffect } from "react"
import API from '../services/api.js'
import Button from './button.js'
import QuestionCard from './questionCard.js'
import ProgressTimer from './progresstimer.js'
import LifeLines from './Lifelines.js'
import ScoreBoard from './ScoreBoard.js'
import * as Config from '../config.js'
import TimerService from '../services/timer.js'
import Debug from './Debug.js'
const timer = new TimerService()

// debug
console.log('Using timer:', timer)
console.log('Using config:', Config)

/**
 * Quiz component
 */
const Quiz = props => {
  const [isStarted, setQuizStarted] = useState(false)
  const [questions, setQuestions] = useState([])
  const [answeredQuestions, setAnsweredQuestions] = useState(0)
  const [correctAnwers, setCorrectAnswers] = useState(0)
  const [currentQuestionID, setCurrentQuestionID] = useState(0)
  const [timerTime, setTimerTime] = useState(0)

  // get quiz questions from API backend on component init
  useEffect(() => API.getQuestions().then(setQuestions), [])

  // // // setup timer stuff
  // timer.watchEffect(time => {
  //   console.log('TIMER affect;', time)
  //   setTimerTime(time)
  // })

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

    getNextQuestion()

    // set state depending on result
    return correctResult
  }

  const getNextQuestion = () => {
    setTimeout(() => {
      // increment number of answered questions, triggering update to show next question
      // TODO: show score scren after last question
      setCurrentQuestionID(currentQuestionID + 1)
      // re-start the timer...
      timer.restart()
    }, 1000)
  }

  let getQuestion = questionData => {
    // setCurrQuestion(questionData)
    let { id, question, answers } = questionData
    console.log('Question data:', questionData)
    return <QuestionCard question={question} answers={answers} key={id} id={id} sendAnswer={handleSendAnswer} />
  }

  // loop through questions as gam progresses...
  let currentQuestion = id => {
    if (!questions) return <p>loading questions...</p>
    if (id === 'undefined' || !questions[id]) return <p>No question ID specified...</p>
    if (id !== currentQuestionID) return false

    if (currentQuestionID !== id) {
      return setCurrentQuestionID(id)
    }

    return getQuestion(questions[id])
  }

  const newQuestionRender = data => {
    console.log('Render w/ data:', data)
  }

  // lifelines
  const lifelineExtratime = () => timer.addTime(10 * 1000)

  // life-line remove 50% of incorrect answers
  const lifelineRemovehalf = async () => {
    let result = await API.getValidAlternatives(currentQuestionID)

    questions[currentQuestionID].answers = result // ['herp', 'derp']

    // trigger update
    setCurrentQuestionID(setCurrentQuestionID)
  }

  // // hax
  setInterval(() => {
    setTimerTime(timer.getTimeLeft())
  }, 1000 / 60)

  const timerEnd = () => {
    console.log('Timer ended!')
    // get next question
    // setCurrentQuestionID(currentQuestionID + 1)
  }

  let output = (!isStarted) ?
    <div className="quiz container animated fadeIn">
      <h1>Quiz time!</h1>
      <p className="lead">This quiz will test your general knowledge in a variety of subjects! You have 15 seconds to answer each question, with 2 life-lines. Best of luck!</p>
      <Button onClick={startQuiz} text="Start quiz!" className="success" />
    </div> :
    <div>
      <Debug data={timer.getCurrent()} />
      <ScoreBoard score={correctAnwers} answers={answeredQuestions} />
      <ProgressTimer progress={timerTime} endCallback={timerEnd} />
      <LifeLines removeHalf={lifelineRemovehalf} addTime={lifelineExtratime} />
      {currentQuestion(currentQuestionID)}
      <Button id="resetButton" onClick={resetQuiz} text="Reset game" />
    </div>

  return (
    <div className="quiz">
      {output}
    </div>
  )
}

export default Quiz
