import React from 'react'
import PropTypes from 'prop-types'

const Button = props => {
  const { id, onClick, className, disabled, text } = props

  return (
    <button
      id={id}
      className={className}
      disabled={disabled}
      onClick={onClick} >
      {text}
    </button>
  )
}

Button.propTypes = {
  id: PropTypes.number,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  text: PropTypes.string
}

export default Button
