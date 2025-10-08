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
        } catch (error) {
          return '입력값을 확인해주세요';
        }
      },
    },
    onSubmit: async ({ value }) => {
      try {
        await signupMutation.mutateAsync({
          email: value.email,
          password: value.password,
          nickname: value.nickname,
        });
      } catch (error) {
        console.error('Signup submission error:', error);
      }
    },
  });

  return {
    form,
    handleSubmit: form.handleSubmit,
    validation,
    signupMutation,
  };
};
