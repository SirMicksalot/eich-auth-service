import React, { useEffect } from 'react';
import supabaseService from '../services/supabase';

const AuthCallback: React.FC = () => {
  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the session
        const { data: { session }, error } = await supabaseService.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          return;
        }
        
        if (session) {
          // Get stored redirect URL or use default
          const redirectUrl = localStorage.getItem('redirect_url');
          const targetUrl = redirectUrl 
            ? `${redirectUrl}/recent-news`
            : `${window.location.origin}/recent-news`;
          
          // Clear stored URL
          localStorage.removeItem('redirect_url');
          
          // Log for debugging
          console.log('[Auth Callback] Redirecting to:', targetUrl);
          
          // Redirect with session
          window.location.replace(targetUrl);
        } else {
          console.error('No session found after auth callback');
        }
      } catch (err) {
        console.error('Auth callback error:', err);
      }
    };

    handleCallback();
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      <p>Completing authentication...</p>
    </div>
  );
};

export default AuthCallback;
