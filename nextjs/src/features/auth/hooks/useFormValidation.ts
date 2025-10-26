'use client';

import { useState } from 'react';
import { z } from 'zod';
import { loginSchema, signupSchema } from '../model/schemas';

type ValidatorConfig = {
  onChange: (value: string) => string | undefined;
  onBlur: (value: string) => string | undefined;
};

export interface ValidationHelpers {
  touchedFields: Set<string>;
  markFieldAsTouched: (fieldName: string) => void;
  createEmailValidator: () => ValidatorConfig;
  createPasswordValidator: () => ValidatorConfig;
  createConfirmPasswordValidator: () => ValidatorConfig;
  createNicknameValidator: () => ValidatorConfig;
  getErrorMessage: (error: string | { message: string } | undefined) => string;
}

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

  const createEmailValidator = (): ValidatorConfig => ({
    onBlur: (value) => {
      markFieldAsTouched('email');
      return validateField(loginSchema.shape.email, value);
    },
    onChange: (value) => {
      return validateField(loginSchema.shape.email, value);
    },
  });

  const createPasswordValidator = (): ValidatorConfig => ({
    onBlur: (value) => {
      markFieldAsTouched('password');
      return validateField(loginSchema.shape.password, value);
    },
    onChange: (value) => {
      return validateField(loginSchema.shape.password, value);
    },
  });

  const createConfirmPasswordValidator = (): ValidatorConfig => ({
    onBlur: (value) => {
      markFieldAsTouched('confirmPassword');
      return validateField(signupSchema.shape.confirmPassword, value);
    },
    onChange: (value) => {
      return validateField(signupSchema.shape.confirmPassword, value);
    },
  });

  const createNicknameValidator = (): ValidatorConfig => ({
    onBlur: (value) => {
      markFieldAsTouched('nickname');
      return validateField(signupSchema.shape.nickname, value);
    },
    onChange: (value) => {
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
