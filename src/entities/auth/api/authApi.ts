import { httpBackend } from '@/shared/api/httpBakend';
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  EmailVerificationResponse,
  EmailResendRequest,
  EmailResendResponse,
} from '../model/types';

export const loginApi = async (credentials: LoginRequest): Promise<LoginResponse> => {
  return await httpBackend.post<unknown, LoginResponse>('/api/users/login', credentials);
};

export const signupApi = async (userData: SignupRequest): Promise<SignupResponse> => {
  return await httpBackend.post<unknown, SignupResponse>('/api/users', userData);
};

// 이메일 인증
export const verifyEmailApi = async (token: string): Promise<EmailVerificationResponse> => {
  const response = await httpBackend.get<unknown, EmailVerificationResponse>(
    `/api/emails/verify?token=${token}`,
  );
  return response;
};

// 이메일 인증 재전송
export const resendVerificationEmailApi = async (
  data: EmailResendRequest,
): Promise<EmailResendResponse> => {
  return await httpBackend.post<EmailResendRequest, EmailResendResponse>(
    '/api/emails/request',
    data,
  );
};

// 비밀번호 재설정 관련 API는 passwordResetApi.ts로 분리
