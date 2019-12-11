import { shallow, mount, render } from 'enzyme'
import React from 'react'
import Quiz from '../components/quiz.js'

describe('Quiz component', () => {
  it('Renders without crashing', () => {
    shallow(<Quiz />)
  })

  it('Renders welcome message', () => {
    const wrapper = shallow(<Quiz />)
    const header = <h1>Quiz time!</h1>
    expect(wrapper.contains(header)).toEqual(true)
    expect(wrapper).toMatchSnapshot()
  })

  // TODO: quiz can be started
})
