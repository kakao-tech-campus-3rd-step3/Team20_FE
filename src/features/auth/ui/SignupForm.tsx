import { useSignupForm } from '../hooks/useSignupForm';
import { FormTitle, FormFieldWrapper, FormButton, FormNavigation } from '../../../shared/ui';

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
        <form.Field name="email" validators={validation.createEmailValidator()}>
          {(field) => (
            <FormFieldWrapper
              field={field}
              touchedFields={validation.touchedFields}
              getErrorMessage={validation.getErrorMessage}
              inputProps={{
                label: '이메일',
                type: 'email',
                placeholder: '이메일을 입력하세요',
              }}
            />
          )}
        </form.Field>

        <form.Field name="password" validators={validation.createPasswordValidator()}>
          {(field) => (
            <FormFieldWrapper
              field={field}
              touchedFields={validation.touchedFields}
              getErrorMessage={validation.getErrorMessage}
              inputProps={{
                label: '비밀번호',
                type: 'password',
                placeholder: '비밀번호를 입력하세요 (8자리 이상)',
              }}
            />
          )}
        </form.Field>

        <form.Field name="confirmPassword" validators={validation.createConfirmPasswordValidator()}>
          {(field) => (
            <FormFieldWrapper
              field={field}
              touchedFields={validation.touchedFields}
              getErrorMessage={validation.getErrorMessage}
              inputProps={{
                label: '비밀번호 확인',
                type: 'password',
                placeholder: '비밀번호를 다시 입력하세요',
              }}
            />
          )}
        </form.Field>

        <form.Field name="nickname" validators={validation.createNicknameValidator()}>
          {(field) => (
            <FormFieldWrapper
              field={field}
              touchedFields={validation.touchedFields}
              getErrorMessage={validation.getErrorMessage}
              inputProps={{
                label: '닉네임',
                type: 'text',
                placeholder: '닉네임을 입력하세요 (2-20자)',
              }}
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
          rightLink={{ to: '/auth/login', text: '로그인하기' }}
        />
      </form>
    </div>
  );
};
