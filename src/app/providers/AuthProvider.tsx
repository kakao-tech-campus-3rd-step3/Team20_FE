import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User, LoginRequest, SignupRequest } from '@/entities/auth';
import { httpBackend } from '@/shared/api/httpBakend';
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
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading] = useState(false); // 메모리 기반이므로 초기화 불필요

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await httpBackend.post<
        unknown,
        { userId: string; email: string; nickname: string; accessToken: string }
      >('/api/users/login', credentials);

      const newUser: User = {
        userId: response.userId,
        email: response.email,
        nickname: response.nickname,
      };

      setAccessToken(response.accessToken);
      setUser(newUser);

      tokenStorage.setToken(response.accessToken);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signup = async (userData: SignupRequest) => {
    try {
      const response = await httpBackend.post<
        unknown,
        { userId: string; email: string; nickname: string; accessToken: string }
      >('/api/users', userData);

      const newUser: User = {
        userId: response.userId,
        email: response.email,
        nickname: response.nickname,
      };

      setAccessToken(response.accessToken);
      setUser(newUser);

      tokenStorage.setToken(response.accessToken);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    tokenStorage.removeToken();
  };

  const value: AuthContextType = {
    user,
    accessToken,
    isAuthenticated: !!accessToken,
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
