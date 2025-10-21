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
        } catch {
          return '입력값을 확인해주세요';
        }
      },
    },
    onSubmit: ({ value }) => {
      resetRequestMutation.mutate({
        email: value.email,
      });
    },
  });

  return {
    form,
    handleSubmit: form.handleSubmit,
    validation,
    resetRequestMutation,
  };
};
