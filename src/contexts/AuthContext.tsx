import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@threat-intel.com',
    name: 'System Administrator',
    role: 'admin',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date(),
  },
  {
    id: '2',
    email: 'analyst@threat-intel.com',
    name: 'Security Analyst',
    role: 'analyst',
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date(),
  },
  {
    id: '3',
    email: 'user@example.com',
    name: 'Regular User',
    role: 'user',
    createdAt: new Date('2024-02-01'),
    lastLogin: new Date(),
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('auth-token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Mock authentication
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password') {
      const token = 'mock-jwt-token-' + foundUser.id;
      localStorage.setItem('auth-token', token);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setUser(foundUser);
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    
    // Mock Google OAuth
    const googleUser = {
      id: '4',
      email: 'google@example.com',
      name: 'Google User',
      role: 'user' as const,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150',
      createdAt: new Date(),
      lastLogin: new Date(),
    };
    
    const token = 'mock-google-token-' + googleUser.id;
    localStorage.setItem('auth-token', token);
    localStorage.setItem('user', JSON.stringify(googleUser));
    setUser(googleUser);
    
    setIsLoading(false);
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    // Mock registration
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      role: 'user' as const,
      createdAt: new Date(),
      lastLogin: new Date(),
    };
    
    const token = 'mock-jwt-token-' + newUser.id;
    localStorage.setItem('auth-token', token);
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      loginWithGoogle,
      register,
      logout,
      isLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}