import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'react-toastify';
import { useAuth } from '@/app/providers/AuthProvider';
import type { LoginRequest, SignupRequest } from '@/entities/auth';

export const useLoginMutation = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (credentials: LoginRequest) => {
            await login(credentials);
        },
        onSuccess: () => {
            navigate({ to: '/' });
        },
        onError: () => {
            toast.error('로그인에 실패했습니다');
        },
    });
};

export const useSignupMutation = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (userData: SignupRequest) => {
            await signup(userData);
            return userData.email;
        },
        onSuccess: (email) => {
            navigate({ 
                to: '/auth/signup-success',
                search: { email }
            });
        },
        onError: () => {
            toast.error('회원가입에 실패했습니다');
        },
    });
};
