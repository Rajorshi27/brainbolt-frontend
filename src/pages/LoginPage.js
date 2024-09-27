import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Loader from '../components/Loader';

const LoginPage = ({ onLogin, onGuest }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = () => {
        setIsLoading(true);
        onLogin();  // Call the passed login function
        setTimeout(() => setIsLoading(false), 2000);  // Simulate loading
    };

    return (
        <div className="flex flex-col items-center justify-between h-screen bg-gradient">
            {/* Add Header component */}
            <Header />

            {/* Login section */}
            <div className="glassmorphism flex flex-col items-center justify-center flex-grow max-w-lg mx-auto">
                <h2 className="text-3xl font-bold mb-4 text-white">Login</h2>

                {/* TextInput for email */}
                <TextInput
                    label="Email"
                    value={email}
                    onChange={setEmail}
                    type="email"
                    className="glass-input"
                />

                {/* TextInput for password */}
                <TextInput
                    label="Password"
                    value={password}
                    onChange={setPassword}
                    type="password"
                    className="glass-input"
                />

                {isLoading ? (
                    <Loader />
                ) : (
                    <div className="mt-4 flex space-x-4">
                        <Button
                            label="Log In"
                            onClick={handleLogin}
                            className="glass-button"
                        />
                        <Button
                            label="Continue as Guest"
                            onClick={onGuest}
                            className="glass-button"
                        />
                    </div>
                )}
            </div>

            {/* Add Footer component */}
            <Footer />
        </div>
    );
};

export default LoginPage;
