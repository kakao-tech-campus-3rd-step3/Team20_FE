import { useState, useEffect, type ReactNode } from 'react';
import axios from 'axios';
import type { User, LoginRequest, SignupRequest } from '@/entities/auth';
import { loginApi, signupApi, checkAuthStatusApi, logoutApi } from '@/entities/auth/api/authApi';
import { AuthContext, type AuthContextType } from '@/shared/lib/auth';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await checkAuthStatusApi();
        setIsLoggedIn(response.isLoggedIn);
      } catch (error) {
        console.error('Auth status check failed:', error);
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await loginApi(credentials);

      const newUser: User = {
        userId: response.userId,
        email: response.email,
        nickname: response.nickname,
      };

      setUser(newUser);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signup = async (userData: SignupRequest) => {
    try {
      await signupApi(userData);
    } catch (error) {
      console.error('Signup failed:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
      setUser(null);
      setIsLoggedIn(false);
    } catch {
      // 실패해도 일단 초기화
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoggedIn,
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
