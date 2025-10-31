import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type { LoginRequest, SignupRequest, EmailResendRequest } from '../model/types';
import {
  checkAuthStatusApi,
  loginApi,
  signupApi,
  logoutApi,
  verifyEmailApi,
  resendVerificationEmailApi,
} from './authApi';

export const authKeys = {
  all: ['auth'] as const,
  status: () => [...authKeys.all, 'status'] as const,
} as const;

export const useAuthStatusQuery = () => {
  return useQuery({
    queryKey: authKeys.status(),
    queryFn: checkAuthStatusApi,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: (failureCount, error: Error | null) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        return false;
      }
      return failureCount < 1;
    },
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => loginApi(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.status() });
    },
  });
};

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (userData: SignupRequest) => signupApi(userData),
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutApi,
    onSettled: () => {
      queryClient.setQueryData(authKeys.status(), { isLoggedIn: false });
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
};

export const useEmailVerificationQuery = (token: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['auth', 'email-verification', token],
    queryFn: () => verifyEmailApi(token),
    enabled: enabled && !!token,
    retry: false,
  });
};

export const useResendEmailMutation = () => {
  return useMutation({
    mutationFn: (data: EmailResendRequest) => resendVerificationEmailApi(data),
  });
};