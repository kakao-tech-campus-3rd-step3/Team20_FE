import { httpBackend } from '@/shared/api/httpBakend';

export interface PasswordResetRequestData {
  email: string;
}

export interface PasswordResetRequestResponse {
  message: string;
}

export interface PasswordResetData {
  email: string;
  password: string;
  nickname: string;
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
export const resetPasswordApi = async (
  token: string,
  data: PasswordResetData,
): Promise<PasswordResetResponse> => {
  return await httpBackend.patch<PasswordResetData, PasswordResetResponse>(
    `/api/password-reset?token=${token}`,
    data,
  );
};
