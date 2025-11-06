import { httpBackend } from '@/shared/api/httpBackend';
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  EmailVerificationResponse,
  EmailResendRequest,
  EmailResendResponse,
  AuthStatusResponse,
  RefreshTokenResponse,
} from '../model/types';

export const loginApi = async (credentials: LoginRequest): Promise<LoginResponse> => {
  return await httpBackend.post<unknown, LoginResponse>('/users/login', credentials);
};

export const signupApi = async (userData: SignupRequest): Promise<SignupResponse> => {
  return await httpBackend.post<unknown, SignupResponse>('/users', userData);
};

export const verifyEmailApi = async (token: string): Promise<EmailVerificationResponse> => {
  const response = await httpBackend.get<unknown, EmailVerificationResponse>(
    `/emails/verify?token=${token}`,
  );
  return response;
};

export const resendVerificationEmailApi = async (
  data: EmailResendRequest,
): Promise<EmailResendResponse> => {
  return await httpBackend.post<EmailResendRequest, EmailResendResponse>('/emails/request', data);
};

export const checkAuthStatusApi = async (): Promise<AuthStatusResponse> => {
  return await httpBackend.get<unknown, AuthStatusResponse>('/users/status');
};

export const refreshTokenApi = async (): Promise<RefreshTokenResponse> => {
  return await httpBackend.post<unknown, RefreshTokenResponse>('/users/refresh');
};

export const logoutApi = async (): Promise<void> => {
  await httpBackend.post('/users/logout');
};
