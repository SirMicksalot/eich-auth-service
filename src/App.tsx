import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthCallback from './pages/AuthCallback';
import supabaseService from './services/supabase';

function App() {
  // Handle login request
  const LoginHandler: React.FC = () => {
    useEffect(() => {
      const initiateLogin = async () => {
        try {
          const { error } = await supabaseService.signInWithGoogle();
          if (error) {
            console.error('Login error:', error);
          }
        } catch (err) {
          console.error('Login error:', err);
        }
      };

      initiateLogin();
    }, []);

    return null;
  };

  return (
    <Router>
      <Routes>
        {/* Redirect root to login flow */}
        <Route 
          path="/" 
          element={<Navigate to="/login" replace />} 
        />
        
        {/* Start login flow */}
        <Route 
          path="/login" 
          element={<LoginHandler />} 
        />
        
        {/* Handle auth callback */}
        <Route 
          path="/auth/callback" 
          element={<AuthCallback />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
