import { useLoginForm } from '../hooks/useLoginForm';
import { FormTitle, FormButton, FormNavigation } from '../../../shared/ui';
import { FormFieldRenderer } from './FormFieldRenderer';
import { createLoginFields } from '../model/fieldConfigs';

export const LoginForm = () => {
  const { form, handleSubmit, validation, loginMutation } = useLoginForm();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
  };

  const fields = createLoginFields(
    validation.createEmailValidator,
    validation.createPasswordValidator,
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={onSubmit} className="space-y-6">
        <FormTitle>로그인</FormTitle>

        {loginMutation.isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            <p className="font-medium">로그인에 실패했습니다</p>
            <p className="mt-1">
              {loginMutation.error instanceof Error 
                ? loginMutation.error.message 
                : '이메일 또는 비밀번호를 확인해주세요.'}
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
          leftLink={{ to: '/auth/forgot-password', text: '비밀번호 재설정하기' }}
          rightText="계정이 없으신가요?"
          rightLink={{ to: '/auth/signup', text: '회원가입하기' }}
        />
      </form>
    </div>
  );
};
