import React from 'react'

const ChatBotApp = () => {
  return (
    <div className="chat-app">
      <div className="chat-list">
        <div className="chat-list-header">
          <h2>Chat List</h2>
          <i className="bx bx-edit-alt new-chat"></i>
        </div>
        <div className="chat-list-item">
          <h4>Chat October 31st, 2024 06:34 PM</h4>
          <i className="bx bx-x circle"></i>
        </div>
        <div className="chat-list-item">
          <h4>Chat October 31st, 2024 06:34 PM</h4>
          <i className="bx bx-x circle"></i>
        </div>
        <div className="chat-list-item">
          <h4>Chat October 31st, 2024 06:34 PM</h4>
          <i className="bx bx-x circle"></i>
        </div>
      </div>
      <div className="chat-window">
        <div className="chat-title">
          <h3>Chat with AI</h3>
          <i className="bx-bx-arrow-back arrow"></i>
        </div>
      </div>
    </div>
  )
}

export default ChatBotApp