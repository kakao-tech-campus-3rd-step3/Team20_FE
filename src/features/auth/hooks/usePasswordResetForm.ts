import { useForm } from '@tanstack/react-form';
import { type PasswordResetFormData, passwordResetSchema } from '../model/passwordResetSchemas';
import { useFormValidation } from './useFormValidation';
import { usePasswordResetMutation } from './usePasswordResetMutations';

export const usePasswordResetForm = (token: string) => {
  const validation = useFormValidation();
  const resetMutation = usePasswordResetMutation();

  const form = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    } as PasswordResetFormData,
    validators: {
      onChange: ({ value }) => {
        try {
          passwordResetSchema.parse(value);
          return undefined;
        } catch (error) {
          return '입력값을 확인해주세요';
        }
      },
    },
    onSubmit: async ({ value }) => {
      console.log('🟢 [usePasswordResetForm] onSubmit 호출, 토큰:', token);
      try {
        await resetMutation.mutateAsync({
          rawToken: token,
          password: value.password,
        });
        console.log('✅ [usePasswordResetForm] mutateAsync 완료');
      } catch (error) {
        console.error('❌ [usePasswordResetForm] 에러:', error);
      }
    },
  });

  return {
    form,
    handleSubmit: form.handleSubmit,
    validation,
    resetMutation,
  };
};
