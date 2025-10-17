import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/app/providers/AuthProvider';
import type { LoginRequest, SignupRequest } from '@/entities/auth';

//TODO 로그인 성공시 홈으로 리디렉션되는데, 로그인 페이지로 접근하기 전의 페이지로 이동되게 할 것
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
        onError: (error) => {
            console.error('Login failed:', error);
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
            // 회원가입 성공 후 이메일 인증 안내 페이지로 이동
            navigate({ 
                to: '/auth/signup-success',
                search: { email }
            });
        },
        onError: (error) => {
            console.error('Signup failed:', error);
        },
    });
};
