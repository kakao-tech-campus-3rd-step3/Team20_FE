import { useForm } from '@tanstack/react-form';
import {
  type PasswordResetRequestFormData,
  passwordResetRequestSchema,
} from '../model/passwordResetSchemas';
import { useFormValidation } from './useFormValidation';
import { usePasswordResetRequestMutation } from './usePasswordResetMutations';

export const usePasswordResetRequestForm = () => {
  const validation = useFormValidation();
  const resetRequestMutation = usePasswordResetRequestMutation();

  const form = useForm({
    defaultValues: {
      email: '',
    } as PasswordResetRequestFormData,
    validators: {
      onChange: ({ value }) => {
        try {
          passwordResetRequestSchema.parse(value);
          return undefined;
        } catch (error) {
          return '입력값을 확인해주세요';
        }
      },
    },
    onSubmit: async ({ value }) => {
      console.log('🟢 [usePasswordResetRequestForm] onSubmit 호출:', value);
      try {
        await resetRequestMutation.mutateAsync({
          email: value.email,
        });
        console.log('✅ [usePasswordResetRequestForm] mutateAsync 완료');
      } catch (error) {
        console.error('❌ [usePasswordResetRequestForm] 에러:', error);
      }
    },
  });

  return {
    form,
    handleSubmit: form.handleSubmit,
    validation,
    resetRequestMutation,
  };
};
