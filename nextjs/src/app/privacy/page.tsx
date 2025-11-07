import { ArrowLeft, Shield, Eye, Lock, UserCheck, FileText, Clock } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침 - K-SPOT',
  description: 'K-SPOT의 개인정보 수집 및 이용에 대한 정책을 확인하세요.',
  keywords: ['개인정보처리방침', '개인정보보호', '프라이버시', '정책'],
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background-primary)]">
      <div className="max-w-4xl mx-auto px-[var(--spacing-4)] py-[var(--spacing-8)]">
        {/* 헤더 */}
        <header className="mb-[var(--spacing-8)]">
          <Link
            href="/"
            className="inline-flex items-center gap-[var(--spacing-2)] text-[var(--color-brand-secondary)] hover:text-[var(--color-brand-tertiary)] font-medium mb-[var(--spacing-4)] transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            홈으로 돌아가기
          </Link>

          <div className="flex items-center gap-[var(--spacing-3)] mb-[var(--spacing-4)]">
            <div className="w-12 h-12 bg-[var(--color-brand-primary)] rounded-lg flex items-center justify-center shadow-[var(--shadow-brand-sm)]">
              <Shield className="w-6 h-6 text-[var(--color-brand-secondary)]" aria-hidden />
            </div>
            <div>
              <h1 className="text-heading-1 text-[var(--color-text-primary)]">개인정보처리방침</h1>
              <p className="text-[var(--color-text-tertiary)] text-body-small">
                K-SPOT의 개인정보 수집 및 이용 정책
              </p>
            </div>
          </div>
        </header>

        {/* 최종 업데이트 정보 */}
        <div className="bg-[var(--color-brand-primary)] rounded-lg p-[var(--spacing-4)] mb-[var(--spacing-8)] flex items-center gap-[var(--spacing-3)]">
          <Clock className="w-5 h-5 text-[var(--color-brand-secondary)]" aria-hidden />
          <div>
            <p className="font-medium text-[var(--color-text-primary)]">최종 업데이트</p>
            <p className="text-[var(--color-text-secondary)] text-body-small">2024년 1월 1일</p>
          </div>
        </div>

        {/* 개인정보처리방침 내용 */}
        <div className="bg-[var(--color-background-primary)] border border-[var(--color-border-primary)] rounded-lg p-[var(--spacing-6)] shadow-[var(--shadow-card)] space-y-[var(--spacing-8)]">
          
          {/* 1. 개인정보의 처리 목적 */}
          <section>
            <div className="flex items-center gap-[var(--spacing-3)] mb-[var(--spacing-4)]">
              <div className="w-8 h-8 bg-[var(--color-brand-primary)] rounded-lg flex items-center justify-center">
                <Eye className="w-4 h-4 text-[var(--color-brand-secondary)]" aria-hidden />
              </div>
              <h2 className="text-heading-3 text-[var(--color-text-primary)]">1. 개인정보의 처리 목적</h2>
            </div>
            <div className="pl-[var(--spacing-11)] space-y-[var(--spacing-3)]">
              <p className="text-[var(--color-text-secondary)] text-body leading-relaxed">
                K-SPOT은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
              </p>
              <ul className="space-y-[var(--spacing-2)] text-[var(--color-text-secondary)] text-body">
                <li>• 회원 가입 및 관리</li>
                <li>• 서비스 제공 및 계약의 이행</li>
                <li>• 고객 상담 및 불만 처리</li>
                <li>• 마케팅 및 광고에의 활용</li>
                <li>• 서비스 개선 및 신규 서비스 개발</li>
              </ul>
            </div>
          </section>

          {/* 2. 개인정보의 처리 및 보유기간 */}
          <section>
            <div className="flex items-center gap-[var(--spacing-3)] mb-[var(--spacing-4)]">
              <div className="w-8 h-8 bg-[var(--color-brand-primary)] rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-[var(--color-brand-secondary)]" aria-hidden />
              </div>
              <h2 className="text-heading-3 text-[var(--color-text-primary)]">2. 개인정보의 처리 및 보유기간</h2>
            </div>
            <div className="pl-[var(--spacing-11)] space-y-[var(--spacing-3)]">
              <p className="text-[var(--color-text-secondary)] text-body leading-relaxed">
                K-SPOT은 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
              </p>
              <div className="bg-[var(--color-background-secondary)] rounded-lg p-[var(--spacing-4)]">
                <h3 className="font-medium text-[var(--color-text-primary)] mb-[var(--spacing-2)]">보유기간</h3>
                <ul className="space-y-[var(--spacing-1)] text-[var(--color-text-secondary)] text-body-small">
                  <li>• 회원정보: 회원 탈퇴 시까지</li>
                  <li>• 서비스 이용기록: 3년</li>
                  <li>• 고객 상담 기록: 3년</li>
                  <li>• 결제 정보: 5년 (전자상거래법)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. 처리하는 개인정보의 항목 */}
          <section>
            <div className="flex items-center gap-[var(--spacing-3)] mb-[var(--spacing-4)]">
              <div className="w-8 h-8 bg-[var(--color-brand-primary)] rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-[var(--color-brand-secondary)]" aria-hidden />
              </div>
              <h2 className="text-heading-3 text-[var(--color-text-primary)]">3. 처리하는 개인정보의 항목</h2>
            </div>
            <div className="pl-[var(--spacing-11)] space-y-[var(--spacing-4)]">
              <div className="bg-[var(--color-background-secondary)] rounded-lg p-[var(--spacing-4)]">
                <h3 className="font-medium text-[var(--color-text-primary)] mb-[var(--spacing-2)]">필수항목</h3>
                <ul className="space-y-[var(--spacing-1)] text-[var(--color-text-secondary)] text-body-small">
                  <li>• 이메일 주소</li>
                  <li>• 비밀번호</li>
                  <li>• 이름 (닉네임)</li>
                </ul>
              </div>
              <div className="bg-[var(--color-background-secondary)] rounded-lg p-[var(--spacing-4)]">
                <h3 className="font-medium text-[var(--color-text-primary)] mb-[var(--spacing-2)]">자동 수집 항목</h3>
                <ul className="space-y-[var(--spacing-1)] text-[var(--color-text-secondary)] text-body-small">
                  <li>• IP 주소</li>
                  <li>• 쿠키</li>
                  <li>• 서비스 이용 기록</li>
                  <li>• 접속 로그</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. 개인정보의 제3자 제공 */}
          <section>
            <div className="flex items-center gap-[var(--spacing-3)] mb-[var(--spacing-4)]">
              <div className="w-8 h-8 bg-[var(--color-brand-primary)] rounded-lg flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-[var(--color-brand-secondary)]" aria-hidden />
              </div>
              <h2 className="text-heading-3 text-[var(--color-text-primary)]">4. 개인정보의 제3자 제공</h2>
            </div>
            <div className="pl-[var(--spacing-11)]">
              <p className="text-[var(--color-text-secondary)] text-body leading-relaxed">
                K-SPOT은 원칙적으로 정보주체의 개인정보를 수집·이용 목적으로 명시한 범위 내에서 처리하며, 정보주체의 사전 동의 없이는 본래의 목적 범위를 초과하여 처리하거나 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다.
              </p>
              <ul className="mt-[var(--spacing-3)] space-y-[var(--spacing-2)] text-[var(--color-text-secondary)] text-body">
                <li>• 정보주체로부터 별도의 동의를 받은 경우</li>
                <li>• 법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여 불가피한 경우</li>
                <li>• 공공기관이 법령 등에서 정하는 소관 업무의 수행을 위하여 불가피한 경우</li>
              </ul>
            </div>
          </section>

          {/* 5. 개인정보 처리의 위탁 */}
          <section>
            <div className="flex items-center gap-[var(--spacing-3)] mb-[var(--spacing-4)]">
              <div className="w-8 h-8 bg-[var(--color-brand-primary)] rounded-lg flex items-center justify-center">
                <Lock className="w-4 h-4 text-[var(--color-brand-secondary)]" aria-hidden />
              </div>
              <h2 className="text-heading-3 text-[var(--color-text-primary)]">5. 개인정보 처리의 위탁</h2>
            </div>
            <div className="pl-[var(--spacing-11)]">
              <p className="text-[var(--color-text-secondary)] text-body leading-relaxed mb-[var(--spacing-3)]">
                K-SPOT은 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
              </p>
              <div className="bg-[var(--color-background-secondary)] rounded-lg p-[var(--spacing-4)]">
                <h3 className="font-medium text-[var(--color-text-primary)] mb-[var(--spacing-2)]">위탁업체 및 업무</h3>
                <ul className="space-y-[var(--spacing-1)] text-[var(--color-text-secondary)] text-body-small">
                  <li>• 클라우드 서비스 제공업체: 서버 운영 및 관리</li>
                  <li>• 이메일 발송 업체: 이메일 발송 서비스</li>
                  <li>• 결제 대행업체: 결제 처리 및 관리</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 6. 정보주체의 권리·의무 및 행사방법 */}
          <section>
            <div className="flex items-center gap-[var(--spacing-3)] mb-[var(--spacing-4)]">
              <div className="w-8 h-8 bg-[var(--color-brand-primary)] rounded-lg flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-[var(--color-brand-secondary)]" aria-hidden />
              </div>
              <h2 className="text-heading-3 text-[var(--color-text-primary)]">6. 정보주체의 권리·의무 및 행사방법</h2>
            </div>
            <div className="pl-[var(--spacing-11)] space-y-[var(--spacing-3)]">
              <p className="text-[var(--color-text-secondary)] text-body leading-relaxed">
                정보주체는 K-SPOT에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
              </p>
              <ul className="space-y-[var(--spacing-2)] text-[var(--color-text-secondary)] text-body">
                <li>• 개인정보 처리현황 통지요구</li>
                <li>• 개인정보 열람요구</li>
                <li>• 개인정보 정정·삭제요구</li>
                <li>• 개인정보 처리정지요구</li>
              </ul>
              <div className="bg-[var(--color-brand-primary)] rounded-lg p-[var(--spacing-4)] mt-[var(--spacing-4)]">
                <p className="text-[var(--color-text-primary)] text-body-small">
                  <strong>권리 행사 방법:</strong> 개인정보보호법 시행령 제41조에 따라 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 K-SPOT은 이에 대해 지체없이 조치하겠습니다.
                </p>
              </div>
            </div>
          </section>

          {/* 연락처 정보 */}
          <section className="border-t border-[var(--color-border-primary)] pt-[var(--spacing-6)]">
            <h2 className="text-heading-3 text-[var(--color-text-primary)] mb-[var(--spacing-4)]">개인정보보호 담당자</h2>
            <div className="bg-[var(--color-background-secondary)] rounded-lg p-[var(--spacing-4)]">
              <div className="space-y-[var(--spacing-2)] text-[var(--color-text-secondary)] text-body">
                <p><strong>담당자:</strong> 개인정보보호팀</p>
                <p><strong>연락처:</strong> privacy@k-spot.com</p>
                <p><strong>전화:</strong> 02-1234-5678</p>
              </div>
            </div>
          </section>
        </div>

        {/* 하단 안내 */}
        <div className="mt-[var(--spacing-8)] text-center">
          <p className="text-[var(--color-text-tertiary)] text-body-small">
            본 개인정보처리방침은 2024년 1월 1일부터 적용됩니다.
          </p>
        </div>
      </div>
    </main>
  );
}