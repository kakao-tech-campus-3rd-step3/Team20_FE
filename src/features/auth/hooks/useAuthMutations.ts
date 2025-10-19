import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
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
