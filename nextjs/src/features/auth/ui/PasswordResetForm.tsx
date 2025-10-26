'use client';

import { usePasswordResetForm } from '../hooks/usePasswordResetForm';
import { FormTitle, FormButton, FormNavigation } from '@/shared/ui';
import { FormFieldRenderer } from './FormFieldRenderer';
import { AUTH_MESSAGES } from '../model';

interface PasswordResetFormProps {
  token: string;
}

export const PasswordResetForm = ({ token }: PasswordResetFormProps) => {
  const { form, handleSubmit, validation, resetMutation } = usePasswordResetForm(token);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
  };

  // 성공 시 성공 메시지만 표시
  if (resetMutation.isSuccess) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center py-12">
        <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {AUTH_MESSAGES.PASSWORD_RESET_SUCCESS_TITLE}
        </h2>
        <p className="text-gray-600 mb-2">
          {AUTH_MESSAGES.PASSWORD_RESET_SUCCESS_MESSAGE}
        </p>
        <p className="text-sm text-gray-500">
          {AUTH_MESSAGES.PASSWORD_RESET_SUCCESS_REDIRECT}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <FormTitle>{AUTH_MESSAGES.PASSWORD_RESET_TITLE}</FormTitle>
        </div>

        {resetMutation.isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            <p className="font-medium">{AUTH_MESSAGES.PASSWORD_RESET_ERROR_TITLE}</p>
            <p className="mt-1">
              {resetMutation.error instanceof Error
                ? resetMutation.error.message
                : AUTH_MESSAGES.PASSWORD_RESET_ERROR_DEFAULT}
            </p>
          </div>
        )}

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
              label={AUTH_MESSAGES.FIELD_LABEL_NEW_PASSWORD}
              type="password"
              placeholder={AUTH_MESSAGES.FIELD_PLACEHOLDER_NEW_PASSWORD}
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
              label={AUTH_MESSAGES.FIELD_LABEL_CONFIRM_PASSWORD}
              type="password"
              placeholder={AUTH_MESSAGES.FIELD_PLACEHOLDER_CONFIRM_PASSWORD}
            />
          )}
        </form.Field>

        <form.Subscribe selector={(state) => [state.isValid, state.isSubmitting, state.values]}>
          {([isValid, isSubmitting, values]) => {
            const hasValues =
              values &&
              typeof values === 'object' &&
              'password' in values &&
              'confirmPassword' in values &&
              values.password &&
              values.confirmPassword;

            const isLoading = isSubmitting || resetMutation.isPending;
            const canSubmit = hasValues && isValid && !isLoading;

            return (
              <FormButton
                type="submit"
                variant={canSubmit ? 'primary' : 'disabled'}
                isLoading={isLoading as boolean}
                disabled={!canSubmit as boolean}
              >
                {AUTH_MESSAGES.PASSWORD_RESET_BUTTON}
              </FormButton>
            );
          }}
        </form.Subscribe>

        <FormNavigation
          rightText={AUTH_MESSAGES.HAVE_ACCOUNT_TEXT}
          rightLink={{ href: '/auth/login', text: AUTH_MESSAGES.LOGIN_LINK }}
        />
      </form>
    </div>
  );
};