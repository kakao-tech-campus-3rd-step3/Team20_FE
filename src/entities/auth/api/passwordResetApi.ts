import { httpBackend } from '@/shared/api/httpBakend';

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

// 비밀번호 재설정 요청 (이메일 전송)
export const requestPasswordResetApi = async (
  data: PasswordResetRequestData,
): Promise<PasswordResetRequestResponse> => {
  console.log('🔵 [requestPasswordResetApi] 호출됨:', data);
  const result = await httpBackend.post<PasswordResetRequestData, PasswordResetRequestResponse>(
    '/api/password-reset',
    data,
  );
  console.log('✅ [requestPasswordResetApi] 응답:', result);
  return result;
};

// 비밀번호 재설정 (토큰으로 변경)
export const resetPasswordApi = async (data: PasswordResetData): Promise<PasswordResetResponse> => {
  console.log('🔵 [resetPasswordApi] 호출됨:', data);
  const result = await httpBackend.patch<PasswordResetData, PasswordResetResponse>(
    '/api/password-reset',
    data,
  );
  console.log('✅ [resetPasswordApi] 응답:', result);
  return result;
};
