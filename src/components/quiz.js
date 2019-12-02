import React, { useState, useEffect } from "react"
import API from '../services/api.js'
import Button from './Button.js'
import QuestionCard from './questionCard.js'
import ProgressTimer from './progresstimer.js'
import LifeLines from './Lifelines.js'
import ScoreBoard from './ScoreBoard.js'
import * as Config from '../config.js'
import TimerService from '../services/timer.js'
const timer = new TimerService(Config.maxAnswerTime)

/**
 * Quiz component
 */
const Quiz = props => {
  const [isStarted, setQuizStarted] = useState(false)
  const [questions, setQuestions] = useState([])
  const [answeredQuestions, setAnsweredQuestions] = useState(0)
  const [correctAnwers, setCorrectAnswers] = useState(0)
  const [currentQuestionID, setCurrentQuestionID] = useState(0)
  const [temp, setTemp] = useState(0)
  const [timerTime, setTimerTime] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [gameEnded, setgameEnded] = useState(false)
  const [currQuestion, setCurrQuestion] = useState({})

  const updateQuestions = async () => {
    return API.getQuestions().then(questions => {
      setQuestions(questions)
      setTotalQuestions(questions.length)
    })
  }

  // get quiz questions from API backend on component init
  useEffect(() => updateQuestions(), [])

  // // setup timer stuff
  timer.watchEffect(time => {
    console.log('TIMER affect;', time)
    // setTimerTime(time)
  })

  const startQuiz = () => {
    setgameEnded(false)
    setQuizStarted(true)
    timer.start()
  }

  const resetQuiz = () => {
    setQuizStarted(0)
    setAnsweredQuestions(0)
    setCorrectAnswers(0)
    timer.reset()

    // get new questions!
    updateQuestions().then(() => {
      setCurrentQuestionID(0)
      startQuiz()
    })

  }

  // submit user anser to API
  const handleSendAnswer = async (questionID, answer) => {

    // pause the timer first
    timer.pause()

    let result = await API.sendAnwer(questionID, answer)
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
      if (answeredQuestions + 1 === totalQuestions) {
        timer.reset()
        setgameEnded(true)
      } else {
        // increment number of answered questions, triggering update to show next question
        setCurrentQuestionID(currentQuestionID + 1)
        timer.restart()
      }
    }, 1000)
  }

  // TODO: fix this function being called unneccesarily!
  let getQuestion = questionData => {
    let { id, question, answers } = questionData
    return <QuestionCard question={question} answers={answers} key={id} id={id} sendAnswer={handleSendAnswer} />
  }

  // loop through questions as gam progresses...
  let currentQuestion = id => {
    // TODO: fix timout on last question issue...
    if (!questions) return <p>loading questions...</p>
    if (id === 'undefined' || !questions[id]) return <p>No question ID specified...</p>
    if (id !== currentQuestionID) return false
    if (gameEnded) return false

    if (currentQuestionID !== id) {
      return setCurrentQuestionID(id)
    }

    if (questions[id].id !== temp) {
      setTemp(questions[id].id)
    }

    return getQuestion(questions[id])
  }

  // lifeline - add extra time to timer
  const lifelineExtratime = () => timer.addTime(10 * 1000)

  // life-line remove 50% of incorrect answers
  const lifelineRemovehalf = async () => {
    let result = await API.getValidAlternatives(temp)
    questions[currentQuestionID].answers = result
    setCurrentQuestionID(currentQuestionID) // trigger update
  }

  // ! hax
  let timerUpdateInterval = setInterval(() => setTimerTime(timer.getTimeLeft()), 1000)

  const timerEnd = () => {
    // TODO: set some output message
    timer.reset()
    timer.pause()
    // setTimeout(() => timer.reset(), 1000)
    getNextQuestion()
  }

  let quizMessage = 'This quiz will test your general knowledge in a variety of subjects - totally ' + totalQuestions + ' questions.  You have ' + (Config.maxAnswerTime / 1000) + ' seconds to answer each question, with 2 life-lines. Best of luck!'

  let mainContent = (gameEnded) ?
    <div>
      <ScoreBoard score={correctAnwers} answers={answeredQuestions} />
      <Button id="resetButton" onClick={resetQuiz} text="New game" />
    </div> : <div>
      <ProgressTimer progress={timerTime} endCallback={timerEnd} />
      <LifeLines removeHalf={lifelineRemovehalf} addTime={lifelineExtratime} />
      {currentQuestion(currentQuestionID)}
    </div>

  let output = (!isStarted) ?
    <div className="quiz container animated fadeIn">
      <h1>Quiz time!</h1>
      <p className="lead">{quizMessage}</p>
      <Button onClick={startQuiz} text="Start quiz!" className="success" />
    </div> :
    <div>
      {mainContent}
    </div>

  return (
    <div className="quiz">
      {output}
    </div>
  )
}

export default Quiz
