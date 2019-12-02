/**
 * Questions model
 * - currently loads questions from a JSON file
 */

const _ = require('lodash')
const questions = require('../data/questions.json')
const questionsNoAnswers = [...questions]
// questionsNoAnswers.forEach(question => delete question.correct)


/**
 * Get n questions
 * @param {num} num Number of questions
 * @returns [object] Questions
 */
const getQuestions = num => {
  // TODO: optimize; no need to shuffle ALL questions..!
  for (let question of questionsNoAnswers) {
    question.answers = _.shuffle(question.answers)
  }

  return _.shuffle(questionsNoAnswers).splice(0, num)
}

/**
 * Validate a question
 * @param {num} question Question ID
 * @param {string} answer  Answet string
 * @returns {string} Result; correct or incorrect
 */
const checkAnswer = (question, answer) => {
  const questionExists = (question && questions[question])

  if (!questionExists) return 'question does not exist!'

  const correctAnswer = questions[question].correct
  const result = (correctAnswer === answer)
  const message = (result) ? 'Correct answer!' : question + ' is not "' + answer + '"..!'
  return message
}

/**
 * Get two valid alternativesfor a question
 * @param {num} question Question 1D
 * @returns [object] Valid alternatives 
 */
const getAlternatives = question => {
  let answers = questions[question].answers
  let correctAnswer = questions[question].correct
  let filtered = answers.filter(answer => answer !== correctAnswer)
  let item = filtered[Math.floor(Math.random() * filtered.length)] // select a random item
  let alternatives = _.shuffle([item, correctAnswer])
  return alternatives
}

module.exports = { getQuestions, checkAnswer, getAlternatives }
