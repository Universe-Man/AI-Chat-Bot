import React from 'react';
import '../styles/chat-bot-start.css';

  const ChatBotStart = ({handleChatButton}) => {
  return (
    <div className="start-page">
      <button className="start-page-btn" onClick={handleChatButton}>Chat AI</button>
    </div>
  );
};

export default ChatBotStart;