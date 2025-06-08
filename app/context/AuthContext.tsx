import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  userId: string | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('user_id');
        const storedToken = await AsyncStorage.getItem('user_token');
        if (storedUserId && storedToken) {
          setUserId(storedUserId);
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Failed to load user from AsyncStorage', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (email: string, newToken: string) => {
    try {
      await AsyncStorage.setItem('user_id', email);
      await AsyncStorage.setItem('user_token', newToken);
      setUserId(email);
      setToken(newToken);
    } catch (error) {
      console.error('Failed to save user to AsyncStorage', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user_id');
      await AsyncStorage.removeItem('user_token');
      setUserId(null);
      setToken(null);
    } catch (error) {
      console.error('Failed to remove user from AsyncStorage', error);
    }
  };

  return (
    <AuthContext.Provider value={{ userId, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 