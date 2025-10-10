import { Header } from "@/components/Header";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            홈으로 돌아가기
          </Link>
          
          <h1 className="text-3xl font-bold text-foreground mb-8">이용약관</h1>
          
          <div className="prose prose-gray max-w-none space-y-8">
            <div className="space-y-4">
              <p className="text-muted-foreground">[서비스명]: ProTalk</p>
              <p className="text-muted-foreground">[운영자]: 배효진</p>
              <p className="text-muted-foreground">[연락처]: protalk.biz@gmail.com</p>
              <p className="text-muted-foreground">[개정일]: 2025년 10월 16일</p>
            </div>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제1조 (목적)</h2>
              <p className="text-muted-foreground leading-relaxed">
                이 약관은 ProTalk (이하 "회사")가 제공하는 <strong>AI 기반 실무 영어 회화 훈련 서비스(이하 "서비스")</strong>의 이용조건 및 절차, 이용자와 회사의 권리, 의무, 책임사항 등을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제2조 (정의)</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>"서비스"란 회사가 제공하는 AI 음성 회화, 피드백, 학습 콘텐츠 등 영어 회화 훈련 기능 일체를 말합니다.</p>
                <p>"이용자"란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 또는 비회원을 말합니다.</p>
                <p>"회원"이란 회사에 개인정보를 제공하고 본 약관에 동의하여 서비스에 가입한 자를 의미합니다.</p>
                <p>"콘텐츠"란 서비스 내 제공되는 음성, 문장, 피드백, 시나리오, 학습 결과 등 일체의 디지털 자료를 말합니다.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제3조 (약관의 효력 및 변경)</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>본 약관은 서비스 화면 또는 기타 방법을 통해 공지함으로써 효력이 발생합니다.</p>
                <p>회사는 관계법령을 위배하지 않는 범위 내에서 약관을 개정할 수 있으며, 변경 시 최소 7일 전 공지합니다.</p>
                <p>이용자가 변경된 약관에 동의하지 않는 경우, 서비스 이용을 중단하고 탈퇴할 수 있습니다.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제4조 (서비스의 제공 및 변경)</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>회사는 회원에게 다음과 같은 서비스를 제공합니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>AI 기반 영어 회화 시뮬레이션</li>
                  <li>발화 피드백 및 리프레이즈 기능</li>
                  <li>학습 결과 요약 및 표현 카드 제공</li>
                  <li>루틴 트래킹 등 부가 기능</li>
                </ul>
                <p>회사는 기술적 사유 또는 서비스 개선을 위해 서비스 내용을 변경할 수 있습니다. 변경 시 사전 공지합니다.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제5조 (회원가입)</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>회원가입은 이용자가 회사가 정한 양식에 따라 정보 입력 및 약관 동의 후, 회사의 승낙으로 완료됩니다.</p>
                <p>회사는 다음의 경우 회원가입을 거부하거나 취소할 수 있습니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>허위 정보를 기재한 경우</li>
                  <li>타인의 정보를 도용한 경우</li>
                  <li>기타 부정한 목적으로 가입한 경우</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제6조 (회원의 의무)</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>회원은 서비스 이용 시 다음 행위를 해서는 안 됩니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>타인의 정보 도용 또는 사칭</li>
                  <li>서비스 운영 방해</li>
                  <li>저작권 포함 제3자의 권리 침해</li>
                  <li>음란, 폭력적, 불법적 내용의 입력</li>
                </ul>
                <p>위반 시, 회사는 사전통지 없이 서비스 이용을 제한하거나 탈퇴 처리할 수 있습니다.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제7조 (이용요금 및 결제)</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>서비스의 일부는 유료로 제공되며, 이용자는 결제 전 요금에 대해 충분히 고지받고 동의한 후 결제합니다.</p>
                <p>결제는 회사가 지정한 결제 수단(신용카드, 간편결제 등)을 통해 이루어집니다.</p>
                <p>유료 서비스는 결제 시 명시된 기간 동안 이용 가능하며, 환불 정책은 회사의 환불 기준에 따릅니다.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제8조 (환불 및 취소)</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>이용자가 결제 후 7일 이내이면서, 서비스 미사용 또는 일부만 사용한 경우에는 환불이 가능합니다.</p>
                <p>다음의 경우에는 환불이 제한됩니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>전부 사용한 경우</li>
                  <li>학습 결과물(스크립트, 표현 카드 등)을 다운로드하거나 저장한 경우</li>
                  <li>무단 사용 및 비정상 이용이 확인된 경우</li>
                </ul>
                <p>환불 요청은 이메일 또는 고객센터를 통해 접수되며, 환불은 접수일 기준 7영업일 이내 처리됩니다.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제9조 (서비스의 중단 및 종료)</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>회사는 다음 사유가 발생한 경우 일시적 또는 영구적으로 서비스를 중단할 수 있습니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>시스템 점검, 보수</li>
                  <li>서비스 구조 개편</li>
                  <li>천재지변, 정전, 서버 장애 등 불가항력 사유</li>
                </ul>
                <p>유료 서비스 종료 시, 회사는 30일 전 공지하고, 미사용 금액에 대해 환불 조치합니다.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제10조 (저작권 및 콘텐츠 사용)</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>서비스 내 제공되는 모든 콘텐츠(시나리오, 피드백, 음성 데이터 등)는 회사에 저작권이 있습니다.</p>
                <p>이용자는 해당 콘텐츠를 개인 학습 용도 외의 상업적 용도로 사용할 수 없습니다.</p>
                <p>회원이 AI 대화 중 입력한 문장은 서비스 개선을 위한 데이터로 사용될 수 있습니다. (비식별화 처리)</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제11조 (개인정보 보호)</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>회사는 개인정보처리방침에 따라 회원의 개인정보를 보호하며,</p>
                <p>개인정보 수집 및 활용, 제3자 제공, 파기 등 모든 사항은 별도 고지된 [개인정보처리방침]을 따릅니다.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제12조 (면책 조항)</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>회사는 다음 사유로 발생한 손해에 대해 책임지지 않습니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>이용자의 기기 오류, 인터넷 연결 문제</li>
                  <li>이용자의 부주의 또는 약관 위반</li>
                  <li>외부 해킹이나 제3자의 공격</li>
                </ul>
                <p>회사는 AI 모델의 출력 정확도에 대해 법적 보증을 하지 않습니다.</p>
                <p>이는 학습 지원 목적의 서비스이며, 실제 회의/면접 성과에 대한 법적 책임은 지지 않습니다.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제13조 (분쟁 해결 및 관할법원)</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>서비스 이용과 관련한 분쟁은 회사의 본사 소재지 관할 법원을 1심 관할로 합니다.</p>
                <p>회사와 이용자 간 분쟁은 원만히 해결하기 위해 최선을 다합니다.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">부칙</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>본 약관은 2025년 10월 16일부터 적용됩니다.</p>
                <p>약관 변경 시, 홈페이지 또는 서비스 내 공지를 통해 사전 안내합니다.</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Terms;
