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
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제1조 (목적)</h2>
              <p className="text-muted-foreground leading-relaxed">
                본 약관은 protalk(이하 "회사")가 제공하는 AI 기반 영어 회화 학습 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제2조 (정의)</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>본 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>"서비스"란 회사가 제공하는 AI 기반 영어 회화 학습 플랫폼을 의미합니다.</li>
                  <li>"이용자"란 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 의미합니다.</li>
                  <li>"회원"이란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며 회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 의미합니다.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제3조 (약관의 효력 및 변경)</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>1. 본 약관은 서비스를 이용하고자 하는 모든 이용자에 대하여 그 효력을 발생합니다.</p>
                <p>2. 회사는 합리적인 사유가 발생할 경우 관련 법령에 위반되지 않는 범위에서 본 약관을 변경할 수 있습니다.</p>
                <p>3. 약관이 변경되는 경우 회사는 변경사항을 시행일자 7일 전부터 서비스 내 공지사항을 통해 공지합니다.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제4조 (서비스의 제공)</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>1. 회사는 다음과 같은 서비스를 제공합니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>AI 기반 영어 회화 학습 서비스</li>
                  <li>비즈니스 시나리오별 영어 회화 연습</li>
                  <li>학습 진도 관리 및 피드백 제공</li>
                  <li>기타 회사가 정하는 서비스</li>
                </ul>
                <p>2. 서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제5조 (이용자의 의무)</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>이용자는 다음 행위를 하여서는 안 됩니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>신청 또는 변경 시 허위내용의 등록</li>
                  <li>회사가 게시한 정보의 변경</li>
                  <li>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                  <li>회사 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                  <li>회사 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                  <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제6조 (저작권의 귀속 및 이용제한)</h2>
              <p className="text-muted-foreground leading-relaxed">
                1. 회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.<br/>
                2. 이용자는 서비스를 이용함으로써 얻은 정보 중 회사에게 지적재산권이 귀속된 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Terms;