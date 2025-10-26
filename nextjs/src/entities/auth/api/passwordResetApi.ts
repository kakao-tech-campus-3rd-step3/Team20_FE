import { httpBackend } from '@/shared/api/httpBackend';

export interface PasswordResetRequestData {
  email: string;
}

export interface PasswordResetRequestResponse {
  message: string;
}

export interface PasswordResetData {
  rawToken: string;
  password: string;
}

export interface PasswordResetResponse {
  message: string;
}

export const requestPasswordResetApi = async (
  data: PasswordResetRequestData,
): Promise<PasswordResetRequestResponse> => {
  const result = await httpBackend.post<PasswordResetRequestData, PasswordResetRequestResponse>(
    '/api/password-reset',
    data,
  );
  return result;
};

export const resetPasswordApi = async (data: PasswordResetData): Promise<PasswordResetResponse> => {
  const result = await httpBackend.patch<PasswordResetData, PasswordResetResponse>(
    '/api/password-reset',
    data,
  );
  return result;
};