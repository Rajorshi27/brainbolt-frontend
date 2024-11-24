import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ChatGPTWidget from '../components/ChatGPTWidget';

const API_URL = 'http://127.0.0.1:5000';

const SessionPage = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState('');
  const [progress, setProgress] = useState(0);
  const [sessionData, setSessionData] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('sessionData');
    if (!storedData) {
      navigate('/form');
      return;
    }

    try {
      const parsedData = JSON.parse(storedData);
      setSessionData(parsedData);
      initializeBrainstormingSession(parsedData);
    } catch (error) {
      console.error('Error parsing session data:', error);
      setError('Failed to load session data');
    }
  }, [navigate]);

  const initializeBrainstormingSession = async (data) => {
    try {
      const healthCheck = await fetch(`${API_URL}/`);
      if (!healthCheck.ok) {
        throw new Error('API server is not responding');
      }

      const formData = new FormData();
      formData.append('topic', data.topic || '');
      formData.append('members', data.members || '');
      formData.append('goal', data.goal || '');

      if (data.files && data.files.length > 0) {
        Array.from(data.files).forEach((file) => {
          formData.append('fileUpload', file);
        });
      }

      const response = await fetch(`${API_URL}/initialize-brainstorm`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to initialize session');
      }

      const result = await response.json();

      let parsedMethod;
      try {
        parsedMethod = JSON.parse(result.response);
      } catch (error) {
        console.error('Error parsing JSON:', result.response);
        throw new Error('Invalid response format from server');
      }

      if (!parsedMethod.recommended_method || !parsedMethod.reasoning ||
          !parsedMethod.first_step || !parsedMethod.next_prompt) {
        throw new Error('Incomplete response from server');
      }

      setChatHistory([{
        role: 'assistant',
        content: `Let's use the ${parsedMethod.recommended_method} method!\n\n` +
                 `Why this method? ${parsedMethod.reasoning}\n\n` +
                 `Let's get started:\n${parsedMethod.first_step}\n\n` +
                 `First prompt:\n${parsedMethod.next_prompt}`
      }]);

      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError(`Failed to initialize: ${error.message}`);
    } finally {
      setIsInitializing(false);
    }
  };

  const handleSendMessage = async (message) => {
    const updatedHistory = [...chatHistory, { role: 'user', content: message }];
    setChatHistory(updatedHistory);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          context: {
            topic: sessionData?.topic || '',
            members: sessionData?.members || '',
            goal: sessionData?.goal || '',
            history: updatedHistory
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const result = await response.json();
      setChatHistory([...updatedHistory, { role: 'assistant', content: result.response }]);
      setProgress((prev) => Math.min(prev + 10, 100));
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError(`Failed to send message: ${error.message}`);
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-indigo-900">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-indigo-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 mt-16">
        {error && (
          <div className="bg-red-500/20 text-white p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        <h1 className="text-3xl font-semibold mb-8 text-white">
          Brainstorming: {sessionData?.topic}
        </h1>

        <div className="progress-container mb-8 bg-slate-800/50 rounded-full h-3">
          <div
            className="progress-bar h-full bg-yellow-400 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 rounded-xl p-6">
              <div className="chat-history mb-4 h-[calc(100vh-500px)] overflow-y-auto">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-4 p-4 rounded-lg ${
                      msg.role === 'assistant'
                        ? 'bg-blue-500/20 text-white'
                        : 'bg-pink-500/20 text-white ml-8'
                    }`}
                  >
                    {msg.content}
                  </div>
                ))}
              </div>
              <ChatGPTWidget onSendMessage={handleSendMessage} />
            </div>
          </div>

          <div className="workspace bg-slate-800/50 rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-6 text-white">Workspace</h2>
            <textarea
              className="w-full h-[calc(100vh-400px)] px-4 py-3 rounded-md bg-white/10
                        border border-pink-500/30 text-white placeholder-white/40
                        focus:outline-none focus:border-pink-500 focus:bg-white/15
                        transition-all duration-300"
              placeholder="Take notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SessionPage;