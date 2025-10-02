import { useLoginForm } from '../hooks/useLoginForm';
import { FormTitle, FormButton, FormNavigation } from '../../../shared/ui';
import { FormFieldRenderer } from './FormFieldRenderer';
import { createLoginFields } from '../model/fieldConfigs';

export const LoginForm = () => {
  const { form, handleSubmit, validation } = useLoginForm();

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
