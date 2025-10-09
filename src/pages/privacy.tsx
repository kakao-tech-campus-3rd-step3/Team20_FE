import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft, Shield, FileText, Eye, Lock, Database } from 'lucide-react';

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-(--color-background-primary)">
      <div className="max-w-4xl mx-auto px-(--spacing-4) py-(--spacing-8)">
        {/* 헤더 */}
        <header className="mb-(--spacing-8) animate-slide-down">
          <Link
            to="/"
            className="inline-flex items-center gap-(--spacing-2) text-(--color-brand-secondary) hover:text-(--color-brand-tertiary) font-medium mb-(--spacing-4) transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            홈으로 돌아가기
          </Link>

          <div className="flex items-center gap-(--spacing-3) mb-(--spacing-4)">
            <div className="w-12 h-12 bg-(--color-brand-primary) rounded-lg flex items-center justify-center shadow-(--shadow-brand-sm)">
              <Shield className="w-6 h-6 text-(--color-brand-secondary)" aria-hidden />
            </div>
            <div>
              <h1 className="text-heading-1 text-(--color-text-primary)">개인정보처리방침</h1>
              <p className="text-(--color-text-tertiary) text-body-small">
                마지막 업데이트: 2025년 10월 1일
              </p>
            </div>
          </div>
        </header>

        {/* 본문 내용 */}
        <article className="prose prose-lg max-w-none animate-fade-in">
          <section className="bg-(--color-background-secondary) rounded-lg p-(--spacing-6) mb-(--spacing-8) shadow-(--shadow-card)">
            <h2 className="text-heading-4 text-(--color-text-primary) mb-(--spacing-4) flex items-center gap-(--spacing-2)">
              <FileText className="w-5 h-5 text-(--color-brand-secondary)" aria-hidden />
              개인정보 수집 및 이용에 대한 안내
            </h2>
            <p className="text-(--color-text-primary) leading-relaxed text-body">
              K-SPOT은 이용자의 개인정보를 보호하기 위해 최선을 다하고 있습니다. 본
              개인정보처리방침은 K-SPOT 서비스 이용 시 수집되는 개인정보의 처리에 관한 사항을
              안내합니다.
            </p>
          </section>

          <div className="space-y-(--spacing-8)">
            <section className="animate-slide-up">
              <h2 className="text-heading-2 text-(--color-text-primary) mb-(--spacing-4) flex items-center gap-(--spacing-2)">
                <Eye className="w-6 h-6 text-(--color-brand-secondary)" aria-hidden />
                1. 수집하는 개인정보의 항목
              </h2>
              <div className="bg-(--color-background-primary) border border-(--color-border-primary) rounded-lg p-(--spacing-6) shadow-(--shadow-card)">
                <h3 className="text-heading-5 text-(--color-text-primary) mb-(--spacing-3)">
                  필수 수집 항목
                </h3>
                <ul className="space-y-(--spacing-2) text-(--color-text-secondary) text-body">
                  <li>• 이메일 주소</li>
                  <li>• 닉네임</li>
                  <li>• 서비스 이용 기록</li>
                </ul>

                <h3 className="text-heading-5 text-(--color-text-primary) mb-(--spacing-3) mt-(--spacing-6)">
                  선택 수집 항목
                </h3>
                <ul className="space-y-(--spacing-2) text-(--color-text-secondary) text-body">
                  <li>• 프로필 사진</li>
                  <li>• 관심 카테고리</li>
                  <li>• 위치 정보 (선택적)</li>
                </ul>
              </div>
            </section>

            <section className="animate-slide-up">
              <h2 className="text-heading-2 text-(--color-text-primary) mb-(--spacing-4) flex items-center gap-(--spacing-2)">
                <Database className="w-6 h-6 text-(--color-brand-secondary)" aria-hidden />
                2. 개인정보의 수집 및 이용 목적
              </h2>
              <div className="bg-(--color-background-primary) border border-(--color-border-primary) rounded-lg p-(--spacing-6) shadow-(--shadow-card)">
                <ul className="space-y-(--spacing-3) text-(--color-text-secondary) text-body">
                  <li>• 서비스 제공 및 계약 이행</li>
                  <li>• 회원 식별 및 본인 확인</li>
                  <li>• 고객 상담 및 문의 응답</li>
                  <li>• 서비스 개선 및 신규 서비스 개발</li>
                  <li>• 마케팅 및 광고 활용 (동의 시)</li>
                </ul>
              </div>
            </section>

            <section className="animate-slide-up">
              <h2 className="text-heading-2 text-(--color-text-primary) mb-(--spacing-4) flex items-center gap-(--spacing-2)">
                <Lock className="w-6 h-6 text-(--color-brand-secondary)" aria-hidden />
                3. 개인정보의 보유 및 이용 기간
              </h2>
              <div className="bg-(--color-background-primary) border border-(--color-border-primary) rounded-lg p-(--spacing-6) shadow-(--shadow-card)">
                <p className="text-(--color-text-secondary) mb-(--spacing-4) text-body">
                  회원 탈퇴 시까지 보유하며, 탈퇴 후에는 즉시 파기합니다. 단, 관련 법령에 의해
                  보존이 필요한 경우 해당 기간 동안 보관합니다.
                </p>
                <div className="text-body-small text-(--color-text-tertiary)">
                  <p>• 계약 또는 청약철회 등에 관한 기록: 5년</p>
                  <p>• 대금결제 및 재화 등의 공급에 관한 기록: 5년</p>
                  <p>• 소비자의 불만 또는 분쟁처리에 관한 기록: 3년</p>
                </div>
              </div>
            </section>

            <section className="animate-slide-up">
              <h2 className="text-heading-2 text-(--color-text-primary) mb-(--spacing-4)">
                4. 개인정보의 제3자 제공
              </h2>
              <div className="bg-(--color-background-primary) border border-(--color-border-primary) rounded-lg p-(--spacing-6) shadow-(--shadow-card)">
                <p className="text-(--color-text-secondary) text-body">
                  K-SPOT은 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 이용자가
                  사전에 동의한 경우나 법령의 규정에 의한 경우는 예외로 합니다.
                </p>
              </div>
            </section>

            <section className="animate-slide-up">
              <h2 className="text-heading-2 text-(--color-text-primary) mb-(--spacing-4)">
                5. 개인정보 보호를 위한 기술적/관리적 대책
              </h2>
              <div className="bg-(--color-background-primary) border border-(--color-border-primary) rounded-lg p-(--spacing-6) shadow-(--shadow-card)">
                <ul className="space-y-(--spacing-3) text-(--color-text-secondary) text-body">
                  <li>• 개인정보 암호화</li>
                  <li>• 해킹 등에 대비한 기술적 대책</li>
                  <li>• 개인정보에 대한 접근 제한</li>
                  <li>• 접속기록의 보관 및 위변조 방지</li>
                  <li>• 개인정보의 안전한 저장을 위한 기술의 적용</li>
                </ul>
              </div>
            </section>

            <section className="animate-slide-up">
              <h2 className="text-heading-2 text-(--color-text-primary) mb-(--spacing-4)">
                6. 개인정보 보호책임자
              </h2>
              <div className="bg-(--color-background-primary) border border-(--color-border-primary) rounded-lg p-(--spacing-6) shadow-(--shadow-card)">
                <div className="space-y-(--spacing-2) text-(--color-text-secondary) text-body">
                  <p>
                    <strong>성명:</strong> 김개인정보
                  </p>
                  <p>
                    <strong>소속:</strong> K-SPOT 개인정보보호팀
                  </p>
                  <p>
                    <strong>연락처:</strong> privacy@k-spot.com
                  </p>
                  <p>
                    <strong>전화:</strong> 02-1234-5678
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* 연락처 섹션 */}
          <footer className="mt-(--spacing-12) bg-(--color-brand-primary) rounded-lg p-(--spacing-6) shadow-(--shadow-brand-md)">
            <h2 className="text-heading-4 text-(--color-text-primary) mb-(--spacing-4)">
              문의사항이 있으신가요?
            </h2>
            <p className="text-(--color-text-secondary) mb-(--spacing-4) text-body">
              개인정보처리방침에 대한 문의사항이나 개인정보 관련 요청사항이 있으시면 언제든지
              연락해주세요.
            </p>
            <div className="flex flex-wrap gap-(--spacing-4)">
              <Link
                to="/contact"
                className="inline-flex items-center gap-(--spacing-2) bg-(--color-brand-secondary) hover:bg-(--color-brand-tertiary) text-(--color-text-inverse) font-medium py-(--spacing-2) px-(--spacing-4) rounded-lg transition-colors duration-200 text-button shadow-(--shadow-button-hover)"
              >
                고객센터 문의
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </main>
  );
}
