// 로그인 요청 타입
export interface LoginRequest {
  email: string;
  password: string;
}

// 로그인 응답 타입
export interface LoginResponse {
  userId: string;
  email: string;
  nickname: string;
  accessToken: string;
}

// 회원가입 요청 타입
export interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
}

// 회원가입 응답 타입 (이메일 인증 필요)
export interface SignupResponse {
  token: string; // 이메일 인증용 토큰 (accessToken 아님)
}

// 사용자 정보 타입
export interface User {
  userId: string;
  email: string;
  nickname: string;
}

// 이메일 인증 요청 타입
export interface EmailVerificationRequest {
  token: string;
}

// 이메일 인증 응답 타입
export interface EmailVerificationResponse {
  message: string;
}

// 이메일 재전송 요청 타입
export interface EmailResendRequest {
  email: string;
}

// 이메일 재전송 응답 타입
export interface EmailResendResponse {
  message: string;
}
