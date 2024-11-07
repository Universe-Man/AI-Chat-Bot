import React from 'react';
import '../styles/chat-bot-start.css';
import config from '../../config.json';

const ChatBotStart = ({handleStartChat}) => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="start-page">
      <button className="start-page-btn" onClick={handleStartChat}>Chat AI</button>
      <footer>© {currentYear} | Built by <a href={config.IAN_POLLACK_WEBSITE_URL} target="_blank">Ian Pollack</a></footer>
    </div>
  );
};

export default ChatBotStart;