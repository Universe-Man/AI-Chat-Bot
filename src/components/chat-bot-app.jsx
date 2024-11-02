import React from 'react'
import '../styles/chat-bot-app.css'

const ChatBotApp = () => {
  return (
    <div className="chat-app">
      <div className="chat-list">
        <div className="chat-list-header">
          <h2>Chat List</h2>
          <i className="bx bx-edit-alt new-chat"></i>
        </div>
        <div className="chat-list-item active">
          <h4>Chat October 31st, 2024 06:34 PM</h4>
          <i className="bx bx-x-circle"></i>
        </div>
        <div className="chat-list-item">
          <h4>Chat October 31st, 2024 06:34 PM</h4>
          <i className="bx bx-x-circle"></i>
        </div>
        <div className="chat-list-item">
          <h4>Chat October 31st, 2024 06:34 PM</h4>
          <i className="bx bx-x-circle"></i>
        </div>
      </div>
      <div className="chat-window">
        <div className="chat-title">
          <h3>Chat with AI</h3>
          <i className="bx bx-arrow-back arrow"></i>
        </div>
        <div className="chat">
          <div className="prompt">
            Hi, how are you?
            <span> 12:59 PM</span>
          </div>
          <div className="response">
            Hello! I'm a computer program, so I don't have feelings, but I'm here and ready to assist you. How can I help you today?
            <span> 12:59 PM</span>
          </div>
          <div className="typing">Typing...</div>
          <form className="msg-form" action="">
            <i className="fa-solid fa-face-smile emoji"></i>
            <input type="text" className="msg-input" placeholder="Type a message..." />
            <i className="fa-solid fa-paper-plane"></i>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChatBotApp