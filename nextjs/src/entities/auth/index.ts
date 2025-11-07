// API (순수 API 함수)
export {
  loginApi,
  signupApi,
  verifyEmailApi,
  resendVerificationEmailApi,
} from './api/authApi';
export {
  requestPasswordResetApi,
  resetPasswordApi,
} from './api/passwordResetApi';

// Query Hooks
export {
  authKeys,
  useAuthStatusQuery,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useEmailVerificationQuery,
  useResendEmailMutation,
} from './api/authQueries';

// Types
export type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  User,
  EmailVerificationRequest,
  EmailVerificationResponse,
  EmailResendRequest,
  EmailResendResponse,
} from './model/types';