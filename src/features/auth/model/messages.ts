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

  // 비밀번호 재설정 관련
  PASSWORD_RESET_REQUEST_TITLE: '비밀번호 재설정',
  PASSWORD_RESET_REQUEST_DESCRIPTION: '가입하신 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.',
  PASSWORD_RESET_REQUEST_BUTTON: '재설정 링크 보내기',
  PASSWORD_RESET_REQUEST_SUCCESS: '이메일로 비밀번호 재설정 링크를 보내드렸습니다.',
  PASSWORD_RESET_REQUEST_ERROR_TITLE: '요청에 실패했습니다',
  PASSWORD_RESET_REQUEST_ERROR_DEFAULT: '이메일을 확인해주세요.',

  PASSWORD_RESET_TITLE: '새 비밀번호 설정',
  PASSWORD_RESET_DESCRIPTION: '새로운 비밀번호를 설정해주세요.',
  PASSWORD_RESET_BUTTON: '비밀번호 변경하기',
  PASSWORD_RESET_SUCCESS: '비밀번호가 성공적으로 변경되었습니다.',
  PASSWORD_RESET_ERROR_TITLE: '비밀번호 변경에 실패했습니다',
  PASSWORD_RESET_ERROR_DEFAULT: '입력 정보를 확인하거나 링크가 만료되었을 수 있습니다.',

  // 이메일 인증 관련
  EMAIL_VERIFICATION_LOADING_TITLE: '이메일 인증 중...',
  EMAIL_VERIFICATION_LOADING_DESCRIPTION: '잠시만 기다려주세요.',
  EMAIL_VERIFICATION_SUCCESS_TITLE: '인증 완료!',
  EMAIL_VERIFICATION_SUCCESS_DEFAULT: '이메일 인증이 완료되었습니다.',
  EMAIL_VERIFICATION_ERROR_TITLE: '인증 실패',
  
  // 이메일 인증 에러 메시지
  EMAIL_VERIFICATION_ERROR_INVALID_TOKEN: '유효하지 않은 인증 링크입니다.',
  EMAIL_VERIFICATION_ERROR_NOT_FOUND: '인증 정보를 찾을 수 없습니다. 인증 메일을 다시 요청해주세요.',
  EMAIL_VERIFICATION_ERROR_ALREADY_VERIFIED: '이미 인증이 완료된 계정입니다. 바로 로그인하실 수 있습니다.',
  EMAIL_VERIFICATION_ERROR_EXPIRED: '인증 링크가 만료되었습니다. 인증 메일을 다시 요청해주세요.',
  EMAIL_VERIFICATION_ERROR_DEFAULT: '이메일 인증에 실패했습니다. 잠시 후 다시 시도해주세요.',

  // 이메일 인증 버튼
  EMAIL_VERIFICATION_GO_TO_LOGIN: '로그인하기',
  EMAIL_VERIFICATION_GO_TO_HOME: '홈으로 가기',
} as const;
