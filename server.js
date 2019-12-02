const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const debug = require('debug')('app')
const app = express()
const _ = require('lodash')
const config = require('./config')
const questions = require('./data/questions.json')
const questionsNoAnswers = [...questions]
// questionsNoAnswers.forEach(question => delete question.correct)
const questionsModel = require('./models/questions.js')

// allow CORS
app.use(cors())

// handle POST requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// serve static files
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'src')))

// output questions data - randomized order for each request
app.get('/questions', async (req, res, next) => {
  res.send(questionsModel.getQuestions(config.maxQuestions))
})

// POST quiz results
app.post('/answer', (req, res, next) => {
  const { question, answer } = req.body
  const questionResult = questionsModel.checkAnswer(question, answer)
  res.send(questionResult)
})

// get 2 valid options for a given question
// TODO: avoid exploit by limiting access to this method through sessions!
app.post('/validAlternatives', (req, res, next) => {
  let { question } = req.body
  let alternatives = questionsModel.getAlternatives(question)
  res.send(alternatives)
})

// serve index.html to all other GET requests
app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


// start server
app.listen(config.port, () => debug('Server runining @ port ' + config.port))
