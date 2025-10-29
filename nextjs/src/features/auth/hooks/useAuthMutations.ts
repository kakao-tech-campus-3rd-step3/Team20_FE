'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '@/shared/lib/auth';
import type { LoginRequest, SignupRequest } from '@/entities/auth';

const getErrorMessage = (error: unknown, defaultMessage: string): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (typeof data === 'string') {
      return data;
    }
    if (data && typeof data === 'object' && 'message' in data) {
      return data.message as string;
    }
    return defaultMessage;
  }
  if (error instanceof Error) {
    return error.message || defaultMessage;
  }
  return defaultMessage;
};

export const useLoginMutation = () => {
  const { login } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      await login(credentials);
    },
    onSuccess: () => {
      router.push('/');
    },
    onError: (error) => {
      const message = getErrorMessage(error, '로그인에 실패했습니다');
      toast.error(message);
    },
  });
};

export const useSignupMutation = () => {
  const { signup } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async (userData: SignupRequest) => {
      await signup(userData);
      return userData.email;
    },
    onSuccess: (email) => {
      router.push(`/auth/signup-success?email=${encodeURIComponent(email)}`);
    },
    onError: (error) => {
      const message = getErrorMessage(error, '회원가입에 실패했습니다');
      toast.error(message);
    },
  });
};