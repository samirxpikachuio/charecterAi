import React, { createContext, useState, useContext, ReactNode } from 'react';
import api from './api';

type User = {
    username: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    signup: (username: string, email: string, password: string) => Promise<void>;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false)
    
  const fetchUser = async () => {
      setLoading(true)
      try {
        const res = await api.get('/auth/me');
        setUser(res.data.user);
      } catch(error) {
        setUser(null)
      }
      setLoading(false)
    }
  React.useEffect(()=> {
    fetchUser()
  }, [])
    
  const login = async (email: string, password: string) => {
      setLoading(true)
    try {
        const res = await api.post('/auth/login', {email, password})
        if (res.status === 200)
         {
          setUser(res.data.user)
         }
         
    } finally {
        setLoading(false)
    }
  };
  const logout = () => {
    setUser(null);
  };

  const signup = async (username: string, email: string, password: string) => {
     setLoading(true)
    try {
      await api.post('/auth/register', {username, email, password})
      await login(email, password);
    } finally {
        setLoading(false)
    }
  };

  const isAuthenticated = !!user;

  const value = { user, login, logout, signup, isAuthenticated, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};