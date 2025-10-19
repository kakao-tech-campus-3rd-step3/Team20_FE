import { z } from 'zod';

// 비밀번호 재설정 요청 스키마 (이메일만)
export const passwordResetRequestSchema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요').email('올바른 이메일 형식을 입력해주세요'),
});

// 비밀번호 재설정 스키마 (회원가입과 동일한 필드)
export const passwordResetSchema = z
  .object({
    email: z.string().min(1, '이메일을 입력해주세요').email('올바른 이메일 형식을 입력해주세요'),
    password: z
      .string()
      .min(1, '비밀번호를 입력해주세요')
      .min(8, '비밀번호는 8자리 이상이어야 합니다'),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요'),
    nickname: z
      .string()
      .min(1, '닉네임을 입력해주세요')
      .min(2, '닉네임은 2자리 이상이어야 합니다')
      .max(20, '닉네임은 20자리 이하여야 합니다'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

export type PasswordResetRequestFormData = z.infer<typeof passwordResetRequestSchema>;
export type PasswordResetFormData = z.infer<typeof passwordResetSchema>;
