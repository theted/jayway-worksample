import React from "react"

const Progressbar = props => {
  let { progress } = props

  return (
    <div className="progressbar">
      <div className="inner" style={{ width: progress + '%' }}>
        <p>{progress}</p>
      </div>
    </div >
  )
}

export default Progressbar
