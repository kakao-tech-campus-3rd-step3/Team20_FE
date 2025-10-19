import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { requestPasswordResetApi, resetPasswordApi } from '@/entities/auth';
import type {
  PasswordResetRequestData,
  PasswordResetData,
} from '@/entities/auth/api/passwordResetApi';

export const usePasswordResetRequestMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: PasswordResetRequestData) => {
      console.log('🟡 [usePasswordResetRequestMutation] mutationFn 호출:', data);
      return requestPasswordResetApi(data);
    },
    onSuccess: () => {
      navigate({ to: '/auth/login' });
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
      navigate({ to: '/auth/login' });
    },
    onError: (error) => {
      console.error('[usePasswordResetMutation] 에러:', error);
    },
  });
};
