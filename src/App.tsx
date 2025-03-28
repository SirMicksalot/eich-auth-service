import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthCallback from './pages/AuthCallback';
import RecentNews from './pages/RecentNews';
import ProtectedRoute from './components/ProtectedRoute';
import supabaseService from './services/supabase';

function App() {
  // Handle login request
  const LoginHandler: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    useEffect(() => {
      const initiateLogin = async () => {
        try {
          setIsLoading(true);
          const { error } = await supabaseService.signInWithGoogle();
          if (error) {
            console.error('Login error:', error);
            setError(error.message);
          }
        } catch (err) {
          console.error('Login error:', err);
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setIsLoading(false);
        }
      };

      initiateLogin();
    }, []);

    if (isLoading) {
      return <div style={{ padding: 20 }}>Initializing login...</div>;
    }

    if (error) {
      return <div style={{ padding: 20, color: 'red' }}>Error: {error}</div>;
    }

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

        {/* Protected Recent News route */}
        <Route
          path="/recent-news"
          element={
            <ProtectedRoute>
              <RecentNews />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
