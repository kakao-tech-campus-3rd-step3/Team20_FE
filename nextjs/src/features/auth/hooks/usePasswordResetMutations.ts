'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { requestPasswordResetApi, resetPasswordApi } from '@/entities/auth';
import type {
  PasswordResetRequestData,
  PasswordResetData,
} from '@/entities/auth/api/passwordResetApi';

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

export const usePasswordResetRequestMutation = () => {
  return useMutation({
    mutationFn: (data: PasswordResetRequestData) => {
      return requestPasswordResetApi(data);
    },
    onSuccess: (_data, variables) => {
      const url = `/auth/reset-password-success?email=${encodeURIComponent(variables.email)}`;
      window.location.href = url;
    },
    onError: (error) => {
      const message = getErrorMessage(error, '비밀번호 재설정 요청에 실패했습니다');
      toast.error(message);
    },
  });
};

export const usePasswordResetMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: PasswordResetData) => resetPasswordApi(data),
    onSuccess: () => {
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    },
    onError: (error) => {
      const message = getErrorMessage(error, '비밀번호 변경에 실패했습니다');
      toast.error(message);
    },
  });
};