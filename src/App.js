import React, { useState } from 'react';
import IntroPage from './pages/IntroPage';
import LoginPage from './pages/LoginPage';
import SessionForm from './pages/SessionForm';
import TechniquesPage from './pages/TechniquesPage';
import SessionPage from './pages/SessionPage';
import SessionSummary from './components/SessionSummary'; // Ensure you import SessionSummary

const App = () => {
    const [step, setStep] = useState(0);  // 0: Intro, 1: Login, 2: Form, 3: Techniques, 4: Session
    const [sessionData, setSessionData] = useState(null);
    const [selectedTechnique, setSelectedTechnique] = useState(null);

    const techniques = [
        { name: 'Mind Mapping', steps: ['Step 1: Draw the topic...', 'Step 2: ...'] },
        { name: 'Brainwriting', steps: ['Step 1: Write your ideas...', 'Step 2: ...'] }
        // Add more techniques here
    ];

    const handleSelectTechnique = (technique) => {
        setSelectedTechnique(technique);
        // Set session data based on selected technique or form input
        setSessionData({
            topic: technique.name, // Use technique name as topic
            participants: 5, // Example value, adjust as needed
            duration: 30 // Example value, adjust as needed
        });
        setStep(4);
    };

    return (
        <>
            {step === 0 && <IntroPage onStart={() => setStep(1)} />}
            {step === 1 && <LoginPage onLogin={() => setStep(2)} onGuest={() => setStep(2)} />}
            {step === 2 && <SessionForm onSubmit={(data) => { setSessionData(data); setStep(3); }} />}
            {step === 3 && <TechniquesPage techniques={techniques} onSelectTechnique={handleSelectTechnique} />}
            {step === 4 && selectedTechnique && sessionData && (
                <>
                    <SessionSummary sessionData={sessionData} /> {/* Display Session Summary */}
                    <SessionPage technique={selectedTechnique} />
                </>
            )}
        </>
    );
};

export default App;
