import { Header } from "@/components/Header";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
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
          
          <h1 className="text-3xl font-bold text-foreground mb-8">개인정보 처리방침</h1>
          
          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">1. 개인정보의 처리목적</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>protalk(이하 "회사")는 다음의 목적을 위하여 개인정보를 처리합니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산</li>
                  <li>회원 관리: 회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원의 부정 이용 방지와 비인가 사용 방지</li>
                  <li>마케팅 및 광고에의 활용: 이벤트 등 광고성 정보 전달, 접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">2. 개인정보의 처리 및 보유기간</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>1. 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
                <p>2. 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>회원가입 및 관리: 서비스 이용계약 해지시까지</li>
                  <li>재화 또는 서비스 제공: 재화·서비스 공급완료 및 요금결제·정산 완료시까지</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">3. 처리하는 개인정보의 항목</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>회사는 다음의 개인정보 항목을 처리하고 있습니다:</p>
                <div className="ml-4">
                  <h3 className="font-medium mb-2">필수항목:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>이메일주소, 비밀번호</li>
                    <li>서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보</li>
                  </ul>
                  <h3 className="font-medium mb-2 mt-4">선택항목:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>이름, 전화번호</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">4. 개인정보의 제3자 제공</h2>
              <p className="text-muted-foreground leading-relaxed">
                회사는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">5. 개인정보처리의 위탁</h2>
              <p className="text-muted-foreground leading-relaxed">
                회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다: 현재 개인정보 처리 위탁업체는 없습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">6. 정보주체의 권리·의무 및 행사방법</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>개인정보 처리정지 요구</li>
                  <li>개인정보 열람요구</li>
                  <li>개인정보 정정·삭제요구</li>
                  <li>개인정보 처리정지 요구</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">7. 개인정보의 안전성 확보조치</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등</li>
                  <li>기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치</li>
                  <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">8. 개인정보 보호책임자</h2>
              <div className="text-muted-foreground leading-relaxed">
                <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
                <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                  <p><strong>개인정보 보호책임자</strong></p>
                  <p>연락처: info@protalk-ai.com</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;