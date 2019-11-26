import React, { useState, useEffect } from "react"
import API from '../services/api.js'

const Quiz = props => {
  const [questions, setQuestions] = useState();
  let { className, hidden } = props
  className = 'Quiz ' + className

  useEffect(() => API.getQuestions().then(setQuestions), [])

  let questionsList = (questions) ? questions.map(({ id, question, answers }) => {
    return <div key={id} className="question">{question}</div>
  }) : '<p>loading questions...</p>'

  return (
    <div className={className}>{questionsList}</div>
  )
}

export default Quiz
