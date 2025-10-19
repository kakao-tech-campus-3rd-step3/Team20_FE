import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { requestPasswordResetApi, resetPasswordApi } from '@/entities/auth';
import type {
  PasswordResetRequestData,
  PasswordResetData,
} from '@/entities/auth/api/passwordResetApi';

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
      console.error('[usePasswordResetRequestMutation] 에러:', error);
    },
  });
};

export const usePasswordResetMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: PasswordResetData) => resetPasswordApi(data),
    onSuccess: () => {
      setTimeout(() => {
        navigate({ to: '/auth/login' });
      }, 2000);
    },
    onError: (error) => {
      console.error('[usePasswordResetMutation] 에러:', error);
    },
  });
};
