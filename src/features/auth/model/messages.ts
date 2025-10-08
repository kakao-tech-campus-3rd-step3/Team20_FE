/**
 * Auth 관련 메시지 상수
 */

export const AUTH_MESSAGES = {
  // 폼 타이틀
  LOGIN_TITLE: '로그인',
  SIGNUP_TITLE: '회원가입',

  // 버튼 텍스트
  LOGIN_BUTTON: '로그인',
  SIGNUP_BUTTON: '회원가입',

  // 에러 메시지
  LOGIN_ERROR_TITLE: '로그인에 실패했습니다',
  LOGIN_ERROR_DEFAULT: '이메일 또는 비밀번호를 확인해주세요.',
  
  SIGNUP_ERROR_TITLE: '회원가입에 실패했습니다',
  SIGNUP_ERROR_DEFAULT: '이미 사용 중인 이메일이거나 입력 정보를 확인해주세요.',

  // 네비게이션 텍스트
  FORGOT_PASSWORD_LINK: '비밀번호 재설정하기',
  NO_ACCOUNT_TEXT: '계정이 없으신가요?',
  SIGNUP_LINK: '회원가입하기',
  HAVE_ACCOUNT_TEXT: '이미 계정이 있으신가요?',
  LOGIN_LINK: '로그인하기',
} as const;
