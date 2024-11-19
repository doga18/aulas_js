import './Message.css'

import React from 'react'

// Wait for a msg and type of that.
const Message = ({msg, type}) => {
  return (
    <div className={`message ${type}`}>
      <p>{msg}</p>
    </div>
  )
}

export default Message