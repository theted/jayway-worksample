const port = 4244
const defaultEndpoint = 'http://localhost:' + port + '/'
const environment = (window.location.hostname === 'localhost') ? 'development' : 'production'
const endpoint = (environment === 'production') ? 'https://' + window.location.hostname + '/' : defaultEndpoint

// game configuration
const maxQuestions = 10
const maxAnswerTime = 15 * 1000 // in milliseconds

export { endpoint, maxQuestions, maxAnswerTime, port }
export default { endpoint, maxQuestions, maxAnswerTime, port }
