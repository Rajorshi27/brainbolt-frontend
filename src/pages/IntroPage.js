import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Footer from '../components/Footer';

import logo from '../images/logo.png';
import formIcon from '../images/formicon.png';
import instructionIcon from '../images/instruction.png';
import executionIcon from '../images/execution.png';
import teamImage from '../images/team-image.jpg';
import backgroundVideo from '../images/173481-849645868_small.mp4';

const IntroPage = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: formIcon,
      title: 'FILL THE FORM',
      description: 'Answer some simple questions about your brainstorming session.'
    },
    {
      icon: instructionIcon,
      title: 'RECEIVE THE INSTRUCTIONS',
      description: 'Get the best brainstorming technique and steps to execute the session.'
    },
    {
      icon: executionIcon,
      title: 'EXECUTE THE SESSION',
      description: 'Follow the step-by-step guide to make the session productive and fun!'
    }
  ];

  const stats = [
    { number: '95%', text: 'satisfaction rating' },
    { number: '50%', text: 'less time consumed' },
    { number: '5X', text: 'more ideas generated' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex justify-center items-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute min-w-full min-h-full object-cover w-full h-full"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#0a192f] opacity-70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-8">
          <img
            src={logo}
            alt="BrainBolt Logo"
            className="w-32 h-32 mx-auto mb-8 animate-float"
            loading="lazy"
          />
          <h1 className="text-6xl font-bold mb-4 text-white md:text-4xl">
            Welcome to BrainBolt
          </h1>
          <p className="text-2xl text-blue-200 mb-8 md:text-xl">
            Brainstorming, Redefined
          </p>
          <Button
            onClick={() => navigate('/login')}
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full
                     transition-all duration-300 transform hover:-translate-y-1"
          >
            Let's Brainstorm!
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          HOW DOES IT WORK?
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl text-center
                        transform transition-all duration-300 hover:-translate-y-2
                        border border-white/10"
            >
              <img
                src={step.icon}
                alt={step.title}
                className="w-20 h-20 mx-auto mb-6"
                loading="lazy"
              />
              <h3 className="text-xl font-bold text-yellow-300 mb-4">
                {step.title}
              </h3>
              <p className="text-blue-200">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-8 bg-black/20">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          RESULTS OF USING BRAINBOLT
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl text-center
                        transform transition-all duration-300 hover:scale-105
                        border border-white/10"
            >
              <h3 className="text-5xl font-bold text-yellow-300 mb-2">
                {stat.number}
              </h3>
              <p className="text-blue-200">{stat.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-white">
              Let Your Team Excel
            </h2>
            <p className="text-blue-200 text-lg">
              BrainBolt gives you and your team a superpower to unlock your creative
              potential by providing you and your team a perfect brainstorming
              session, every time.
            </p>
          </div>
          <div className="relative">
            <img
              src={teamImage}
              alt="Team"
              className="rounded-2xl transform transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IntroPage;
