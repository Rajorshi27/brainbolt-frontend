import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ChatGPTWidget from '../components/ChatGPTWidget';
import Button from '../components/Button';
import { saveNotes } from '../api/apiService';

const SessionPage = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState('');
  const [progress, setProgress] = useState(0);
  const [sessionData, setSessionData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Retrieve session data from localStorage
    const storedData = localStorage.getItem('sessionData');
    if (!storedData) {
      // Redirect to form if no session data exists
      navigate('/form');
      return;
    }

    try {
      const parsedData = JSON.parse(storedData);
      setSessionData(parsedData);
    } catch (error) {
      console.error('Error parsing session data:', error);
      navigate('/form');
    }
  }, [navigate]);

  const handleSaveNotes = async () => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      const response = await saveNotes(notes);
      if (response.status === 'success') {
        alert('Notes saved successfully!');
      } else {
        throw new Error('Failed to save notes');
      }
    } catch (error) {
      console.error('Error saving notes:', error);
      alert('Error saving notes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!sessionData) {
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
        <h1 className="text-3xl font-semibold mb-8 text-white">
          Brainstorming: {sessionData.topic}
        </h1>

        <div className="progress-container mb-8 bg-slate-800/50 rounded-full h-3">
          <div
            className="progress-bar h-full bg-yellow-400 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ChatGPTWidget
              onProgress={setProgress}
              sessionData={sessionData}
            />
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
            <Button
              variant="secondary"
              className="mt-4 w-full"
              onClick={handleSaveNotes}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Notes'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SessionPage;