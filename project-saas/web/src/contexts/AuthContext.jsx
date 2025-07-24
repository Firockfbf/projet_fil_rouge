import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate             = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/users/me');
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const register = async (email, password) => {
    await api.post('/auth/register', { email, password });
    navigate('/login');
  };

  const login = async (email, password) => {
    await api.post('/auth/login', { email, password });
    const userRes = await api.get('/users/me');
    setUser(userRes.data);
    navigate('/dashboard');
  };

  const logout = async () => {
    await api.get('/auth/logout');
    setUser(null);
    navigate('/products');
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
