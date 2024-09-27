import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SessionSummary from '../components/SessionSummary';
import TechniqueCard from '../components/TechniqueCard';
import ChatGPTWidget from '../components/ChatGPTWidget';

const SessionPage = ({ technique, sessionData }) => {
    const [stepIndex, setStepIndex] = useState(0);

    const nextStep = () => {
        if (stepIndex < technique.steps.length - 1) {
            setStepIndex(stepIndex + 1);
        }
    };

    return (
        <div className="flex flex-col items-center justify-between h-screen bg-gray-100">
            {/* Add Header component */}
            <Header />

            {/* Session Summary */}
            <SessionSummary sessionData={sessionData} />

            {/* Technique Card for the current technique */}
            <TechniqueCard technique={technique} />

            {/* Step display */}
            <div className="flex flex-col items-center justify-center flex-grow">
                <h2 className="text-2xl font-bold">{technique.name}</h2>
                <p className="mt-4 text-lg">{technique.steps[stepIndex]}</p>
                <button
                    className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={nextStep}
                >
                    {stepIndex < technique.steps.length - 1 ? "Next Step" : "Finish"}
                </button>
            </div>

            {/* ChatGPT Widget for interaction */}
            <ChatGPTWidget />

            {/* Add Footer component */}
            <Footer />
        </div>
    );
};

export default SessionPage;
