import { shallow, mount, render } from 'enzyme'
import React from 'react'
import Button from '../components/Button.js'

describe('Button component', () => {

  it('Renders without crashing', () => {
    shallow(<Button />)
  })

  it('Supports custom click events callbacks', () => {
    const mockCallBack = jest.fn()
    const button = shallow((<Button onClick={mockCallBack}>Ok!</Button>));
    button.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  })

})
