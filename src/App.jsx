import React, { useState } from 'react';
import ChatBotStart from './components/chat-bot-start';
import ChatBotApp from './components/chat-bot-app';

const App = () => {
  const [isChatting, setIsChatting] = useState(false);

  const handleChatButton = () => {
    setIsChatting(!isChatting);
  };

  return (
    <div className="container">
      {isChatting ? (
        <ChatBotApp handleChatButton={handleChatButton} />
      ) : (
        <ChatBotStart handleChatButton={handleChatButton} />
      )}
    </div>
  );
};

export default App;