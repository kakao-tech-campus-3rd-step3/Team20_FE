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

// 회원가입 응답 타입
export interface SignupResponse {
  userId: string;
  email: string;
  nickname: string;
  accessToken: string;
}

// 사용자 정보 타입
export interface User {
  userId: string;
  email: string;
  nickname: string;
}
