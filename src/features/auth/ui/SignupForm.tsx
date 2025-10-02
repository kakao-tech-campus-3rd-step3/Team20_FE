import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useSignupForm } from '../hooks/useSignupForm';

export const SignupForm = () => {
  const { form, handleSubmit } = useSignupForm();
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
  };

  const getErrorMessage = (error: any): string => {
    if (typeof error === 'string') return error;
    if (error && typeof error === 'object' && 'message' in error) {
      return error.message;
    }
    return '입력값을 확인해주세요';
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={onSubmit} className="space-y-8">
        {/* 제목 */}
        <div className="text-left">
          <h2 className="text-3xl font-bold text-gray-900">회원가입</h2>
        </div>
        <div>
          <label htmlFor="email" className="block text-base font-semibold text-gray-800 mb-3">
            이메일
          </label>
          <form.Field
            name="email"
            validators={{
              onBlur: ({ value }) => {
                setTouchedFields((prev) => new Set(prev).add('email'));
                if (!value) return '이메일을 입력해주세요';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                  return '올바른 이메일 형식을 입력해주세요';
                }
                return undefined;
              },
              onChange: ({ value }) => {
                // 입력 중에도 실시간 검증 (에러 메시지는 blur 후에만 표시)
                if (!value) return '이메일을 입력해주세요';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                  return '올바른 이메일 형식을 입력해주세요';
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <div>
                <input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="w-full px-4 py-4 text-base border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 placeholder:text-gray-400"
                  placeholder="이메일을 입력하세요"
                />
                {!field.state.meta.isValid &&
                  touchedFields.has('email') &&
                  field.state.meta.errors.length > 0 && (
                    <p className="mt-2 text-sm text-red-600 font-medium" role="alert">
                      {getErrorMessage(field.state.meta.errors[0])}
                    </p>
                  )}
              </div>
            )}
          </form.Field>
        </div>

        <div>
          <label htmlFor="password" className="block text-base font-semibold text-gray-800 mb-3">
            비밀번호
          </label>
          <form.Field
            name="password"
            validators={{
              onBlur: ({ value }) => {
                setTouchedFields((prev) => new Set(prev).add('password'));
                if (!value) return '비밀번호를 입력해주세요';
                if (value.length < 8) {
                  return '비밀번호는 8자리 이상이어야 합니다';
                }
                return undefined;
              },
              onChange: ({ value }) => {
                // 입력 중에도 실시간 검증 (에러 메시지는 blur 후에만 표시)
                if (!value) return '비밀번호를 입력해주세요';
                if (value.length < 8) {
                  return '비밀번호는 8자리 이상이어야 합니다';
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <div>
                <input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="w-full px-4 py-4 text-base border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 placeholder:text-gray-400"
                  placeholder="비밀번호를 입력하세요 (8자리 이상)"
                />
                {!field.state.meta.isValid &&
                  touchedFields.has('password') &&
                  field.state.meta.errors.length > 0 && (
                    <p className="mt-2 text-sm text-red-600 font-medium" role="alert">
                      {getErrorMessage(field.state.meta.errors[0])}
                    </p>
                  )}
              </div>
            )}
          </form.Field>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-base font-semibold text-gray-800 mb-3"
          >
            비밀번호 확인
          </label>
          <form.Field
            name="confirmPassword"
            validators={{
              onBlur: ({ value, fieldApi }) => {
                setTouchedFields((prev) => new Set(prev).add('confirmPassword'));
                if (!value) return '비밀번호 확인을 입력해주세요';
                const password = fieldApi.form.getFieldValue('password');
                if (value !== password) {
                  return '비밀번호가 일치하지 않습니다';
                }
                return undefined;
              },
              onChange: ({ value, fieldApi }) => {
                // 입력 중에도 실시간 검증 (에러 메시지는 blur 후에만 표시)
                if (!value) return '비밀번호 확인을 입력해주세요';
                const password = fieldApi.form.getFieldValue('password');
                if (value !== password) {
                  return '비밀번호가 일치하지 않습니다';
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <div>
                <input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="w-full px-4 py-4 text-base border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 placeholder:text-gray-400"
                  placeholder="비밀번호를 다시 입력하세요"
                />
                {!field.state.meta.isValid &&
                  touchedFields.has('confirmPassword') &&
                  field.state.meta.errors.length > 0 && (
                    <p className="mt-2 text-sm text-red-600 font-medium" role="alert">
                      {getErrorMessage(field.state.meta.errors[0])}
                    </p>
                  )}
              </div>
            )}
          </form.Field>
        </div>

        <div>
          <label htmlFor="nickname" className="block text-base font-semibold text-gray-800 mb-3">
            닉네임
          </label>
          <form.Field
            name="nickname"
            validators={{
              onBlur: ({ value }) => {
                setTouchedFields((prev) => new Set(prev).add('nickname'));
                if (!value) return '닉네임을 입력해주세요';
                if (value.length < 2) {
                  return '닉네임은 2자리 이상이어야 합니다';
                }
                if (value.length > 20) {
                  return '닉네임은 20자리 이하여야 합니다';
                }
                return undefined;
              },
              onChange: ({ value }) => {
                // 입력 중에도 실시간 검증 (에러 메시지는 blur 후에만 표시)
                if (!value) return '닉네임을 입력해주세요';
                if (value.length < 2) {
                  return '닉네임은 2자리 이상이어야 합니다';
                }
                if (value.length > 20) {
                  return '닉네임은 20자리 이하여야 합니다';
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <div>
                <input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="w-full px-4 py-4 text-base border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 placeholder:text-gray-400"
                  placeholder="닉네임을 입력하세요 (2-20자)"
                />
                {!field.state.meta.isValid &&
                  touchedFields.has('nickname') &&
                  field.state.meta.errors.length > 0 && (
                    <p className="mt-2 text-sm text-red-600 font-medium" role="alert">
                      {getErrorMessage(field.state.meta.errors[0])}
                    </p>
                  )}
              </div>
            )}
          </form.Field>
        </div>

        <form.Subscribe selector={(state) => [state.isValid, state.isSubmitting, state.values]}>
          {([isValid, isSubmitting, values]) => {
            const hasValues =
              values &&
              typeof values === 'object' &&
              'email' in values &&
              'password' in values &&
              'confirmPassword' in values &&
              'nickname' in values &&
              values.email &&
              values.password &&
              values.confirmPassword &&
              values.nickname;

            // 모든 필드가 유효하면 버튼 활성화 (blur 이벤트 불필요)
            const canSubmit = hasValues && isValid && !isSubmitting;

            return (
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? '회원가입 중...' : '회원가입'}
              </button>
            );
          }}
        </form.Subscribe>

        {/* 하단 네비게이션 */}
        <div className="flex justify-end items-center pt-4">
          <div className="text-right">
            <span className="text-sm text-gray-600">이미 계정이 있으신가요? </span>
            <Link
              to="/auth/login"
              className="text-sm text-blue-600 hover:text-blue-500 font-semibold transition-colors"
            >
              로그인하기
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
