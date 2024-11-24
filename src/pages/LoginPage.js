import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import backgroundVideo from '../images/3195441-uhd_3840_2160_25fps.mp4';

const LoginPage = ({ setIsAuthenticated, setIsGuest }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    navigate('/form');
  };

  const handleGuestAccess = () => {
    setIsGuest(true);
    navigate('/form');
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
        <div className="w-full max-w-md p-8 bg-black/40 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Welcome to BrainBolt
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-200">
                Username
              </label>
              <TextInput
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-200">
                Password
              </label>
              <TextInput
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <Button
              variant="submit"
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg
                       transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Let's Brainstorm!
            </Button>
          </form>

          <div className="relative py-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 text-sm text-white/60 bg-black/40">or</span>
            </div>
          </div>

          <Button
            variant="secondary"
            onClick={handleGuestAccess}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-lg
                     transition-all duration-300 mb-6"
          >
            Continue as Guest
          </Button>

          <div className="text-center text-sm text-blue-200 space-x-3">
            <Link to="/register" className="hover:text-blue-300 transition-colors">
              Create account
            </Link>
            <span>|</span>
            <Link to="/forgot-password" className="hover:text-blue-300 transition-colors">
              Reset password
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
