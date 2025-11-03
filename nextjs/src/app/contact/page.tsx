'use client';

import {
  ArrowLeft,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  HelpCircle,
  Send,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function ContactPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('문의가 완료되었습니다.');
    setTimeout(() => {
      router.push('/');
    }, 500);
  };

  return (
    <main className="min-h-screen bg-[var(--color-background-primary)]">
      <div className="max-w-4xl mx-auto px-[var(--spacing-4)] py-[var(--spacing-8)]">
        {/* 헤더 */}
        <header className="mb-[var(--spacing-8)] animate-slide-down">
          <Link
            href="/"
            className="inline-flex items-center gap-[var(--spacing-2)] text-[var(--color-brand-secondary)] hover:text-[var(--color-brand-tertiary)] font-medium mb-[var(--spacing-4)] transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            홈으로 돌아가기
          </Link>

          <div className="flex items-center gap-[var(--spacing-3)] mb-[var(--spacing-4)]">
            <div className="w-12 h-12 bg-[var(--color-brand-primary)] rounded-lg flex items-center justify-center shadow-[var(--shadow-brand-sm)]">
              <MessageCircle className="w-6 h-6 text-[var(--color-brand-secondary)]" aria-hidden />
            </div>
            <div>
              <h1 className="text-heading-1 text-[var(--color-text-primary)]">고객센터</h1>
              <p className="text-[var(--color-text-tertiary)] text-body-small">
                언제든지 문의해주세요. 빠르게 답변드리겠습니다.
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[var(--spacing-8)] animate-fade-in">
          {/* 연락처 정보 */}
          <aside className="lg:col-span-1">
            <section className="bg-[var(--color-background-secondary)] rounded-lg p-[var(--spacing-6)] mb-[var(--spacing-6)] shadow-[var(--shadow-card)]">
              <h2 className="text-heading-4 text-[var(--color-text-primary)] mb-[var(--spacing-4)]">
                연락처 정보
              </h2>
              <div className="space-y-[var(--spacing-4)]">
                <div className="flex items-center gap-[var(--spacing-3)]">
                  <div className="w-10 h-10 bg-[var(--color-brand-primary)] rounded-lg flex items-center justify-center shadow-[var(--shadow-brand-sm)]">
                    <Phone className="w-5 h-5 text-[var(--color-brand-secondary)]" aria-hidden />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--color-text-primary)] text-body">전화 문의</p>
                    <p className="text-[var(--color-text-secondary)] text-body-small">02-1234-5678</p>
                  </div>
                </div>

                <div className="flex items-center gap-[var(--spacing-3)]">
                  <div className="w-10 h-10 bg-[var(--color-brand-primary)] rounded-lg flex items-center justify-center shadow-[var(--shadow-brand-sm)]">
                    <Mail className="w-5 h-5 text-[var(--color-brand-secondary)]" aria-hidden />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--color-text-primary)] text-body">이메일 문의</p>
                    <p className="text-[var(--color-text-secondary)] text-body-small">
                      support@k-spot.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-[var(--spacing-3)]">
                  <div className="w-10 h-10 bg-[var(--color-brand-primary)] rounded-lg flex items-center justify-center shadow-[var(--shadow-brand-sm)]">
                    <Clock className="w-5 h-5 text-[var(--color-brand-secondary)]" aria-hidden />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--color-text-primary)] text-body">운영 시간</p>
                    <p className="text-[var(--color-text-secondary)] text-body-small">
                      평일 09:00 - 18:00
                    </p>
                    <p className="text-[var(--color-text-tertiary)] text-caption">
                      (주말 및 공휴일 휴무)
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 자주 묻는 질문 */}
            <section className="bg-[var(--color-background-primary)] border border-[var(--color-border-primary)] rounded-lg p-[var(--spacing-6)] shadow-[var(--shadow-card)]">
              <h2 className="text-heading-4 text-[var(--color-text-primary)] mb-[var(--spacing-4)] flex items-center gap-[var(--spacing-2)]">
                <HelpCircle className="w-5 h-5 text-[var(--color-brand-secondary)]" aria-hidden />
                자주 묻는 질문
              </h2>
              <ul className="space-y-[var(--spacing-3)]">
                <li className="border-l-4 border-[var(--color-brand-primary)] pl-[var(--spacing-4)]">
                  <p className="font-medium text-[var(--color-text-primary)] text-body-small">
                    회원가입은 어떻게 하나요?
                  </p>
                  <p className="text-[var(--color-text-secondary)] text-body-small mt-[var(--spacing-1)]">
                    홈페이지 우상단의 프로필 아이콘을 클릭하여 회원가입을 진행할 수 있습니다.
                  </p>
                </li>
                <li className="border-l-4 border-[var(--color-brand-primary)] pl-[var(--spacing-4)]">
                  <p className="font-medium text-[var(--color-text-primary)] text-body-small">
                    촬영지 정보는 정확한가요?
                  </p>
                  <p className="text-[var(--color-text-secondary)] text-body-small mt-[var(--spacing-1)]">
                    모든 촬영지 정보는 신뢰할 수 있는 API를 통해 정보를 제공합니다.
                  </p>
                </li>
                <li className="border-l-4 border-[var(--color-brand-primary)] pl-[var(--spacing-4)]">
                  <p className="font-medium text-[var(--color-text-primary)] text-body-small">
                    회원가입을 하지 않으면 불이익이 있나요?
                  </p>
                  <p className="text-[var(--color-text-secondary)] text-body-small mt-[var(--spacing-1)]">
                    회원가입을 하신 후에 나만의 동선 저장하기 기능을 사용하실 수 있습니다.
                  </p>
                </li>
              </ul>
            </section>
          </aside>

          {/* 문의 양식 */}
          <section className="lg:col-span-2">
            <div className="bg-[var(--color-background-primary)] border border-[var(--color-border-primary)] rounded-lg p-[var(--spacing-6)] shadow-[var(--shadow-card)]">
              <h2 className="text-heading-4 text-[var(--color-text-primary)] mb-[var(--spacing-6)]">
                문의하기
              </h2>

              <form className="space-y-[var(--spacing-6)]" onSubmit={handleSubmit}>
                {/* 이름, 이메일 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-4)]">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-body-small font-medium text-[var(--color-text-primary)] mb-[var(--spacing-2)]"
                    >
                      이름 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-[var(--spacing-3)] py-[var(--spacing-2)] border border-[var(--color-border-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:border-transparent text-body"
                      placeholder="이름을 입력해주세요"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-body-small font-medium text-[var(--color-text-primary)] mb-[var(--spacing-2)]"
                    >
                      이메일 *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-[var(--spacing-3)] py-[var(--spacing-2)] border border-[var(--color-border-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:border-transparent text-body"
                      placeholder="이메일을 입력해주세요"
                    />
                  </div>
                </div>

                {/* 문의 유형 */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-body-small font-medium text-[var(--color-text-primary)] mb-[var(--spacing-2)]"
                  >
                    문의 유형 *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-[var(--spacing-3)] py-[var(--spacing-2)] border border-[var(--color-border-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:border-transparent text-body"
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
                    className="block text-body-small font-medium text-[var(--color-text-primary)] mb-[var(--spacing-2)]"
                  >
                    문의 내용 *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-[var(--spacing-3)] py-[var(--spacing-2)] border border-[var(--color-border-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:border-transparent text-body"
                    placeholder="문의하실 내용을 자세히 적어주세요"
                  ></textarea>
                </div>

                {/* 개인정보 동의 */}
                <div className="flex items-start gap-[var(--spacing-3)]">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    required
                    className="mt-[var(--spacing-1)] w-4 h-4 text-[var(--color-brand-secondary)] border-[var(--color-border-primary)] rounded focus:ring-[var(--color-brand-secondary)]"
                  />
                  <label htmlFor="privacy" className="text-body-small text-[var(--color-text-secondary)]">
                    개인정보 수집 및 이용에 동의합니다.
                    <Link
                      href="/privacy"
                      className="text-[var(--color-brand-secondary)] hover:text-[var(--color-brand-tertiary)] underline"
                    >
                      개인정보처리방침
                    </Link>
                    을 확인했습니다.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-tertiary)] text-[var(--color-text-inverse)] font-medium py-[var(--spacing-3)] px-[var(--spacing-6)] rounded-lg transition-colors duration-200 flex items-center justify-center gap-[var(--spacing-2)] text-button-large shadow-[var(--shadow-button-hover)]"
                >
                  <Send className="w-5 h-5" aria-hidden />
                  문의하기
                </button>
              </form>
            </div>

            {/* 추가 안내 */}
            <section className="mt-[var(--spacing-12)] bg-[var(--color-brand-primary)] rounded-lg p-[var(--spacing-6)] shadow-[var(--shadow-brand-md)]">
              <h3 className="text-heading-4 text-[var(--color-text-primary)] mb-[var(--spacing-4)] flex items-center gap-[var(--spacing-2)]">
                문의 시 참고사항
              </h3>
              <ul className="text-[var(--color-text-secondary)] mb-[var(--spacing-4)] text-body list-disc pl-[var(--spacing-4)]">
                <li>• 문의하신 내용에 대한 답변은 이메일로 발송됩니다.</li>
                <li>• 일반적인 문의는 1-2일 내에 답변드립니다.</li>
                <li>• 긴급한 문의는 전화로 연락해주시기 바랍니다.</li>
                <li>• 개인정보는 문의 처리 목적으로만 사용됩니다.</li>
              </ul>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
