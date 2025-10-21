import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft, FileText, Users, AlertCircle } from 'lucide-react';

export const Route = createFileRoute('/terms')({
  component: TermsPage,
});

function TermsPage() {
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
              <FileText className="w-6 h-6 text-(--color-brand-secondary)" aria-hidden />
            </div>
            <div>
              <h1 className="text-heading-1 text-(--color-text-primary)">이용약관</h1>
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
              <Users className="w-5 h-5 text-(--color-brand-secondary)" aria-hidden />
              서비스 이용약관
            </h2>
            <p className="text-(--color-text-primary) leading-relaxed text-body">
              본 약관은 K-SPOT 서비스(이하 "서비스")를 이용하는 이용자와 서비스 제공자 간의 권리,
              의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <div className="space-y-(--spacing-8)">
            <section className="animate-slide-up">
              <h2 className="text-heading-2 text-(--color-text-primary) mb-(--spacing-4)">
                제1조 (목적)
              </h2>
              <div className="bg-(--color-background-primary) border border-(--color-border-primary) rounded-lg p-(--spacing-6) shadow-(--shadow-card)">
                <p className="text-(--color-text-secondary) leading-relaxed text-body">
                  본 약관은 K-SPOT이 제공하는 한국 문화 콘텐츠 관련 서비스의 이용과 관련하여 회사와
                  이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                </p>
              </div>
            </section>

            <section className="animate-slide-up">
              <h2 className="text-heading-2 text-(--color-text-primary) mb-(--spacing-4)">
                제2조 (정의)
              </h2>
              <div className="bg-(--color-background-primary) border border-(--color-border-primary) rounded-lg p-(--spacing-6) shadow-(--shadow-card)">
                <div className="space-y-(--spacing-4) text-(--color-text-secondary) text-body">
                  <div>
                    <p className="font-medium">1. "서비스"란</p>
                    <p className="ml-(--spacing-4)">
                      K-SPOT이 제공하는 한국 문화 콘텐츠 관련 정보 제공, 촬영지 정보, 지도 서비스
                      등을 의미합니다.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">2. "이용자"란</p>
                    <p className="ml-(--spacing-4)">
                      서비스에 접속하여 본 약관에 따라 서비스를 이용하는 회원 및 비회원을
                      의미합니다.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">3. "회원"이란</p>
                    <p className="ml-(--spacing-4)">
                      서비스에 개인정보를 제공하여 회원등록을 한 자로서, 서비스의 정보를 지속적으로
                      제공받으며 서비스를 계속적으로 이용할 수 있는 자를 의미합니다.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="animate-slide-up">
              <h2 className="text-heading-2 text-(--color-text-primary) mb-(--spacing-4)">
                제3조 (약관의 효력 및 변경)
              </h2>
              <div className="bg-(--color-background-primary) border border-(--color-border-primary) rounded-lg p-(--spacing-6) shadow-(--shadow-card)">
                <div className="space-y-(--spacing-4) text-(--color-text-secondary) text-body">
                  <p>
                    1. 본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써
                    효력이 발생합니다.
                  </p>
                  <p>
                    2. 회사는 합리적인 사유가 발생할 경우에는 본 약관을 변경할 수 있으며, 약관이
                    변경되는 경우 변경된 약관의 내용과 시행일을 정하여, 시행일로부터 최소 7일 이전에
                    공지합니다.
                  </p>
                  <p>
                    3. 이용자가 변경된 약관에 동의하지 않는 경우, 이용자는 본인의 회원등록을
                    취소(회원탈퇴)할 수 있으며, 계속 사용하시는 경우에는 약관 변경에 동의한 것으로
                    간주됩니다.
                  </p>
                </div>
              </div>
            </section>

            <section className="animate-slide-up">
              <h2 className="text-heading-2 text-(--color-text-primary) mb-(--spacing-4)">
                제4조 (서비스의 제공 및 변경)
              </h2>
              <div className="bg-(--color-background-primary) border border-(--color-border-primary) rounded-lg p-(--spacing-6) shadow-(--shadow-card)">
                <div className="space-y-(--spacing-4) text-(--color-text-secondary) text-body">
                  <p>1. 회사는 다음과 같은 업무를 수행합니다:</p>
                  <ul className="ml-(--spacing-6) space-y-(--spacing-2)">
                    <li>• 한국 문화 콘텐츠 정보 제공 서비스</li>
                    <li>• 촬영지 정보 및 지도 서비스</li>
                    <li>• 관련 부가서비스 및 기타 회사가 정하는 업무</li>
                  </ul>
                  <p>
                    2. 회사는 서비스의 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해
                    제공할 서비스의 내용을 변경할 수 있습니다.
                  </p>
                </div>
              </div>
            </section>

            <section className="animate-slide-up">
              <h2 className="text-heading-2 text-(--color-text-primary) mb-(--spacing-4)">
                제5조 (서비스의 중단)
              </h2>
              <div className="bg-(--color-background-primary) border border-(--color-border-primary) rounded-lg p-(--spacing-6) shadow-(--shadow-card)">
                <div className="space-y-(--spacing-4) text-(--color-text-secondary) text-body">
                  <p>
                    1. 회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의
                    사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
                  </p>
                  <p>
                    2. 회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자
                    또는 제3자가 입은 손해에 대하여 배상합니다. 단, 회사가 고의 또는 과실이 없음을
                    입증하는 경우에는 그러하지 아니합니다.
                  </p>
                </div>
              </div>
            </section>

            <section className="animate-slide-up">
              <h2 className="text-heading-2 text-(--color-text-primary) mb-(--spacing-4)">
                제6조 (회원가입)
              </h2>
              <div className="bg-(--color-background-primary) border border-(--color-border-primary) rounded-lg p-(--spacing-6) shadow-(--shadow-card)">
                <div className="space-y-(--spacing-4) text-(--color-text-secondary) text-body">
                  <p>
                    1. 이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에
                    동의한다는 의사표시를 함으로서 회원가입을 신청합니다.
                  </p>
                  <p>
                    2. 회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에
                    해당하지 않는 한 회원으로 등록합니다:
                  </p>
                  <ul className="ml-(--spacing-6) space-y-(--spacing-2)">
                    <li>• 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</li>
                    <li>• 등록 내용에 허위, 기재누락, 오기가 있는 경우</li>
                    <li>
                      • 기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="animate-slide-up">
              <h2 className="text-heading-2 text-(--color-text-primary) mb-(--spacing-4)">
                제7조 (회원 탈퇴 및 자격 상실 등)
              </h2>
              <div className="bg-(--color-background-primary) border border-(--color-border-primary) rounded-lg p-(--spacing-6) shadow-(--shadow-card)">
                <div className="space-y-(--spacing-4) text-(--color-text-secondary) text-body">
                  <p>
                    1. 회원은 회사에 언제든지 탈퇴를 요청할 수 있으며 회사는 즉시 회원탈퇴를
                    처리합니다.
                  </p>
                  <p>
                    2. 회원이 다음 각 호의 사유에 해당하는 경우, 회사는 회원자격을 제한 및 정지시킬
                    수 있습니다:
                  </p>
                  <ul className="ml-(--spacing-6) space-y-(--spacing-2)">
                    <li>• 가입 신청 시에 허위 내용을 등록한 경우</li>
                    <li>
                      • 다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를
                      위협하는 경우
                    </li>
                    <li>
                      • 서비스를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를
                      하는 경우
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="animate-slide-up">
              <h2 className="text-heading-2 text-(--color-text-primary) mb-(--spacing-4)">
                제8조 (회원에 대한 통지)
              </h2>
              <div className="bg-(--color-background-primary) border border-(--color-border-primary) rounded-lg p-(--spacing-6) shadow-(--shadow-card)">
                <div className="space-y-(--spacing-4) text-(--color-text-secondary) text-body">
                  <p>
                    1. 회사가 회원에 대한 통지를 하는 경우, 회원이 회사와 미리 약정하여 지정한
                    전자우편 주소로 할 수 있습니다.
                  </p>
                  <p>
                    2. 회사는 불특정다수 회원에 대한 통지의 경우 1주일이상 서비스 게시판에
                    게시함으로서 개별 통지에 갈음할 수 있습니다.
                  </p>
                </div>
              </div>
            </section>

            <section className="animate-slide-up">
              <h2 className="text-heading-2 text-(--color-text-primary) mb-(--spacing-4)">
                제9조 (개인정보보호)
              </h2>
              <div className="bg-(--color-background-primary) border border-(--color-border-primary) rounded-lg p-(--spacing-6) shadow-(--shadow-card)">
                <div className="space-y-(--spacing-4) text-(--color-text-secondary) text-body">
                  <p>
                    1. 회사는 이용자의 개인정보 수집시 서비스제공을 위하여 필요한 범위에서 최소한의
                    개인정보를 수집합니다.
                  </p>
                  <p>2. 회사는 회원가입시 구매계약이행에 필요한 정보를 미리 수집하지 않습니다.</p>
                  <p>
                    3. 회사는 이용자의 개인정보를 수집·이용하는 때에는 당해 이용자에게 그 목적을
                    고지하고 동의를 받습니다.
                  </p>
                </div>
              </div>
            </section>

            <section className="animate-slide-up">
              <h2 className="text-heading-2 text-(--color-text-primary) mb-(--spacing-4)">
                제10조 (면책조항)
              </h2>
              <div className="bg-(--color-background-primary) border border-(--color-border-primary) rounded-lg p-(--spacing-6) shadow-(--shadow-card)">
                <div className="space-y-(--spacing-4) text-(--color-text-secondary) text-body">
                  <p>
                    1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는
                    경우에는 서비스 제공에 관한 책임이 면제됩니다.
                  </p>
                  <p>
                    2. 회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지
                    않습니다.
                  </p>
                  <p>
                    3. 회사는 이용자가 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을
                    지지 않으며 그 밖에 서비스를 통하여 얻은 자료로 인한 손해에 관하여는 책임을 지지
                    않습니다.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* 연락처 섹션 */}
          <footer className="mt-(--spacing-12) bg-(--color-brand-primary) rounded-lg p-(--spacing-6) shadow-(--shadow-brand-md)">
            <h2 className="text-heading-4 text-(--color-text-primary) mb-(--spacing-4) flex items-center gap-(--spacing-2)">
              <AlertCircle className="w-5 h-5 text-(--color-brand-secondary)" aria-hidden />
              문의사항이 있으신가요?
            </h2>
            <p className="text-(--color-text-secondary) mb-(--spacing-4) text-body">
              이용약관에 대한 문의사항이나 서비스 이용과 관련된 문제가 있으시면 언제든지
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
