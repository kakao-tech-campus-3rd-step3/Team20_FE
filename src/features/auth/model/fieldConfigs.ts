// 간단한 validator 타입 정의
interface ValidatorConfig {
  onBlur: (params: { value: string; fieldApi?: any }) => string | undefined;
  onChange: (params: { value: string; fieldApi?: any }) => string | undefined;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  validator: ValidatorConfig;
}

export interface LoginFieldConfig extends FieldConfig {
  name: 'email' | 'password';
}

export interface SignupFieldConfig extends FieldConfig {
  name: 'email' | 'password' | 'confirmPassword' | 'nickname';
}

// 필드 설정 생성 함수들
export const createLoginFields = (
  createEmailValidator: () => ValidatorConfig,
  createPasswordValidator: () => ValidatorConfig,
): LoginFieldConfig[] => [
  {
    name: 'email',
    label: '이메일',
    type: 'email',
    placeholder: '이메일을 입력하세요',
    validator: createEmailValidator(),
  },
  {
    name: 'password',
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
    validator: createPasswordValidator(),
  },
];

export interface PasswordResetFieldConfig extends FieldConfig {
  name: 'password' | 'confirmPassword';
}

export const createSignupFields = (
  createEmailValidator: () => ValidatorConfig,
  createPasswordValidator: () => ValidatorConfig,
  createConfirmPasswordValidator: () => ValidatorConfig,
  createNicknameValidator: () => ValidatorConfig,
): SignupFieldConfig[] => [
  {
    name: 'email',
    label: '이메일',
    type: 'email',
    placeholder: '이메일을 입력하세요',
    validator: createEmailValidator(),
  },
  {
    name: 'password',
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력하세요 (8자리 이상)',
    validator: createPasswordValidator(),
  },
  {
    name: 'confirmPassword',
    label: '비밀번호 확인',
    type: 'password',
    placeholder: '비밀번호를 다시 입력하세요',
    validator: createConfirmPasswordValidator(),
  },
  {
    name: 'nickname',
    label: '닉네임',
    type: 'text',
    placeholder: '닉네임을 입력하세요 (2-20자)',
    validator: createNicknameValidator(),
  },
];

export const createPasswordResetFields = (
  createPasswordValidator: () => ValidatorConfig,
  createConfirmPasswordValidator: () => ValidatorConfig,
): PasswordResetFieldConfig[] => [
  {
    name: 'password',
    label: '새 비밀번호',
    type: 'password',
    placeholder: '새 비밀번호를 입력하세요 (8자리 이상)',
    validator: createPasswordValidator(),
  },
  {
    name: 'confirmPassword',
    label: '비밀번호 확인',
    type: 'password',
    placeholder: '비밀번호를 다시 입력하세요',
    validator: createConfirmPasswordValidator(),
  },
];
