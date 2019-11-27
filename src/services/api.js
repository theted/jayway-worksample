/**
 * API bindings
 */

import axios from "axios"
import config from '../config.js'

const apiRequest = async (path, data) => {
  let method = (data) ? 'post' : 'get'
  let result = await axios[method](config.endpoint + path, data)
  return result.data
}

const getQuestions = async () => apiRequest('questions')
const sendAnwer = async (question, answer) => apiRequest('answer', { question, answer })

export { getQuestions, sendAnwer }
export default { getQuestions, sendAnwer }
