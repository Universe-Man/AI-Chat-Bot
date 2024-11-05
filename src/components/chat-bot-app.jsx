import React, { useState, useEffect } from 'react';
import '../styles/chat-bot-app.css';

const ChatBotApp = ({handleGoBack, chats, setChats, activeChat, setActiveChat, createNewChat}) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState(chats[0]?.messages || []);

  useEffect(() => {
    const activeChatObj = chats.find((chat) => chat.id === activeChat)
    setMessages(activeChatObj ? activeChatObj.messages : [])
  }, [activeChat, chats]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendMessage = () => {
    if (inputValue.trim === "") return;
    const newMessage = {
      type: "prompt",
      text: inputValue,
      timestamp: new Date().toLocaleTimeString(),
    };
    if (!activeChat) {
      createNewChat(inputValue);
      setInputValue("");
    } else {
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setInputValue("");
      const updatedChats = chats.map((chat) => {
        if (chat.id === activeChat) {
          return {...chat, messages: updatedMessages};
        };
        return chat;
      });
      setChats(updatedChats);
    };
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleSelectChat = (id) => {
    setActiveChat(id);
  };

  const handleDeleteChat = (id) => {
    const updatedChats = chats.filter((chat) => chat.id !== id);
    setChats(updatedChats);
    if (id === activeChat) {
      const newActiveChat = updatedChats.length > 0 ? updatedChats[0].id : null;
      setActiveChat(newActiveChat);
    };
  };

  return (
    <div className="chat-app">
      <div className="chat-list">
        <div className="chat-list-header">
          <h2>Chat List</h2>
          <i className="bx bx-edit-alt new-chat" onClick={() => createNewChat()}></i>
        </div>
        {chats.map((chat) => (
          <div key={chat.id} className={`chat-list-item ${chat.id === activeChat ? "active" : ""}`} onClick={() => handleSelectChat(chat.id)}>
            <h4>{chat.title}</h4>
            <i className="bx bx-x-circle" onClick={(e) => {
              e.stopPropagation()
              handleDeleteChat(chat.id)
            }}
            ></i>
          </div>
        ))}
      </div>
      <div className="chat-window">
        <div className="chat-title">
          <h3>Chat with AI</h3>
          <i className="bx bx-arrow-back arrow" onClick={handleGoBack}></i>
        </div>
        <div className="chat">
          {messages.map((msg, index) => (
            <div key={index} className={msg.type === "prompt" ? "prompt" : "response"}>
              {msg.text} <span>{msg.timestamp}</span>
            </div>
          ))}
          <div className="typing">Typing...</div>
          <form className="msg-form" action="" onSubmit={handleFormSubmit}>
            <i className="fa-solid fa-face-smile emoji"></i>
            <input
              type="text"
              className="msg-input"
              placeholder="Type a message..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <i className="fa-solid fa-paper-plane" onClick={sendMessage}></i>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBotApp;