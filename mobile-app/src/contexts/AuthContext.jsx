// mobile-app/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/api/users/me')
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const login = async (email, password) => {
    await api.post('/api/auth/login', { email, password });
    const me = (await api.get('/api/users/me')).data;
    setUser(me);
  };

  const register = async (email, password) => {
    await api.post('/api/auth/register', { email, password });
    // auto-login
    await login(email, password);
  };

  const logout = async () => {
    await api.post('/api/auth/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
