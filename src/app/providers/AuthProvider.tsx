import { type ReactNode } from 'react';
import type { User, LoginRequest, SignupRequest } from '@/entities/auth';
import {
  useAuthStatusQuery,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
} from '@/entities/auth';
import { AuthContext, type AuthContextType } from '@/shared/lib/auth';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data: authStatus, isLoading } = useAuthStatusQuery();
  const loginMutation = useLoginMutation();
  const signupMutation = useSignupMutation();
  const logoutMutation = useLogoutMutation();

  const isLoggedIn = authStatus?.isLoggedIn ?? false;
  const user: User | null =
    isLoggedIn && authStatus
      ? {
          userId: authStatus.userId!,
          email: authStatus.email!,
          nickname: authStatus.nickname!,
        }
      : null;

  const login = async (credentials: LoginRequest) => {
    try {
      await loginMutation.mutateAsync(credentials);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signup = async (userData: SignupRequest) => {
    try {
      await signupMutation.mutateAsync(userData);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoggedIn,
    isLoading:
      isLoading || loginMutation.isPending || signupMutation.isPending || logoutMutation.isPending,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
