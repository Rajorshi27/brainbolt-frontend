import React, { useState } from 'react';
import Header from '../components/Header'; // Adjust the import path as necessary
import Footer from '../components/Footer';
import TechniqueCard from '../components/TechniqueCard';
import Loader from '../components/Loader';
import Button from '../components/Button';

const TechniquesPage = ({ techniques, onSelectTechnique }) => {
    const [loading, setLoading] = useState(false);

    const handleSelectTechnique = (technique) => {
        setLoading(true); // Set loading state to true when a technique is selected
        onSelectTechnique(technique);
        setLoading(false); // Set loading state back to false after selection
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Header />

            <div className="flex flex-col items-center justify-center flex-grow">
                <h2 className="text-2xl font-bold">Recommended Brainstorming Techniques</h2>
                {loading ? ( // Conditional rendering based on loading state
                    <Loader />
                ) : (
                    <ul className="mt-4 w-full max-w-lg">
                        {techniques.map((technique, index) => (
                            <li key={index} className="mb-2">
                                <TechniqueCard technique={technique} />
                                <Button
                                    label="Select Technique"
                                    onClick={() => handleSelectTechnique(technique)}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default TechniquesPage;
