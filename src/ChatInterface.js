// src/components/ChatInterface.js
import React, { useState } from "react";

const ChatInterface = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);


  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the function to send the inputText to the backend (GPT-3) for processing.
    // Add the user message to the state.
    setMessages([...messages, { text: inputText, type: "user" }]);
    setInputText("");
  };
  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message.type === "user" ? "bg-blue-300" : "bg-green-300"
            } p-2 m-2 rounded-md`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <center>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          className="flex-grow p-2 rounded-md"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded-md"
        >
          Send
        </button>
      </form>
      </center>
      
      {/* Add the search bar */}
    </div>
  );
};

export default ChatInterface;
