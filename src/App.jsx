import React, { useState, useEffect } from 'react';
import ChatBotStart from './components/chat-bot-start';
import ChatBotApp from './components/chat-bot-app';
import { v4 as uuid } from 'uuid';

const App = () => {
  const [isChatting, setIsChatting] = useState(false);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem("chats")) || [];
    setChats(storedChats);
    if (storedChats.length > 0) {
      setActiveChat(storedChats[0].id);
    };
  }, []);

  const handleStartChat = () => {
    setIsChatting(true);
    if (chats.length === 0) {
      createNewChat();
    };
  };

  const handleGoBack = () => {
    setIsChatting(false);
  };

  const createNewChat = (initialMessage = "") => {
    const newChat = {
      id: uuid(),
      title: `Chat ${new Date().toLocaleDateString("en-US")} ${new Date().toLocaleTimeString()}`,
      messages: initialMessage ? [{
        type: "prompt",
        text: initialMessage,
        timestamp: new Date().toLocaleTimeString()
      }] : [],
    };
    const updatedChats = [newChat, ...chats];
    setChats(updatedChats);
    localStorage.setItem("chats", JSON.stringify(updatedChats));
    localStorage.setItem(newChat.id, JSON.stringify(newChat.messages));
    setActiveChat(newChat.id);
  };

  return (
    <div className="container">
      {isChatting ? (
        <ChatBotApp
          handleGoBack={handleGoBack}
          chats={chats}
          setChats={setChats}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          createNewChat={createNewChat}
        />
      ) : (
        <ChatBotStart handleStartChat={handleStartChat} />
      )}
    </div>
  );
};

export default App;