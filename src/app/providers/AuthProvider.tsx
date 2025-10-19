import { createContext, useContext, useState, type ReactNode } from 'react';
import axios from 'axios';
import type { User, LoginRequest, SignupRequest } from '@/entities/auth';
import { loginApi, signupApi } from '@/entities/auth/api/authApi';
import { tokenStorage } from '@/shared/api/tokenStorage';

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  signup: (userData: SignupRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading] = useState(false);

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await loginApi(credentials);

      const newUser: User = {
        userId: response.userId,
        email: response.email,
        nickname: response.nickname,
      };

      setAccessToken(response.accessToken);
      setUser(newUser);
      setIsAuthenticated(true);

      tokenStorage.setToken(response.accessToken);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signup = async (userData: SignupRequest) => {
    try {
      await signupApi(userData);
    } catch (error) {
      console.error('❌ Signup failed:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
      }
      throw error;
    }
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    setIsAuthenticated(false);
    tokenStorage.removeToken();
  };

  const value: AuthContextType = {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
