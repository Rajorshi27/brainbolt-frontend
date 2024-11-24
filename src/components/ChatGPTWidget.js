import React, { useState } from 'react';
import Button from './Button';

const ChatGPTWidget = ({ onSendMessage }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    setIsLoading(true);
    try {
      await onSendMessage(inputMessage);
      setInputMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Share your ideas..."
        className="flex-grow px-4 py-3 rounded-md bg-white/10 border border-pink-500/30
                  text-white placeholder-white/40 focus:outline-none focus:border-pink-500
                  focus:bg-white/15 transition-all duration-300"
        disabled={isLoading}
      />
      <Button
        type="submit"
        disabled={isLoading}
        variant="primary"
        className="px-6"
      >
        Send
      </Button>
    </form>
  );
};

export default ChatGPTWidget;
