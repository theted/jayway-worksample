/**
 * API bindings
 */

import axios from 'axios'
import config from '../config.js'

const apiRequest = async (path, data) => {
  const method = (data) ? 'post' : 'get'
  const result = await axios[method](config.endpoint + path, data)
  return result.data
}

const getQuestions = async () => apiRequest('questions')
const sendAnwer = async (question, answer) => apiRequest('answer', { question, answer })
const getValidAlternatives = async (question) => apiRequest('validAlternatives', { question })

export { getQuestions, sendAnwer, getValidAlternatives }
export default { getQuestions, sendAnwer, getValidAlternatives }
