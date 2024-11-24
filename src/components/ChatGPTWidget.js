// ChatGPTWidget.js
import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { initializeSession, sendMessage } from '../api/apiService';

const ChatGPTWidget = ({ onProgress = () => {}, sessionData }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState({
    topic: '',
    members: '',
    goal: '',
    history: []
  });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (sessionData) {
      setContext(prev => ({
        ...prev,
        topic: sessionData.topic,
        members: sessionData.members,
        goal: sessionData.goal
      }));
      startSession();
    }
  }, [sessionData]);

  const simulateTyping = async () => {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
  };

  const startSession = async () => {
    setIsTyping(true);
    try {
      const data = await initializeSession(sessionData);
      await simulateTyping();

      const assistantMessage = { role: 'assistant', content: data.response };
      setMessages(prev => [...prev, assistantMessage]);
      setContext(prev => ({
        ...prev,
        history: [...prev.history, ['assistant', data.response]]
      }));

      onProgress(10);
    } catch (error) {
      console.error('Error starting session:', error);
      const fallbackMessage = "Welcome! Let's begin our brainstorming session.";
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: fallbackMessage
      }]);
      setContext(prev => ({
        ...prev,
        history: [...prev.history, ['assistant', fallbackMessage]]
      }));
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setContext(prev => ({
      ...prev,
      history: [...prev.history, ['user', inputMessage]]
    }));
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const data = await sendMessage(inputMessage, context);
      await simulateTyping();

      const assistantMessage = { role: 'assistant', content: data.response };
      setMessages(prev => [...prev, assistantMessage]);
      setContext(prev => ({
        ...prev,
        history: [...prev.history, ['assistant', data.response]]
      }));

      onProgress(prev => Math.min(prev + 10, 100));
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = 'Sorry, I encountered an error processing your request.';
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: errorMessage
      }]);
      setContext(prev => ({
        ...prev,
        history: [...prev.history, ['assistant', errorMessage]]
      }));
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 h-[calc(100vh-300px)] flex flex-col">
      <div className="flex-grow overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              message.role === 'user'
                ? 'bg-blue-600/30 ml-8'
                : 'bg-slate-700/50 mr-8'
            }`}
          >
            <div className="text-sm text-blue-200 mb-1">
              {message.role === 'user' ? 'You' : 'Assistant'}
            </div>
            <div className="text-white whitespace-pre-wrap">{message.content}</div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center space-x-2 p-4 bg-slate-700/50 mr-8 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

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
    </div>
  );
};

export default ChatGPTWidget;