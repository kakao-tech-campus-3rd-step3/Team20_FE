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
        } catch {
          return '입력값을 확인해주세요';
        }
      },
    },
    onSubmit: ({ value }) => {
      loginMutation.mutate({
        email: value.email,
        password: value.password,
      });
    },
  });

  return {
    form,
    handleSubmit: form.handleSubmit,
    validation,
    loginMutation,
  };
};
