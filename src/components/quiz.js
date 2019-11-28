import React, { useState, useEffect } from "react"
import API from '../services/api.js'
import Button from './button.js'
import QuestionCard from './questionCard.js'
import TimerService from '../services/timer.js'
import ProgressTimer from './progresstimer.js'
import LifeLines from './Lifelines.js'
import ScoreBoard from './ScoreBoard.js'
import config, * as Config from '../config.js'
import Timer from "./timer.js"
// import Timer from '../services/timer.js'
// const timer = new Timer()
// console.log('Using timer:', timer)

console.log('Using config:', Config)

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

  const startQuiz = () => {
    setQuizStarted(true)
    // timer.start()
  }

  const resetQuiz = () => {
    setAnsweredQuestions(0)
    setCorrectAnswers(0)
  }

  // submit user anser to API
  const handleSendAnswer = async (question, answer) => {
    console.log('Send answer...', { question, answer })

    // pause the timer first
    // we can do theeese


    let result = await API.sendAnwer(question, answer)
    let correctResult = (result === 'Correct answer!')
    console.log((correctResult) ? 'Correct!' : 'Incorrect guess!')

    // update score
    setAnsweredQuestions(answeredQuestions + 1)
    if (correctResult) setCorrectAnswers(correctAnwers + 1)

    // set state depending on result
    return correctResult
  }

  // ? Lists _all questions, which is of course not intended.
  // <th value={column} onClick={() => this.handleSort(column)}>{column}</th>

  // reset the game
  const doReset = () => {
    console.log('We reset teh game!')
    setQuizStarted(false)
  }


  let questionsList = (questions) ? questions.map(({ id, question, answers }) =>
    <QuestionCard question={question} answers={answers} key={id} id={id} sendAnswer={handleSendAnswer} />
  ) : <p>Waiting for questions...</p>


  // let currQuestion = questions[currentQuestionID]
  // let firstQuestionUI = <QuestionCard question={currQuestion.question} />
  let currentQuestion = <p>This is the initial question...</p>

  let output = (!isStarted) ?
    <div>
      <h1>Quiz time!</h1>
      <p className="lead">This quiz will test your general knowledge! You have 10 seconds to answer each question, with 2 life-lines. Best of luck!</p>
      <Button onClick={startQuiz} text="Start quiz!" className="success" />
    </div> :
    <div>
      <ScoreBoard score={correctAnwers} answers={answeredQuestions} />
      <ProgressTimer progressState={timeRemaining} />
      <LifeLines />
      <Timer />
      {currentQuestion} !!!
      {questionsList}
      <Button onClick={doReset} text="Reset game" />
    </div>

  return (
    <div className="quiz">
      {output}
    </div>
  )
}

export default Quiz
