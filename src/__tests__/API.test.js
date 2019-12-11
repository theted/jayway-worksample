import axios from 'axios'
import { endpoint } from '../config.js'

const get = async (method) => await axios.get(endpoint + method)
const post = async (method, data) => await axios.post(endpoint + method, data)

describe('Questions API backend', () => {
  it('Serves questions without crashing', async done => {
    const res = await get('questions')
    expect(res.status).toBe(200)
    done()
  })

  it('Response contains exactly 10 questions', async done => {
    const res = await get('questions')
    expect(res.data.length).toBe(10)
    done()
  })

  it('Returns valid question data for every question', async done => {
    const res = await get('questions')

    res.data.forEach(question => {
      expect(typeof question.id).toBe('number')
      expect(typeof question.question).toBe('string')
      expect(Array.isArray(question.answers)).toBe(true)
    })

    done()
  })

  it('Does not send answers to clients', async done => {
    const res = await get('questions')

    res.data.forEach(question => {
      expect(typeof question.correct).toBe('undefined')
    })

    done()
  })

  it('Handles correct answers', async done => {
    const res = await post('answer', {
      question: 0, answer: 'Greenland'
    })
    expect(res.data).toBe('Correct answer!')
    done()
  })

  it('Handles incorrect answers', async done => {
    const res = await post('answer', {
      question: 0, answer: 'Gotland'
    })
    expect(res.data).toBe('Incorrect answer!')
    done()
  })
})
