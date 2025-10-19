import { usePasswordResetForm } from '../hooks/usePasswordResetForm';
import { FormTitle, FormButton, FormNavigation } from '@/shared/ui';
import { FormFieldRenderer } from './FormFieldRenderer';
import { createPasswordResetFields, AUTH_MESSAGES } from '../model';

interface PasswordResetFormProps {
  token: string;
}

export const PasswordResetForm = ({ token }: PasswordResetFormProps) => {
  const { form, handleSubmit, validation, resetMutation } = usePasswordResetForm(token);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
  };

  // 비밀번호 재설정 전용 필드 사용
  const fields = createPasswordResetFields(
    validation.createPasswordValidator,
    validation.createConfirmPasswordValidator,
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <FormTitle>{AUTH_MESSAGES.PASSWORD_RESET_TITLE}</FormTitle>
          <p className="mt-2 text-sm text-gray-600 text-center">
            {AUTH_MESSAGES.PASSWORD_RESET_DESCRIPTION}
          </p>
        </div>

        {resetMutation.isSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            <p className="font-medium">{AUTH_MESSAGES.PASSWORD_RESET_SUCCESS}</p>
          </div>
        )}

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

        {fields.map((fieldConfig) => (
          <form.Field
            key={fieldConfig.name}
            name={fieldConfig.name}
            validators={fieldConfig.validator}
          >
            {(field) => (
              <FormFieldRenderer
                field={field}
                touchedFields={validation.touchedFields}
                getErrorMessage={validation.getErrorMessage}
                label={fieldConfig.label}
                type={fieldConfig.type}
                placeholder={fieldConfig.placeholder}
              />
            )}
          </form.Field>
        ))}

        <form.Subscribe selector={(state) => [state.isValid, state.isSubmitting, state.values]}>
          {([isValid, isSubmitting, values]) => {
            const hasValues =
              values &&
              typeof values === 'object' &&
              'password' in values &&
              'confirmPassword' in values &&
              values.password &&
              values.confirmPassword;

            const canSubmit = hasValues && isValid && !isSubmitting;

            return (
              <FormButton
                type="submit"
                variant={canSubmit ? 'primary' : 'disabled'}
                isLoading={isSubmitting as boolean}
                disabled={!canSubmit as boolean}
              >
                {AUTH_MESSAGES.PASSWORD_RESET_BUTTON}
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
