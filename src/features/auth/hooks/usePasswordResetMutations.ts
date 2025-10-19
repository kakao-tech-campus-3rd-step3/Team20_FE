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
    onSuccess: (_data, variables) => {
      // 성공 시 이메일과 함께 success 페이지로 이동
      navigate({
        to: '/auth/reset-password-success' as any,
        search: { email: variables.email } as any,
      });
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
      // 성공 메시지를 보여주고 3초 후 로그인 페이지로 이동
      setTimeout(() => {
        navigate({ to: '/auth/login' });
      }, 3000);
    },
    onError: (error) => {
      console.error('[usePasswordResetMutation] 에러:', error);
    },
  });
};
