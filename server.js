const express = require('express')
const path = require('path')
const cors = require('cors')
const debug = require('debug')('app')
const app = express()
const _ = require('lodash')
const config = { port: 4244 }
const answers = require('./data/questions.json')

// allow CORS
app.use(cors())

// serve static files
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'src')))

// output questions data
app.get('/data', async (req, res, next) => {
  // TODO: randomize answers, etc...
  res.send(answers)
})

// serve index.html to all other GET requests
app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// start server
app.listen(config.port, () => debug('Server runining @ port ' + config.port))
