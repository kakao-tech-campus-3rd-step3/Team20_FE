import { useSignupForm } from '../hooks/useSignupForm';
import { FormTitle, FormButton, FormNavigation } from '../../../shared/ui';
import { FormFieldRenderer } from './FormFieldRenderer';
import { createSignupFields } from '../model/fieldConfigs';

export const SignupForm = () => {
  const { form, handleSubmit, validation, signupMutation } = useSignupForm();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
  };

  const fields = createSignupFields(
    validation.createEmailValidator,
    validation.createPasswordValidator,
    validation.createConfirmPasswordValidator,
    validation.createNicknameValidator,
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={onSubmit} className="space-y-6">
        <FormTitle>회원가입</FormTitle>

        {signupMutation.isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            <p className="font-medium">회원가입에 실패했습니다</p>
            <p className="mt-1">
              {signupMutation.error instanceof Error
                ? signupMutation.error.message
                : '이미 사용 중인 이메일이거나 입력 정보를 확인해주세요.'}
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
          rightLink={{ to: '/auth/login', text: '로그인하기' }}
        />
      </form>
    </div>
  );
};
