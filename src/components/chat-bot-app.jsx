import React, { useState, useEffect, useRef } from 'react';
import '../styles/chat-bot-app.css';
import config from '../../config.json';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

const ChatBotApp = ({handleGoBack, chats, setChats, activeChat, setActiveChat, createNewChat}) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState(chats[0]?.messages || []);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showChatList, setShowChatList] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const activeChatObj = chats.find((chat) => chat.id === activeChat)
    setMessages(activeChatObj ? activeChatObj.messages : [])
  }, [activeChat, chats]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages]);

  useEffect(() => {
    if (activeChat) {
      const storedMessages = JSON.parse(localStorage.getItem(activeChat)) || [];
      setMessages(storedMessages);
    };
  }, [activeChat]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEmojiSelect = (emoji) => {
    setInputValue((prevInput) => prevInput + emoji.native)
  };

  const sendMessage = async () => {
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
      localStorage.setItem(activeChat, JSON.stringify(updatedMessages));
      setInputValue("");
      const updatedChats = chats.map((chat) => {
        if (chat.id === activeChat) {
          return {...chat, messages: updatedMessages};
        };
        return chat;
      });
      setChats(updatedChats);
      localStorage.setItem("chats", JSON.stringify(updatedChats));
      setIsTyping(true);
      const response = await fetch(config.OPEN_AI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${config.OPEN_AI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{role: "user", content: inputValue}],
          max_tokens: 500,
        }),
      });

      const data = await response.json();
      const chatResponse = data.choices[0].message.content.trim();

      const newResponse = {
        type: "response",
        text: chatResponse,
        timestamp: new Date().toLocaleTimeString(),
      };
      const updatedMessagesWithResponse = [...updatedMessages, newResponse];
      setMessages(updatedMessagesWithResponse);
      localStorage.setItem(activeChat, JSON.stringify(updatedMessagesWithResponse));
      setIsTyping(false);
      const updatedChatsWithResponse = chats.map((chat) => {
        if (chat.id === activeChat) {
          return { ...chat, messages: updatedMessagesWithResponse }
        };
        return chat;
      });
      setChats(updatedChatsWithResponse);
      localStorage.setItem("chats", JSON.stringify(updatedChatsWithResponse));
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
    localStorage.setItem("chats", JSON.stringify(updatedChats));
    localStorage.removeItem(id);
    if (id === activeChat) {
      const newActiveChat = updatedChats.length > 0 ? updatedChats[0].id : null;
      setActiveChat(newActiveChat);
    };
  };

  return (
    <div className="chat-app">
      <div className={`chat-list ${showChatList && "show"}`}>
        <div className="chat-list-header">
          <h2>Chat List</h2>
          <i className="bx bx-edit-alt new-chat" onClick={() => createNewChat()}></i>
          <i className="bx bx-x-circle close-list" onClick={() => setShowChatList(false)}></i>
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
          <i className="bx bx-menu" onClick={() => setShowChatList(true)}></i>
          <i className="bx bx-arrow-back arrow" onClick={handleGoBack}></i>
        </div>
        <div className="chat">
          {messages.map((msg, index) => (
            <div key={index} className={msg.type === "prompt" ? "prompt" : "response"}>
              {msg.text} <span>{msg.timestamp}</span>
            </div>
          ))}
          <div className="msg-form-wrapper">
            {isTyping && <div className="typing">Typing...</div>}
            <div ref={chatEndRef} />
            <form className="msg-form" action="" onSubmit={handleFormSubmit}>
              <i className="fa-solid fa-face-smile emoji" onClick={(e) => {
                e.stopPropagation();
                setShowEmojis((prev) => !prev);
              }}></i>
              {showEmojis && (
                <div className="emoji-picker">
                  <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" onClickOutside={() => setShowEmojis(false)} />
                </div>
              )}
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
    </div>
  );
};

export default ChatBotApp;