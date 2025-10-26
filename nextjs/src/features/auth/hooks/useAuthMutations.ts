'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/lib/auth';
import type { LoginRequest, SignupRequest } from '@/entities/auth';

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
      console.error('Login failed:', error);
    },
  });
};

export const useSignupMutation = () => {
  const { signup } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async (userData: SignupRequest) => {
      await signup(userData);
    },
    onSuccess: () => {
      router.push('/signup-success');
    },
    onError: (error) => {
      console.error('Signup failed:', error);
    },
  });
};