import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'react-toastify';
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
    onError: () => {
      toast.error('비밀번호 재설정 요청에 실패했습니다');
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
    onError: () => {
      toast.error('비밀번호 변경에 실패했습니다');
    },
  });
};
