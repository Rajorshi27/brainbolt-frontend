import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import backgroundVideo from '../images/5554724-hd_1080_1920_30fps.mp4'; // Import the video file

const SessionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    topic: '',
    members: '',
    goal: '',
    files: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      files: e.target.files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Store session data in localStorage for SessionPage
    localStorage.setItem('sessionData', JSON.stringify({
      topic: formData.topic,
      members: formData.members,
      goal: formData.goal,
      files: null // Files can't be stored in localStorage
    }));

    navigate('/session');
  };

  const handleGuestAccess = () => {
    // Handle guest access (if any actions are required)
    navigate('/form');  // Navigate to the session form for guest
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 min-w-full min-h-full w-auto h-auto object-cover z-0"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Header */}
      <header className="relative z-20 p-6">
        <h1 className="text-2xl font-bold">
          <Link to="/" className="text-white hover:text-blue-300 transition-colors">
            BrainBolt
          </Link>
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 relative z-20">
        <div className="w-full max-w-2xl p-8 bg-black/40 backdrop-blur-lg rounded-2xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Start Your Brainstorming Session
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-200">
                What is the topic of your brainstorming session?
              </label>
              <TextInput
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                placeholder="Enter the main topic or problem to solve"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-200">
                How many members are participating?
              </label>
              <TextInput
                type="number"
                name="members"
                value={formData.members}
                onChange={handleChange}
                placeholder="Enter the number of participants"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-200">
                What are your main goals for this session?
              </label>
              <textarea
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                placeholder="Describe what you want to achieve"
                className="w-full px-4 py-3 rounded-md bg-white/10 border border-pink-500/30
                          text-white placeholder-white/40 focus:outline-none focus:border-pink-500
                          focus:bg-white/15 transition-all duration-300 min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-200">
                Upload relevant files (optional):
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="block w-full text-sm text-blue-200
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-pink-500/20 file:text-blue-200
                          hover:file:bg-pink-500/30
                          cursor-pointer"
              />
            </div>

            <Button variant="submit" type="submit">
              Generate Ideas
            </Button>
          </form>

        </div>
      </main>
    </div>
  );
};

export default SessionForm;
