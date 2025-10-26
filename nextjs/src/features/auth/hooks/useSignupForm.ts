'use client';

import { useForm } from '@tanstack/react-form';
import { type SignupFormData } from '../model';
import { useFormValidation } from './useFormValidation';

export const useSignupForm = () => {
  const validation = useFormValidation();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
    } as SignupFormData,
    onSubmit: async ({ value }) => {
      // TODO: 실제 회원가입 API 호출
      console.log('Signup form submitted:', value);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 임시 지연
    },
  });

  return {
    form,
    handleSubmit: form.handleSubmit,
    validation,
  };
};
