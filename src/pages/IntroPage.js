import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

const IntroPage = ({ onStart }) => {
    return (
        <div className="flex flex-col items-center justify-between h-screen bg-gradient">
            {/* Add Header component */}
            <Header />

            {/* Intro section */}
            <div className="glassmorphism flex flex-col items-center justify-center flex-grow max-w-lg mx-auto">
                <h1 className="text-6xl font-bold text- italic text-center py-4 px-8"style={{ color: 'rgba(255, 255, 0, 0.8)'}}>Welcome to BRAINBOLT</h1>
                <p className="text-lg mt-4 text-white">Brainstorming, Redefined</p>

                {/* Use Button component with updated styling */}
                <Button
                    label="Let's Brainstorm!"
                    onClick={onStart}
                    className="glass-button mt-6"
                />
            </div>

            {/* Add Footer component */}
            <Footer />
        </div>
    );
};

export default IntroPage;
