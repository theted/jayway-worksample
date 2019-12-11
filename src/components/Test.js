import React from 'react'
import PropTypes from 'prop-types'

/**
 * Issa test component
 */
const Test = props => {
  const { text } = props

  return (
    <div className="Test">
      <p>Text: {text}</p>
    </div >
  )
}

Test.propTypes = {
  text: PropTypes.string
}

export default Test
