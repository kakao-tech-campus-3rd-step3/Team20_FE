import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useLoginForm } from '../hooks/useLoginForm';

export const LoginForm = () => {
  const { form, handleSubmit } = useLoginForm();
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
          <h2 className="text-4xl font-bold text-gray-900 mb-2">로그인</h2>
          <p className="text-lg text-gray-600">K-콘텐츠 여행의 세계로 떠나보세요</p>
        </div>
        <div>
          <label htmlFor="email" className="block text-lg font-semibold text-gray-800 mb-3">
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
          <label htmlFor="password" className="block text-lg font-semibold text-gray-800 mb-3">
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
                  placeholder="비밀번호를 입력하세요"
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

        <form.Subscribe selector={(state) => [state.isValid, state.isSubmitting, state.values]}>
          {([isValid, isSubmitting, values]) => {
            const hasValues =
              values &&
              typeof values === 'object' &&
              'email' in values &&
              'password' in values &&
              values.email &&
              values.password;

            // 모든 필드가 유효하면 버튼 활성화 (blur 이벤트 불필요)
            const canSubmit = hasValues && isValid && !isSubmitting;

            return (
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full flex justify-center py-5 px-8 border border-transparent rounded-2xl shadow-lg text-xl font-bold text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-purple-300 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? '로그인 중...' : '로그인'}
              </button>
            );
          }}
        </form.Subscribe>

        {/* 하단 네비게이션 */}
        <div className="flex justify-between items-center pt-6">
          <div className="text-left">
            {/* <Link
              to="/auth/forgot-password"
              className="text-base text-purple-600 hover:text-purple-500 font-medium transition-colors"
            >
              비밀번호 재설정하기
            </Link> */}
            <span className="text-base text-purple-600 font-medium">비밀번호 재설정하기</span>
          </div>
          <div className="text-right">
            <span className="text-base text-gray-600">계정이 없으신가요? </span>
            <Link
              to="/auth/signup"
              className="text-base text-purple-600 hover:text-purple-500 font-semibold transition-colors"
            >
              회원가입하기
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
