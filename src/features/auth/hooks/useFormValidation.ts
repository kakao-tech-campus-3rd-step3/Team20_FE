import { useState } from 'react';
import { z } from 'zod';
import { loginSchema, signupSchema } from '../model/schemas';

export const useFormValidation = () => {
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const markFieldAsTouched = (fieldName: string) => {
    setTouchedFields((prev) => new Set(prev).add(fieldName));
  };

  const validateField = (schema: z.ZodSchema, value: string) => {
    try {
      schema.parse(value);
      return undefined; // 유효한 경우
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.issues[0]?.message || '입력값을 확인해주세요';
      }
      return '입력값을 확인해주세요';
    }
  };

  const createEmailValidator = () => ({
    onBlur: ({ value }: { value: string }) => {
      markFieldAsTouched('email');
      return validateField(loginSchema.shape.email, value);
    },
    onChange: ({ value }: { value: string }) => {
      return validateField(loginSchema.shape.email, value);
    },
  });

  const createPasswordValidator = () => ({
    onBlur: ({ value }: { value: string }) => {
      markFieldAsTouched('password');
      return validateField(loginSchema.shape.password, value);
    },
    onChange: ({ value }: { value: string }) => {
      return validateField(loginSchema.shape.password, value);
    },
  });

  const createConfirmPasswordValidator = () =>
    ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onBlur: ({ value, fieldApi }: any) => {
        markFieldAsTouched('confirmPassword');
        const password = fieldApi.form.getFieldValue('password');

        const basicValidation = validateField(signupSchema.shape.confirmPassword, value);
        if (basicValidation) return basicValidation;

        if (value !== password) {
          return '비밀번호가 일치하지 않습니다';
        }

        return undefined;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange: ({ value, fieldApi }: any) => {
        const password = fieldApi.form.getFieldValue('password');

        const basicValidation = validateField(signupSchema.shape.confirmPassword, value);
        if (basicValidation) return basicValidation;

        if (value !== password) {
          return '비밀번호가 일치하지 않습니다';
        }

        return undefined;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;

  const createNicknameValidator = () => ({
    onBlur: ({ value }: { value: string }) => {
      markFieldAsTouched('nickname');
      return validateField(signupSchema.shape.nickname, value);
    },
    onChange: ({ value }: { value: string }) => {
      return validateField(signupSchema.shape.nickname, value);
    },
  });

  const getErrorMessage = (error: string | { message: string } | undefined): string => {
    if (typeof error === 'string') return error;
    if (error && typeof error === 'object' && 'message' in error) {
      return error.message;
    }
    return '입력값을 확인해주세요';
  };

  return {
    touchedFields,
    markFieldAsTouched,
    createEmailValidator,
    createPasswordValidator,
    createConfirmPasswordValidator,
    createNicknameValidator,
    getErrorMessage,
  };
};
