import { shallow, mount, render } from 'enzyme'
import React from 'react'
import App from '../App.js'
import Quiz from '../components/quiz.js'

describe('App component', () => {

  it('renders without crashing', () => {
    shallow(<App />)
  })

  it('renders expected content', () => {
    expect(shallow(<App />).contains(<div className="App"><Quiz /></div>)).toBe(true)
  })

  it('Actually works', () => {
    const component = shallow(<App />)
    expect(component.getElements()).toMatchSnapshot()
  })

})
