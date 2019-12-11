import React from 'react'
import PropTypes from 'prop-types'

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

Progressbar.propTypes = {
  progress: PropTypes.number,
  text: PropTypes.string
}

export default Progressbar
