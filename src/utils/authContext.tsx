import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [callSilent, setCallSilent] = useState(true);
  const navigate = useNavigate();

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

  // Call this to log in and set the access token
  // const login = (token: string) => {
  //   setAccessToken(token);
  //   navigate('/dashboard');
  // };

  // Call this to log out and clear the access token
  // const logout = () => {
  //   setAccessToken(null);
  //   navigate('/login');
  // };
  
  useEffect(() => {
    if (!callSilent) {
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
      }
    };
    checkAuthStatus();
    setCallSilent(false);
    return () => {
      controller.abort();
    }
  }, []);

  const value = {
    accessToken,
    user,
    // login,
    // logout,
    silentAuth,
    setAccessToken,
    setUser,
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