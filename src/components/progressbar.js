import React from 'react'

const Progressbar = props => {
  const { progress, text } = props

  return (
    <div className="progressbar">
      <div className="inner" style={{ width: progress + '%' }}>
        <p>{text}</p>
      </div>
    </div >
  )
}

export default Progressbar
