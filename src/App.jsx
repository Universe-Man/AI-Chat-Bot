import React, { useState } from 'react';
import ChatBotStart from './components/chat-bot-start';
import ChatBotApp from './components/chat-bot-app';

const App = () => {
  const [isChatting, setIsChatting] = useState(false);
  const [chats, setChats] = useState([]);


  const handleStartChat = () => {
    setIsChatting(true);
    if (chats.length === 0) {
      const newChat = {
        id: `Chat ${new Date().toLocaleDateString("en-US")} ${new Date().toLocaleTimeString()}`,
        messages: [],
      };
      setChats([newChat]);
    }
  };

  const handleGoBack = () => {
    setIsChatting(false);
  };

  return (
    <div className="container">
      {isChatting ? (
        <ChatBotApp handleGoBack={handleGoBack} chats={chats} setChats={setChats} />
      ) : (
        <ChatBotStart handleStartChat={handleStartChat} />
      )}
    </div>
  );
};

export default App;