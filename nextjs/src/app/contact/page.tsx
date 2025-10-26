import { ArrowLeft, MessageCircle, Mail, Phone, Clock, HelpCircle} from 'lucide-react';
import Link from 'next/link';
import { ContactForm } from '@/features/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '고객센터 - K-SPOT',
  description: '언제든지 문의해주세요. 빠르게 답변드리겠습니다.',
  keywords: ['고객센터', '문의', '지원', '연락처'],
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-(--color-background-primary)">
      <div className="max-w-4xl mx-auto px-(--spacing-4) py-(--spacing-8)">
        {/* 헤더 */}
        <header className="mb-(--spacing-8) animate-slide-down">
          <Link
            href="/"
            className="inline-flex items-center gap-(--spacing-2) text-(--color-brand-secondary) hover:text-(--color-brand-tertiary) font-medium mb-(--spacing-4) transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            홈으로 돌아가기
          </Link>

          <div className="flex items-center gap-(--spacing-3) mb-(--spacing-4)">
            <div className="w-12 h-12 bg-(--color-brand-primary) rounded-lg flex items-center justify-center shadow-(--shadow-brand-sm)">
              <MessageCircle className="w-6 h-6 text-(--color-brand-secondary)" aria-hidden />
            </div>
            <div>
              <h1 className="text-heading-1 text-(--color-text-primary)">고객센터</h1>
              <p className="text-(--color-text-tertiary) text-body-small">
                언제든지 문의해주세요. 빠르게 답변드리겠습니다.
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-(--spacing-8) animate-fade-in">
          {/* 연락처 정보 */}
          <aside className="lg:col-span-1">
            <section className="bg-(--color-background-secondary) rounded-lg p-(--spacing-6) mb-(--spacing-6) shadow-(--shadow-card)">
              <h2 className="text-heading-4 text-(--color-text-primary) mb-(--spacing-4)">
                연락처 정보
              </h2>
              <div className="space-y-(--spacing-4)">
                <div className="flex items-center gap-(--spacing-3)">
                  <div className="w-10 h-10 bg-(--color-brand-primary) rounded-lg flex items-center justify-center shadow-(--shadow-brand-sm)">
                    <Phone className="w-5 h-5 text-(--color-brand-secondary)" aria-hidden />
                  </div>
                  <div>
                    <p className="font-medium text-(--color-text-primary) text-body">전화 문의</p>
                    <p className="text-(--color-text-secondary) text-body-small">02-1234-5678</p>
                  </div>
                </div>

                <div className="flex items-center gap-(--spacing-3)">
                  <div className="w-10 h-10 bg-(--color-brand-primary) rounded-lg flex items-center justify-center shadow-(--shadow-brand-sm)">
                    <Mail className="w-5 h-5 text-(--color-brand-secondary)" aria-hidden />
                  </div>
                  <div>
                    <p className="font-medium text-(--color-text-primary) text-body">이메일 문의</p>
                    <p className="text-(--color-text-secondary) text-body-small">
                      support@k-spot.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-(--spacing-3)">
                  <div className="w-10 h-10 bg-(--color-brand-primary) rounded-lg flex items-center justify-center shadow-(--shadow-brand-sm)">
                    <Clock className="w-5 h-5 text-(--color-brand-secondary)" aria-hidden />
                  </div>
                  <div>
                    <p className="font-medium text-(--color-text-primary) text-body">운영 시간</p>
                    <p className="text-(--color-text-secondary) text-body-small">
                      평일 09:00 - 18:00
                    </p>
                    <p className="text-(--color-text-tertiary) text-caption">
                      (주말 및 공휴일 휴무)
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 자주 묻는 질문 */}
            <section className="bg-(--color-background-primary) border border-(--color-border-primary) rounded-lg p-(--spacing-6) shadow-(--shadow-card)">
              <h2 className="text-heading-4 text-(--color-text-primary) mb-(--spacing-4) flex items-center gap-(--spacing-2)">
                <HelpCircle className="w-5 h-5 text-(--color-brand-secondary)" aria-hidden />
                자주 묻는 질문
              </h2>
              <ul className="space-y-(--spacing-3)">
                <li className="border-l-4 border-(--color-brand-primary) pl-(--spacing-4)">
                  <p className="font-medium text-(--color-text-primary) text-body-small">
                    회원가입은 어떻게 하나요?
                  </p>
                  <p className="text-(--color-text-secondary) text-body-small mt-(--spacing-1)">
                    홈페이지 우상단의 프로필 아이콘을 클릭하여 회원가입을 진행할 수 있습니다.
                  </p>
                </li>
                <li className="border-l-4 border-(--color-brand-primary) pl-(--spacing-4)">
                  <p className="font-medium text-(--color-text-primary) text-body-small">
                    촬영지 정보는 정확한가요?
                  </p>
                  <p className="text-(--color-text-secondary) text-body-small mt-(--spacing-1)">
                    모든 촬영지 정보는 신뢰할 수 있는 API를 통해 정보를 제공합니다.
                  </p>
                </li>
                <li className="border-l-4 border-(--color-brand-primary) pl-(--spacing-4)">
                  <p className="font-medium text-(--color-text-primary) text-body-small">
                    회원가입을 하지 않으면 불이익이 있나요?
                  </p>
                  <p className="text-(--color-text-secondary) text-body-small mt-(--spacing-1)">
                    회원가입을 하신 후에 나만의 동선 저장하기 기능을 사용하실 수 있습니다.
                  </p>
                </li>
              </ul>
            </section>
          </aside>

          {/* 문의 양식 */}
          <section className="lg:col-span-2">
            <div className="bg-(--color-background-primary) border border-(--color-border-primary) rounded-lg p-(--spacing-6) shadow-(--shadow-card)">
              <h2 className="text-heading-4 text-(--color-text-primary) mb-(--spacing-6)">
                문의하기
              </h2>

              <ContactForm />
            </div>

            {/* 추가 안내 */}
            <section className="mt-(--spacing-12) bg-(--color-brand-primary) rounded-lg p-(--spacing-6) shadow-(--shadow-brand-md)">
              <h3 className="text-heading-4 text-(--color-text-primary) mb-(--spacing-4) flex items-center gap-(--spacing-2)">
                문의 시 참고사항
              </h3>
              <ul className="text-(--color-text-secondary) mb-(--spacing-4) text-body list-disc pl-(--spacing-4)">
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