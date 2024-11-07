import React from 'react';
import '../styles/chat-bot-start.css';

const ChatBotStart = ({handleStartChat}) => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="start-page">
      <button className="start-page-btn" onClick={handleStartChat}>Chat AI</button>
      <footer>© {currentYear} | Built by <a href={import.meta.env.VITE_IAN_POLLACK_WEBSITE_URL} target="_blank">Ian Pollack</a></footer>
    </div>
  );
};

export default ChatBotStart;