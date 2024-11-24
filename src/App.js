import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntroPage from './pages/IntroPage';
import LoginPage from './pages/LoginPage';
import SessionForm from './pages/SessionForm';
import SessionPage from './pages/SessionPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);  // Track if the user is a guest

  const AccessRoute = ({ children }) => {
    if (!isAuthenticated && !isGuest) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-[#0a192f] to-[#4a148c]">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<IntroPage />} />
          <Route
            path="/login"
            element={
              <LoginPage
                setIsAuthenticated={setIsAuthenticated}
                setIsGuest={setIsGuest}  // Pass the setter for guest access
              />
            }
          />

          {/* Semi-protected routes (accessible to guests) */}
          <Route path="/form" element={<SessionForm />} />

          {/* Protected routes (for authenticated or guest users) */}
          <Route
            path="/session"
            element={
              <AccessRoute>
                <SessionPage />
              </AccessRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
