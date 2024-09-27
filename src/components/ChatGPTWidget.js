import React, { useState } from 'react';
import axios from 'axios';

const ChatGPTWidget = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/chat', { message: userMessage });
      setChatResponse(response.data);
    } catch (error) {
      console.error('Error interacting with ChatGPT:', error);
    }
  };

  return (
    <div>
      <h2>Chat with BrainBolt Assistant</h2>
      <input
        type="text"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
      />
      <button onClick={handleSubmit}>Send</button>
      {chatResponse && <p>{chatResponse}</p>}
    </div>
  );
};

export default ChatGPTWidget;
