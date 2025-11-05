import { AUTH_MESSAGES } from './messages';

// Validator 타입 정의 - 의도적 any - tanstack form 23개 제네릭 타입
interface ValidatorConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onBlur: (params: { value: string; fieldApi?: any }) => string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const createLoginFields = (
  createEmailValidator: () => ValidatorConfig,
  createPasswordValidator: () => ValidatorConfig,
): LoginFieldConfig[] => [
  {
    name: 'email',
    label: AUTH_MESSAGES.FIELD_LABEL_EMAIL,
    type: 'email',
    placeholder: AUTH_MESSAGES.FIELD_PLACEHOLDER_EMAIL,
    validator: createEmailValidator(),
  },
  {
    name: 'password',
    label: AUTH_MESSAGES.FIELD_LABEL_PASSWORD,
    type: 'password',
    placeholder: AUTH_MESSAGES.FIELD_PLACEHOLDER_PASSWORD,
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
    label: AUTH_MESSAGES.FIELD_LABEL_EMAIL,
    type: 'email',
    placeholder: AUTH_MESSAGES.FIELD_PLACEHOLDER_EMAIL,
    validator: createEmailValidator(),
  },
  {
    name: 'password',
    label: AUTH_MESSAGES.FIELD_LABEL_PASSWORD,
    type: 'password',
    placeholder: AUTH_MESSAGES.FIELD_PLACEHOLDER_PASSWORD_MIN,
    validator: createPasswordValidator(),
  },
  {
    name: 'confirmPassword',
    label: AUTH_MESSAGES.FIELD_LABEL_CONFIRM_PASSWORD,
    type: 'password',
    placeholder: AUTH_MESSAGES.FIELD_PLACEHOLDER_CONFIRM_PASSWORD,
    validator: createConfirmPasswordValidator(),
  },
  {
    name: 'nickname',
    label: AUTH_MESSAGES.FIELD_LABEL_NICKNAME,
    type: 'text',
    placeholder: AUTH_MESSAGES.FIELD_PLACEHOLDER_NICKNAME,
    validator: createNicknameValidator(),
  },
];

export const createPasswordResetFields = (
  createPasswordValidator: () => ValidatorConfig,
  createConfirmPasswordValidator: () => ValidatorConfig,
): PasswordResetFieldConfig[] => [
  {
    name: 'password',
    label: AUTH_MESSAGES.FIELD_LABEL_NEW_PASSWORD,
    type: 'password',
    placeholder: AUTH_MESSAGES.FIELD_PLACEHOLDER_NEW_PASSWORD,
    validator: createPasswordValidator(),
  },
  {
    name: 'confirmPassword',
    label: AUTH_MESSAGES.FIELD_LABEL_CONFIRM_PASSWORD,
    type: 'password',
    placeholder: AUTH_MESSAGES.FIELD_PLACEHOLDER_CONFIRM_PASSWORD,
    validator: createConfirmPasswordValidator(),
  },
];
