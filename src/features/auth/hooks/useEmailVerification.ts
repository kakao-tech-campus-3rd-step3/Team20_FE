import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { verifyEmailApi } from '@/entities/auth';
import { AUTH_MESSAGES } from '../model/messages';
import axios from 'axios';

export type VerificationStatus = 'loading' | 'success' | 'error';

interface VerificationState {
    status: VerificationStatus;
    message: string;
}

interface UseEmailVerificationReturn extends VerificationState {
    goToLogin: () => void;
    goToHome: () => void;
}

const ERROR_MESSAGES = {
    400: AUTH_MESSAGES.EMAIL_VERIFICATION_ERROR_INVALID_TOKEN,
    404: AUTH_MESSAGES.EMAIL_VERIFICATION_ERROR_NOT_FOUND,
    409: AUTH_MESSAGES.EMAIL_VERIFICATION_ERROR_ALREADY_VERIFIED,
    410: AUTH_MESSAGES.EMAIL_VERIFICATION_ERROR_EXPIRED,
    default: AUTH_MESSAGES.EMAIL_VERIFICATION_ERROR_DEFAULT,
} as const;

const getErrorMessage = (statusCode?: number, serverMessage?: string): string => {
    if (!statusCode) return ERROR_MESSAGES.default;

    const message = ERROR_MESSAGES[statusCode as keyof typeof ERROR_MESSAGES];
    return serverMessage || message || ERROR_MESSAGES.default;
};

export const useEmailVerification = (token: string): UseEmailVerificationReturn => {
    const navigate = useNavigate();
    const [state, setState] = useState<VerificationState>({
        status: 'loading',
        message: '',
    });
    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                setState({
                    status: 'error',
                    message: AUTH_MESSAGES.EMAIL_VERIFICATION_ERROR_INVALID_TOKEN,
                });
                return;
            }

            try {
                const response = await verifyEmailApi(token);
                setState({
                    status: 'success',
                    message: response.message || AUTH_MESSAGES.EMAIL_VERIFICATION_SUCCESS_DEFAULT,
                });
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const statusCode = error.response?.status;
                    const serverMessage = error.response?.data?.message;
                    if (statusCode === 409) {
                        setState({
                            status: 'success',
                            message: ERROR_MESSAGES[409],
                        });
                        return;
                    }
                    setState({
                        status: 'error',
                        message: getErrorMessage(statusCode, serverMessage),
                    });
                } else if (error instanceof Error) {
                    setState({
                        status: 'error',
                        message: error.message || ERROR_MESSAGES.default,
                    });
                } else {
                    setState({
                        status: 'error',
                        message: ERROR_MESSAGES.default,
                    });
                }
            }
        };
        verifyEmail();
    }, [token]);

    const goToLogin = () => {
        navigate({ to: '/auth/login' });
    };
    const goToHome = () => {
        navigate({ to: '/' });
    };
    return {
        ...state,
        goToLogin,
        goToHome,
    };
};
