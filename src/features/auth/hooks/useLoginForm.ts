import { useForm } from '@tanstack/react-form';
import { type LoginFormData, loginSchema } from '../model';
import { useFormValidation } from './useFormValidation';
import { useLoginMutation } from './useAuthMutations';

export const useLoginForm = () => {
  const validation = useFormValidation();
  const loginMutation = useLoginMutation();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    } as LoginFormData,
    validators: {
      onChange: ({ value }) => {
        try {
          loginSchema.parse(value);
          return undefined;
        } catch (error) {
          return '입력값을 확인해주세요';
        }
      },
    },
    onSubmit: async ({ value }) => {
      try {
        await loginMutation.mutateAsync({
          email: value.email,
          password: value.password,
        });
      } catch (error) {
        console.error('Login submission error:', error);
      }
    },
  });

  return {
    form,
    handleSubmit: form.handleSubmit,
    validation,
    loginMutation,
  };
};
