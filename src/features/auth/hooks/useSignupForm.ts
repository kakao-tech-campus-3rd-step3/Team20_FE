import { useForm } from '@tanstack/react-form';
import { type SignupFormData, signupSchema } from '../model';
import { useFormValidation } from './useFormValidation';
import { useSignupMutation } from './useAuthMutations';

export const useSignupForm = () => {
  const validation = useFormValidation();
  const signupMutation = useSignupMutation();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
    } as SignupFormData,
    validators: {
      onChange: ({ value }) => {
        try {
          signupSchema.parse(value);
          return undefined;
        } catch {
          return '입력값을 확인해주세요';
        }
      },
    },
    onSubmit: ({ value }) => {
      signupMutation.mutate({
        email: value.email,
        password: value.password,
        nickname: value.nickname,
      });
    },
  });

  return {
    form,
    handleSubmit: form.handleSubmit,
    validation,
    signupMutation,
  };
};
