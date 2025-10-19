import { usePasswordResetRequestForm } from '../hooks/usePasswordResetRequestForm';
import { FormTitle, FormButton, FormNavigation } from '@/shared/ui';
import { FormFieldRenderer } from './FormFieldRenderer';
import { AUTH_MESSAGES } from '../model';

export const PasswordResetRequestForm = () => {
  const { form, handleSubmit, validation, resetRequestMutation } = usePasswordResetRequestForm();

  const onSubmit = async (e: React.FormEvent) => {
    console.log('🔴 [PasswordResetRequestForm] onSubmit 호출');
    e.preventDefault();
    await handleSubmit();
    console.log('✅ [PasswordResetRequestForm] handleSubmit 완료');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <FormTitle>{AUTH_MESSAGES.PASSWORD_RESET_REQUEST_TITLE}</FormTitle>
          <p className="mt-2 text-sm text-gray-600 text-center">
            {AUTH_MESSAGES.PASSWORD_RESET_REQUEST_DESCRIPTION}
          </p>
        </div>

        {resetRequestMutation.isSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            <p className="font-medium">{AUTH_MESSAGES.PASSWORD_RESET_REQUEST_SUCCESS}</p>
          </div>
        )}

        {resetRequestMutation.isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            <p className="font-medium">{AUTH_MESSAGES.PASSWORD_RESET_REQUEST_ERROR_TITLE}</p>
            <p className="mt-1">
              {resetRequestMutation.error instanceof Error
                ? resetRequestMutation.error.message
                : AUTH_MESSAGES.PASSWORD_RESET_REQUEST_ERROR_DEFAULT}
            </p>
          </div>
        )}

        <form.Field
          name="email"
          validators={validation.createEmailValidator()}
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

        <form.Subscribe selector={(state) => [state.isValid, state.isSubmitting, state.values]}>
          {([isValid, isSubmitting, values]) => {
            const hasValues =
              values &&
              typeof values === 'object' &&
              'email' in values &&
              values.email;

            const canSubmit = hasValues && isValid && !isSubmitting;

            return (
              <FormButton
                type="submit"
                variant={canSubmit ? 'primary' : 'disabled'}
                isLoading={isSubmitting as boolean}
                disabled={!canSubmit as boolean}
              >
                {AUTH_MESSAGES.PASSWORD_RESET_REQUEST_BUTTON}
              </FormButton>
            );
          }}
        </form.Subscribe>

        <FormNavigation
          rightText={AUTH_MESSAGES.HAVE_ACCOUNT_TEXT}
          rightLink={{ to: '/auth/login', text: AUTH_MESSAGES.LOGIN_LINK }}
        />
      </form>
    </div>
  );
};
