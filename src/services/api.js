/**
 * API bindings
 */

import axios from "axios"
import config from '../config.js'

const getQuestions = async () => {
  return axios({
    method: 'get',
    url: config.endpoint + 'data'
  }).then(res => res.data).catch(err => console.log(err))
}

export { getQuestions }
export default { getQuestions }
