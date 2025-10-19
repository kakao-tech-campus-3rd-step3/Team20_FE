// 로그인 요청 타입
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: string;
  email: string;
  nickname: string;
  accessToken: string;
}

export interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
}

export interface SignupResponse {
  token: string;
}

export interface User {
  userId: string;
  email: string;
  nickname: string;
}

// 타입의 명확화를 위한 의도적인 타입 분리(공통 타입 분리 X)
export interface EmailVerificationRequest {
  token: string;
}

export interface EmailVerificationResponse {
  message: string;
}

export interface EmailResendRequest {
  email: string;
}

export interface EmailResendResponse {
  message: string;
}
