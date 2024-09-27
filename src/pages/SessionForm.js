import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Loader from '../components/Loader';

const SessionForm = ({ onSubmit }) => {
    const [topic, setTopic] = useState('');
    const [members, setMembers] = useState(1);
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            onSubmit({ topic, members, additionalInfo });
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="flex flex-col items-center justify-between h-screen bg-gradient">
            <Header />

            <div className="glassmorphism flex flex-col items-center justify-center flex-grow max-w-lg mx-auto">
                <h2 className="text-2xl font-bold text-white">Brainstorming Session</h2>

                <form onSubmit={handleSubmit} className="mt-4 w-full max-w-lg">
                    <TextInput
                        label="Topic"
                        value={topic}
                        onChange={setTopic}
                        required
                        className="glass-input"
                    />

                    <TextInput
                        label="Number of Members"
                        type="number"
                        min="1"
                        value={members}
                        onChange={(e) => setMembers(Number(e.target.value))}
                        required
                        className="glass-input"
                    />

                    <TextInput
                        label="Additional Information"
                        value={additionalInfo}
                        onChange={setAdditionalInfo}
                        type="textarea"
                        className="glass-input"
                    />

                    {loading && <Loader />}

                    <Button
                        label="Submit"
                        type="submit"
                        className="glass-button"
                    />
                </form>
            </div>

            <Footer />
        </div>
    );
};

export default SessionForm;
