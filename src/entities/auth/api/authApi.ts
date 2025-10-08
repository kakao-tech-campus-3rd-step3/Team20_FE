import { httpBackend } from '@/shared/api/httpBakend';
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from '../model/types';

export const loginApi = async (credentials: LoginRequest): Promise<LoginResponse> => {
  return await httpBackend.post<unknown, LoginResponse>('/api/users/login', credentials);
};

export const signupApi = async (userData: SignupRequest): Promise<SignupResponse> => {
  return await httpBackend.post<unknown, SignupResponse>('/api/users', userData);
};
