'use client';

import { useLoginForm } from '../hooks/useLoginForm';
import { FormTitle, FormButton, FormNavigation } from '../../../shared/ui';
import { FormFieldRenderer } from './FormFieldRenderer';

export const LoginForm = () => {
  const { form, handleSubmit, validation } = useLoginForm();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={onSubmit} className="space-y-6">
        <FormTitle>로그인</FormTitle>

        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              try {
                if (!value) return '이메일을 입력해주세요';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return '올바른 이메일 형식을 입력해주세요';
                return undefined;
              } catch {
                return '이메일을 확인해주세요';
              }
            },
            onBlur: ({ value }) => {
              try {
                if (!value) return '이메일을 입력해주세요';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return '올바른 이메일 형식을 입력해주세요';
                return undefined;
              } catch {
                return '이메일을 확인해주세요';
              }
            }
          }}
        >
          {(field) => (
            <FormFieldRenderer
              field={field}
              touchedFields={validation.touchedFields}
              getErrorMessage={validation.getErrorMessage}
              label="이메일"
              type="email"
              placeholder="이메일을 입력하세요"
            />
          )}
        </form.Field>

        <form.Field
          name="password"
          validators={{
            onChange: ({ value }) => {
              try {
                if (!value) return '비밀번호를 입력해주세요';
                return undefined;
              } catch {
                return '비밀번호를 확인해주세요';
              }
            },
            onBlur: ({ value }) => {
              try {
                if (!value) return '비밀번호를 입력해주세요';
                return undefined;
              } catch {
                return '비밀번호를 확인해주세요';
              }
            }
          }}
        >
          {(field) => (
            <FormFieldRenderer
              field={field}
              touchedFields={validation.touchedFields}
              getErrorMessage={validation.getErrorMessage}
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력하세요"
            />
          )}
        </form.Field>

        <form.Subscribe selector={(state) => [state.isValid, state.isSubmitting, state.values]}>
          {([isValid, isSubmitting, values]) => {
            const hasValues =
              values &&
              typeof values === 'object' &&
              'email' in values &&
              'password' in values &&
              values.email &&
              values.password;

            const canSubmit = hasValues && isValid && !isSubmitting;

            return (
              <FormButton
                type="submit"
                variant={canSubmit ? 'primary' : 'disabled'}
                isLoading={isSubmitting as boolean}
                disabled={!canSubmit as boolean}
              >
                로그인
              </FormButton>
            );
          }}
        </form.Subscribe>

        <FormNavigation
          leftLink={{ href: '/forgot-password', text: '비밀번호 재설정하기' }}
          rightText="계정이 없으신가요?"
          rightLink={{ href: '/signup', text: '회원가입하기' }}
        />
      </form>
    </div>
  );
};
