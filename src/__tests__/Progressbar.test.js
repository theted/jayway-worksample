import { shallow, mount, render } from 'enzyme'
import React from 'react'
import Progressbar from '../components/progressbar.js'

describe('Progressbar', () => {

  it('Renders without crashing', () => {
    shallow(<Progressbar />)
  })

  it('Handles progress property', () => {
    shallow(<Progressbar progress="33" />)
  })

})
