import { createContext, useContext, useState, useEffect, useRef } from 'react';
import Welcome from '../pages/welcome';
import { BRAND_AUTH_URL } from '../utils/environments';

type User = {
  id: number
  type: string
}

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [accessToken, setAccessToken] = useState<string | null>(null); 
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const hasInitialized = useRef(false);
  
  const silentAuth = async (signal: any) => {
    const response = await fetch(BRAND_AUTH_URL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
      signal
    });
    if (!response?.ok) {
      throw new Error(`${response.status}`);
    }
    const authResponse = await response.json();
    return {
      userId: authResponse?.userId,
      type: authResponse?.type,
      accessToken: authResponse?.accessToken
    }
  };

  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;
    const checkAuthStatus = async () => {
      try {
        const result = await silentAuth(signal);
        setAccessToken(result.accessToken);
        setUser({
          id: result.userId,
          type: result.type
        });
      } catch(error) {
        console.log('Auth silent error', error);
      } finally {
        setLoading(false);
        hasInitialized.current = true;
      }
    };
    checkAuthStatus();
    return () => {
      controller.abort();
    }
  }, []);

  const value = {
    accessToken,
    user,
    silentAuth,
    setAccessToken,
    setUser,
    loading,
    isAuthenticated: !!accessToken,
  };

  if (loading) {
    return (
      <Welcome />
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => useContext(AuthContext);