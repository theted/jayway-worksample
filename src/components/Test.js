import React from "react"

/**
 * Issa test component
 */
const Test = props => {
  let { text } = props

  return (
    <div className="Test">
      <p>Text: {text}</p>
    </div >
  )
}

export default Test
