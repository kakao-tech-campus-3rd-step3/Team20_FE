'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export function ContactForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('문의가 완료되었습니다.');
    setIsSubmitting(false);
    
    setTimeout(() => {
      router.push('/');
    }, 500);
  };

  return (
    <form className="space-y-(--spacing-6)" onSubmit={handleSubmit}>
      {/* 이름, 이메일 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-(--spacing-4)">
        <div>
          <label
            htmlFor="name"
            className="block text-body-small font-medium text-(--color-text-primary) mb-(--spacing-2)"
          >
            이름 *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-(--spacing-3) py-(--spacing-2) border border-(--color-border-primary) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-brand-secondary) focus:border-transparent text-body"
            placeholder="이름을 입력해주세요"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-body-small font-medium text-(--color-text-primary) mb-(--spacing-2)"
          >
            이메일 *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-(--spacing-3) py-(--spacing-2) border border-(--color-border-primary) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-brand-secondary) focus:border-transparent text-body"
            placeholder="이메일을 입력해주세요"
          />
        </div>
      </div>

      {/* 문의 유형 */}
      <div>
        <label
          htmlFor="subject"
          className="block text-body-small font-medium text-(--color-text-primary) mb-(--spacing-2)"
        >
          문의 유형 *
        </label>
        <select
          id="subject"
          name="subject"
          required
          className="w-full px-(--spacing-3) py-(--spacing-2) border border-(--color-border-primary) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-brand-secondary) focus:border-transparent text-body"
        >
          <option value="">문의 유형을 선택해주세요</option>
          <option value="account">계정 관련</option>
          <option value="service">서비스 이용</option>
          <option value="technical">기술적 문제</option>
          <option value="suggestion">개선 제안</option>
          <option value="other">기타</option>
        </select>
      </div>

      {/* 메시지 */}
      <div>
        <label
          htmlFor="message"
          className="block text-body-small font-medium text-(--color-text-primary) mb-(--spacing-2)"
        >
          문의 내용 *
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full px-(--spacing-3) py-(--spacing-2) border border-(--color-border-primary) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-brand-secondary) focus:border-transparent text-body"
          placeholder="문의하실 내용을 자세히 적어주세요"
        ></textarea>
      </div>

      {/* 개인정보 동의 */}
      <div className="flex items-start gap-(--spacing-3)">
        <input
          type="checkbox"
          id="privacy"
          name="privacy"
          required
          className="mt-(--spacing-1) w-4 h-4 text-(--color-brand-secondary) border-(--color-border-primary) rounded focus:ring-(--color-brand-secondary)"
        />
        <label
          htmlFor="privacy"
          className="text-body-small text-(--color-text-secondary)"
        >
          개인정보 수집 및 이용에 동의합니다.{' '}
          <Link
            href="/privacy"
            className="text-(--color-brand-secondary) hover:text-(--color-brand-tertiary) underline"
          >
            개인정보처리방침
          </Link>
          을 확인했습니다.
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-(--color-brand-secondary) hover:bg-(--color-brand-tertiary) disabled:opacity-50 disabled:cursor-not-allowed text-(--color-text-inverse) font-medium py-(--spacing-3) px-(--spacing-6) rounded-lg transition-colors duration-200 flex items-center justify-center gap-(--spacing-2) text-button-large shadow-(--shadow-button-hover)"
      >
        <Send className="w-5 h-5" aria-hidden />
        {isSubmitting ? '전송 중...' : '문의하기'}
      </button>
    </form>
  );
}