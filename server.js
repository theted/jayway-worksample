const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const debug = require('debug')('app')
const app = express()
const _ = require('lodash')
const config = { port: 4244 }
const questions = require('./data/questions.json')
const questionsNoAnswers = questions
questionsNoAnswers.forEach(question => delete question.correct)

console.log('pick Qq\'s:', questionsNoAnswers)

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
  res.send(_.shuffle(questionsNoAnswers))
})

// POST quiz results
app.post('/answer', (req, res, next) => {
  const { question, answer } = req.body
  const questionExists = (question && questions[question])

  if (!questionExists) return res.send('question dos not exist!')

  const correctAnswer = questions[question].correct
  const result = (correctAnswer === answer)
  const message = (result) ? 'Correct answer!' : question + ' is not "' + answer + '"..!'
  res.send(message)
})

// serve index.html to all other GET requests
app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


// start server
app.listen(config.port, () => debug('Server runining @ port ' + config.port))
