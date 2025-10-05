import { useForm } from '@tanstack/react-form';
import { type LoginFormData, loginSchema } from '../model';
import { useFormValidation } from './useFormValidation';

export const useLoginForm = () => {
  const validation = useFormValidation();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    } as LoginFormData,
    validators: {
      onChange: ({ value }) => {
        // 전체 폼 유효성 검사
        try {
          loginSchema.parse(value);
          return undefined;
        } catch (error) {
          return '입력값을 확인해주세요';
        }
      },
    },
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
