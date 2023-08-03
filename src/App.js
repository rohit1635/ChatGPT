import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Liked from './Liked.js';
import { LikeProvider } from './LikeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [showChatLog, setShowChatLog] = useState(false);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handlekeyDown = (e) => {
    if(e.key == 'Enter'){
      search();
    }
  };
  const search = async () => {
    const query = searchInput.trim();
    console.log(query)
    const form=new FormData()
    form.append("file",query)
    const re=await axios.post('http://127.0.0.1:8000/post-text', form)
       console.log(re)
    const userMessage = {
      sender: 'User',
      message: query,
    };
    const chatGptMessage = {
      sender: 'Chatgpt',
      message: re.data,
    };
    setChatLog((prevChatLog) => [...prevChatLog, userMessage, chatGptMessage]);
    setSearchInput('');
    setShowChatLog(true);
  };

  const handleCardClick = (content) => {

    setSearchInput(content);

  };

  const handleCopyClick = (message) => {
    try {
      navigator.clipboard.writeText(message).then(() => {
        
      });
    } catch (error) {
      alert('Failed to copy the ChatGPT response to clipboard.');
    }
  };
  return (
    <div className="h-screen chat-container bg-gray-800">
      <div class="px-6 h-24 text-center ">
        <h1 class= "pt-12 pd-2 text-4xl font-bold text-center flex justify-center text-white"> 
        Farzi ChatGPT
        </h1> 
      </div>
      <div class="flex flex-row justify-center">
      <div className="cards-container justify-content pt-28 pl-60" style={{ display: showChatLog ? 'none' : 'block' }}>
        <div className="pl-28 text-white font-bold text-2xl">Examples</div>
        <div className="container flex flex-col items-align-center">
          <div className="card" onClick={() => handleCardClick('Quantum Physics')}>
            <h2>"Quantum Physics"</h2>
          </div>
          <div className="card" onClick={() => handleCardClick('Tell me something about Nuclear bomb')}>
            <h2>"Tell me something about Nuclear bomb"</h2>
          </div>
          <div className="card" onClick={() => handleCardClick('How to make a pull request in javascript')}>
            <h2>"How to make a pull request in javascript"</h2>
          </div>
        </div>
      </div>

      <div className="chat-log" class = "x1">
        {chatLog.map((message, index) => (
           
          <div 
            key={index}
            className={`message ${message.sender.toLowerCase()}`}
            style={{backgroundColor: message.sender.toLowerCase() === 'user' ? 'bg-gray-800' : 'bg-gray-500' }}
          >
            <img
            src={message.sender.toLowerCase() === 'user' ? 'https://img.freepik.com/free-icon/user_318-159711.jpg?w=360' : 'https://static.vecteezy.com/system/resources/previews/021/495/996/original/chatgpt-openai-logo-icon-free-png.png'}
            alt={message.sender}
            className="left-image"
          />
            {/*<span className="sender">{message.s}:</span>*/}
            <span className="message-text">{message.message}</span>
            {message.sender.toLowerCase() === 'chatgpt' && (
              <LikeProvider>
            <Liked />
            <button className="button hover:bg-gray-800" onClick={() => handleCopyClick(message.message)}>
                    <FontAwesomeIcon icon={faCopy} />
             </button>    
            </LikeProvider>
            )}
          </div>
        ))}
      </div>
      </div>
      <div className="search-box" class = "flex justify-center items-center flex-row h-16 w-full absolute bottom-0 pb-4 pl-6 ">
      <div class="relative h-full my-10 buttonsvg pb-12 w-[50vw] flex border-0 border-transparent items-center">
        <input class="w-full p-4 bg-gray-600 rounded-md text-white pr-11 outline-none" placeholder="Send a message"
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          onKeyDown={handlekeyDown}
        />
        <button type='submit' onClick={search} disabled={searchInput.trim()===''} className={`absolute p-2 pr-1 right-2 transition-colors ml-2 p-2 bg-blue-500 text-white rounded-md ${searchInput.trim() === '' ? 'opacity-50 bg-gray-600 cursor-not-allowed' : ''}`}>
                <span class="" >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" class="h-4 w-4 m-1" stroke-width="2">
                    <path d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z" fill="currentColor">
                    </path>
                  </svg>
                </span>
              </button>
        </div>
      </div>   
    </div>
  );
}
export default App;
