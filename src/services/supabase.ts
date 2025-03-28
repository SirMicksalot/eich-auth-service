import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file');
}

// Get redirect URL from query params or use default
const getRedirectUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const redirectUrl = params.get('redirect');
  
  if (redirectUrl) {
    // Store for callback
    localStorage.setItem('redirect_url', redirectUrl);
    return new URL(redirectUrl).origin + '/auth/callback';
  }
  
  // Default to same host + /auth/callback
  return `${window.location.origin}/auth/callback`;
};

// Configure Supabase client
const authConfig = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce' as const,
    redirectTo: getRedirectUrl()
  }
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, authConfig);

/**
 * Service to handle Supabase authentication
 */
class SupabaseService {
  /**
   * Get the current session
   */
  async getSession() {
    return await supabase.auth.getSession();
  }

  /**
   * Sign in with Google OAuth
   */
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });
    
    return { data, error };
  }
}

export default new SupabaseService();
