'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '@/lib/api-config';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On app load, check if a token exists and decode it
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
        } else {
          setUser(decoded);
        }
      } catch {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/users/login', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser(decoded);
    return response.data;
  };

  const register = async (username, email, password) => {
    const response = await api.post('/users/register', { username, email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser(decoded);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}