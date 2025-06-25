import { createContext, useContext, useEffect, useState } from 'react';
import { getToken, setToken, removeToken } from '../utils/token';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded.user || decoded); 
      } catch (err) {
        console.error('Invalid token:', err);
        removeToken();
      }
    }
  }, []);

  const login = (userData) => {
    const { token, user } = userData;
    setToken(token);
    setUser(user); 
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
