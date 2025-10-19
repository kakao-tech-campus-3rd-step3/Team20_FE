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
      try {
        await resetRequestMutation.mutateAsync({
          email: value.email,
        });
      } catch (error) {
        // 에러는 mutation의 onError에서 토스트로 처리됨
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
