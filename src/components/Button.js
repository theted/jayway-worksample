import React from 'react'

const Button = props => {
  let { id, onClick, className, disabled, text } = props

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

export default Button
