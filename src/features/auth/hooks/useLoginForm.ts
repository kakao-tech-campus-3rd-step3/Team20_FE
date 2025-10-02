import { useForm } from '@tanstack/react-form';
import { type LoginFormData } from '../model';
import { useFormValidation } from './useFormValidation';

export const useLoginForm = () => {
  const validation = useFormValidation();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    } as LoginFormData,
    onSubmit: async ({ value }) => {
      // TODO: 실제 로그인 API 호출
      console.log('Login form submitted:', value);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
  });

  return {
    form,
    handleSubmit: form.handleSubmit,
    validation,
  };
};
