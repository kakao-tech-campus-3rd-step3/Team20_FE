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
      try {
        // TanStack Query mutation으로 실제 로그인 API 호출
        await loginMutation.mutateAsync({
          email: value.email,
          password: value.password,
        });
      } catch (error) {
        // 에러는 mutation.error로 UI에서 처리
        console.error('Login submission error:', error);
      }
    },
  });

  return {
    form,
    handleSubmit: form.handleSubmit,
    validation,
    loginMutation, // 에러 처리를 위해 mutation 객체도 반환
  };
};
