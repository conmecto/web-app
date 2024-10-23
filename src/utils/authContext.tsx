import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Welcome from '../pages/welcome';
import { AUTH_URL } from '../utils/environments';

type User = {
  id: number
  type: string
}

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [accessToken, setAccessToken] = useState<string | null>(null); 
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const silentAuth = async () => {
    try {
      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        credentials: 'include'
      });
      if (response?.ok) {
        const authResponse = await response.json();
        if (authResponse?.accessToken && authResponse?.userId && authResponse?.type) {
          return {
            userId: authResponse.userId,
            type: authResponse.type,
            accessToken: authResponse.access_token
          }
        }
      }
    } catch (error) {
      console.error('Error during silent authentication:', error);
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
    let check = true;
    const checkAuthStatus = async () => {
      const result = await silentAuth();
      if (check) {
        if (result) {
          setAccessToken(result.accessToken);
          setUser({
            id: result.userId,
            type: result.type
          });
        }
        setLoading(false);
      }
    };
    checkAuthStatus();
    return () => {
      check = false; 
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