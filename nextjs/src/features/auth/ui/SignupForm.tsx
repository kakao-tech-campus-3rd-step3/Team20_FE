'use client';

import { useSignupForm } from '../hooks/useSignupForm';
import { FormTitle, FormButton, FormNavigation } from '../../../shared/ui';
import { FormFieldRenderer } from './FormFieldRenderer';

export const SignupForm = () => {
  const { form, handleSubmit, validation } = useSignupForm();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={onSubmit} className="space-y-6">
        <FormTitle>회원가입</FormTitle>

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
                if (value.length < 8) return '비밀번호는 8자리 이상이어야 합니다';
                return undefined;
              } catch {
                return '비밀번호를 확인해주세요';
              }
            },
            onBlur: ({ value }) => {
              try {
                if (!value) return '비밀번호를 입력해주세요';
                if (value.length < 8) return '비밀번호는 8자리 이상이어야 합니다';
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
              placeholder="비밀번호를 입력하세요 (8자리 이상)"
            />
          )}
        </form.Field>

        <form.Field
          name="confirmPassword"
          validators={{
            onChange: ({ value, fieldApi }) => {
              try {
                if (!value) return '비밀번호 확인을 입력해주세요';
                const formApi = fieldApi.form;
                const password = formApi.getFieldValue('password');
                if (password && value !== password) return '비밀번호가 일치하지 않습니다';
                return undefined;
              } catch {
                return '비밀번호 확인을 확인해주세요';
              }
            },
            onBlur: ({ value, fieldApi }) => {
              try {
                if (!value) return '비밀번호 확인을 입력해주세요';
                const formApi = fieldApi.form;
                const password = formApi.getFieldValue('password');
                if (password && value !== password) return '비밀번호가 일치하지 않습니다';
                return undefined;
              } catch {
                return '비밀번호 확인을 확인해주세요';
              }
            }
          }}
        >
          {(field) => (
            <FormFieldRenderer
              field={field}
              touchedFields={validation.touchedFields}
              getErrorMessage={validation.getErrorMessage}
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
            />
          )}
        </form.Field>

        <form.Field
          name="nickname"
          validators={{
            onChange: ({ value }) => {
              try {
                if (!value) return '닉네임을 입력해주세요';
                if (value.length < 2) return '닉네임은 2자 이상이어야 합니다';
                if (value.length > 20) return '닉네임은 20자 이하여야 합니다';
                return undefined;
              } catch {
                return '닉네임을 확인해주세요';
              }
            },
            onBlur: ({ value }) => {
              try {
                if (!value) return '닉네임을 입력해주세요';
                if (value.length < 2) return '닉네임은 2자 이상이어야 합니다';
                if (value.length > 20) return '닉네임은 20자 이하여야 합니다';
                return undefined;
              } catch {
                return '닉네임을 확인해주세요';
              }
            }
          }}
        >
          {(field) => (
            <FormFieldRenderer
              field={field}
              touchedFields={validation.touchedFields}
              getErrorMessage={validation.getErrorMessage}
              label="닉네임"
              type="text"
              placeholder="닉네임을 입력하세요 (2-20자)"
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
              'confirmPassword' in values &&
              'nickname' in values &&
              values.email &&
              values.password &&
              values.confirmPassword &&
              values.nickname;

            const canSubmit = hasValues && isValid && !isSubmitting;

            return (
              <FormButton
                type="submit"
                variant={canSubmit ? 'primary' : 'disabled'}
                isLoading={isSubmitting as boolean}
                disabled={!canSubmit as boolean}
              >
                회원가입
              </FormButton>
            );
          }}
        </form.Subscribe>

        <FormNavigation
          rightText="이미 계정이 있으신가요?"
          rightLink={{ href: '/login', text: '로그인하기' }}
        />
      </form>
    </div>
  );
};
