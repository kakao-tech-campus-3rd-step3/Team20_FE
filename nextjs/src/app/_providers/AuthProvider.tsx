'use client';

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
      if (process.env.NODE_ENV === 'development') {
        console.log('[AuthProvider] Checking auth status...');
      }
      
      try {
        const response = await checkAuthStatusApi();
        if (process.env.NODE_ENV === 'development') {
          console.log('[AuthProvider] Response:', response);
        }
        if (response && response.isLoggedIn) {
          setIsLoggedIn(true);
          // 사용자 정보가 있다면 설정 (userId만 있어도 설정)
          if (response.userId) {
            const user: User = {
              userId: response.userId,
              email: response.email || '',
              nickname: response.nickname || '',
            };
            setUser(user);
            if (process.env.NODE_ENV === 'development') {
              console.log('[AuthProvider] User authenticated:', user.userId);
            }
          }
        } else {
          setIsLoggedIn(false);
          setUser(null);
          if (process.env.NODE_ENV === 'development') {
            console.log('[AuthProvider] User not authenticated');
          }
        }
      } catch (error) {
        // 401 오류는 정상적인 로그아웃 상태이므로 조용히 처리
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          if (status === 401) {
            // 401은 단순히 인증되지 않은 상태이므로 조용히 처리
            setIsLoggedIn(false);
            setUser(null);
            if (process.env.NODE_ENV === 'development') {
              console.log('[AuthProvider] No valid token found (401)');
            }
          } else if (status === 403) {
            // 403은 권한 없음 - 로그아웃 처리
            setIsLoggedIn(false);
            setUser(null);
            if (process.env.NODE_ENV === 'development') {
              console.log('[AuthProvider] Access forbidden (403)');
            }
          } else {
            // 네트워크 오류나 서버 오류 등
            console.error('Auth status check failed:', error);
            setIsLoggedIn(false);
            setUser(null);
          }
        } else {
          // 예상치 못한 오류
          console.error('Unexpected auth error:', error);
          setIsLoggedIn(false);
          setUser(null);
        }
      } finally {
        setIsLoading(false);
        if (process.env.NODE_ENV === 'development') {
          console.log('[AuthProvider] Auth check completed');
        }
      }
    };

    // 초기 인증 상태 확인은 한 번만 실행
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
    } catch (error) {
      // 로그아웃 API 실패는 로그만 남기고 계속 진행
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        console.error('Logout API failed:', error);
      }
    } finally {
      // API 성공/실패와 관계없이 클라이언트 상태는 초기화
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