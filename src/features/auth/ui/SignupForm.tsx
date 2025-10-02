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
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={onSubmit} className="space-y-8">
        {/* 제목 */}
        <div className="text-left">
          <h2
            className="text-4xl font-bold text-gray-900 mb-2"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
            회원가입
          </h2>
          <p className="text-lg text-gray-600" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            K-콘텐츠 여행의 세계로 떠나보세요
          </p>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-lg font-semibold text-gray-800 mb-3"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
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
                  className="w-full px-6 py-5 text-lg border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-200 placeholder:text-gray-400 bg-white hover:border-gray-300"
                  style={{ fontFamily: 'Fredoka, sans-serif' }}
                  placeholder="이메일을 입력하세요"
                />
                {!field.state.meta.isValid &&
                  touchedFields.has('email') &&
                  field.state.meta.errors.length > 0 && (
                    <p className="mt-3 text-base text-red-500 font-medium" role="alert">
                      {getErrorMessage(field.state.meta.errors[0])}
                    </p>
                  )}
              </div>
            )}
          </form.Field>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-lg font-semibold text-gray-800 mb-3"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
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
                  className="w-full px-6 py-5 text-lg border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-200 placeholder:text-gray-400 bg-white hover:border-gray-300"
                  style={{ fontFamily: 'Fredoka, sans-serif' }}
                  placeholder="비밀번호를 입력하세요 (8자리 이상)"
                />
                {!field.state.meta.isValid &&
                  touchedFields.has('password') &&
                  field.state.meta.errors.length > 0 && (
                    <p className="mt-3 text-base text-red-500 font-medium" role="alert">
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
            className="block text-lg font-semibold text-gray-800 mb-3"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
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
                  className="w-full px-6 py-5 text-lg border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-200 placeholder:text-gray-400 bg-white hover:border-gray-300"
                  style={{ fontFamily: 'Fredoka, sans-serif' }}
                  placeholder="비밀번호를 다시 입력하세요"
                />
                {!field.state.meta.isValid &&
                  touchedFields.has('confirmPassword') &&
                  field.state.meta.errors.length > 0 && (
                    <p className="mt-3 text-base text-red-500 font-medium" role="alert">
                      {getErrorMessage(field.state.meta.errors[0])}
                    </p>
                  )}
              </div>
            )}
          </form.Field>
        </div>

        <div>
          <label
            htmlFor="nickname"
            className="block text-lg font-semibold text-gray-800 mb-3"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
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
                  className="w-full px-6 py-5 text-lg border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-200 placeholder:text-gray-400 bg-white hover:border-gray-300"
                  style={{ fontFamily: 'Fredoka, sans-serif' }}
                  placeholder="닉네임을 입력하세요 (2-20자)"
                />
                {!field.state.meta.isValid &&
                  touchedFields.has('nickname') &&
                  field.state.meta.errors.length > 0 && (
                    <p className="mt-3 text-base text-red-500 font-medium" role="alert">
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
                className={`w-full flex justify-center py-5 px-8 border border-transparent rounded-2xl shadow-lg text-xl font-bold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-offset-2 ${
                  canSubmit
                    ? 'text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 focus:ring-purple-300 shadow-lg'
                    : 'text-gray-400 bg-gray-200 cursor-not-allowed shadow-sm'
                }`}
                style={{ fontFamily: 'Fredoka, sans-serif' }}
              >
                {isSubmitting ? '회원가입 중...' : '회원가입'}
              </button>
            );
          }}
        </form.Subscribe>

        {/* 하단 네비게이션 */}
        <div className="flex justify-end items-center pt-6">
          <div className="text-right">
            <span className="text-base text-gray-600" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              이미 계정이 있으신가요?{' '}
            </span>
            <Link
              to="/auth/login"
              className="text-base text-purple-600 hover:text-purple-500 font-semibold transition-colors"
              style={{ fontFamily: 'Fredoka, sans-serif' }}
            >
              로그인하기
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
