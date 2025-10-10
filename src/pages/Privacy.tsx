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
          
          <h1 className="text-3xl font-bold text-foreground mb-8">개인정보처리방침</h1>
          
          <div className="prose prose-gray max-w-none space-y-8">
            <div className="space-y-4">
              <p className="text-muted-foreground">[서비스명]: ProTalk</p>
              <p className="text-muted-foreground">[운영자]: 배효진</p>
              <p className="text-muted-foreground">[연락처]: protalk.biz@gmail.com</p>
              <p className="text-muted-foreground">[개정일]: 2025년 10월 16일</p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              ProTalk 는 「개인정보 보호법」에 따라 사용자의 개인정보를 보호하고, 권익을 보호하며, 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 방침을 두고 있습니다.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">1. 개인정보 수집 항목 및 수집 방법</h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-3 text-left">구분</th>
                        <th className="border border-border p-3 text-left">수집 항목</th>
                        <th className="border border-border p-3 text-left">수집 목적</th>
                        <th className="border border-border p-3 text-left">보유 기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border p-3">회원가입 시</td>
                        <td className="border border-border p-3">이메일, 이름, 비밀번호</td>
                        <td className="border border-border p-3">회원 식별 및 관리</td>
                        <td className="border border-border p-3">회원 탈퇴 시 즉시 삭제</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-3">유료 결제 시</td>
                        <td className="border border-border p-3">이름, 이메일, 결제정보(카드사명, 승인정보 등)</td>
                        <td className="border border-border p-3">결제 처리 및 환불, 세금계산서 발급</td>
                        <td className="border border-border p-3">전자상거래법 기준 5년 보관</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-3">서비스 이용 시 (선택)</td>
                        <td className="border border-border p-3">대화 로그, 학습 이력</td>
                        <td className="border border-border p-3">맞춤형 학습 제공 및 품질 개선</td>
                        <td className="border border-border p-3">회원 탈퇴 시 또는 1년간 미사용 시 삭제</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>서비스 이용 과정에서 IP 주소, 쿠키, 접속 브라우저 정보, OS 정보 등 비식별 정보가 자동 수집될 수 있습니다.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">2. 개인정보의 수집 및 이용 목적</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>회사는 다음의 목적을 위해 개인정보를 수집 및 이용합니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>회원 관리: 본인 확인, 계정 식별, 불만처리, 고지사항 전달 등</li>
                  <li>서비스 제공: 영어 회화 훈련 콘텐츠 제공, 학습 히스토리 저장 등</li>
                  <li>결제 처리: 상품 구매, 요금 결제, 환불 등</li>
                  <li>서비스 개선 및 마케팅 (선택 동의 시): 이용 패턴 분석, 신규 기능 안내 등</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">3. 개인정보의 보유 및 이용 기간</h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>원칙적으로 개인정보 수집 및 이용 목적이 달성되면 지체 없이 파기합니다.</p>
                <p>단, 다음의 법령에 의해 일정 기간 보존이 필요한 경우는 예외로 합니다.</p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-3 text-left">항목</th>
                        <th className="border border-border p-3 text-left">관련 법령</th>
                        <th className="border border-border p-3 text-left">보유 기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border p-3">계약/결제 관련 기록</td>
                        <td className="border border-border p-3">전자상거래법</td>
                        <td className="border border-border p-3">5년</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-3">소비자 불만 또는 분쟁 처리</td>
                        <td className="border border-border p-3">전자상거래법</td>
                        <td className="border border-border p-3">3년</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-3">접속 기록</td>
                        <td className="border border-border p-3">통신비밀보호법</td>
                        <td className="border border-border p-3">3개월</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">4. 개인정보의 제3자 제공</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>회사는 원칙적으로 개인정보를 외부에 제공하지 않습니다.</p>
                <p>다만, 아래의 경우에는 예외로 합니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>사용자 동의를 받은 경우</li>
                  <li>관계 법령에 의하여 수사기관의 요청이 있는 경우</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">5. 개인정보 처리 위탁</h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>회사는 서비스 제공을 위해 아래의 외부 업체에 개인정보 처리를 위탁할 수 있습니다.</p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-3 text-left">수탁자</th>
                        <th className="border border-border p-3 text-left">위탁 내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border p-3">Toss Payments</td>
                        <td className="border border-border p-3">결제 처리 및 정산</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-3">Amazon Web Services / Google Cloud Platform</td>
                        <td className="border border-border p-3">데이터 저장, 서버 운영</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-3">OpenAI (또는 유사 AI 파트너)</td>
                        <td className="border border-border p-3">음성 대화 분석 및 생성 처리 (비식별 정보만 사용)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm">※ 위탁처리가 추가될 경우, 본 방침을 통해 고지합니다.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">6. 이용자의 권리와 행사 방법</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며, 삭제를 요청할 수 있습니다.</p>
                <p>탈퇴 요청 시, 관련 법령에 따라 일정 보존기간 후 모든 데이터를 삭제합니다.</p>
                <p>개인정보 관련 문의: protalk.biz@gmail.com</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">7. 개인정보 자동 수집 장치의 설치 및 거부</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>당사는 서비스 품질 개선을 위해 <strong>쿠키(Cookie)</strong>를 사용할 수 있습니다.</p>
                <p>사용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.</p>
                <p>단, 이 경우 일부 기능 사용에 제한이 있을 수 있습니다.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">8. 개인정보의 파기 절차 및 방법</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>보존기간이 경과하거나 목적이 달성된 개인정보는 즉시 파기합니다.</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>전자적 파일 형태: 복구 불가능한 기술적 방법으로 삭제</li>
                  <li>종이 문서: 분쇄 또는 소각</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">9. 개인정보 보호책임자</h2>
              <div className="text-muted-foreground leading-relaxed">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-3 text-left">항목</th>
                        <th className="border border-border p-3 text-left">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border p-3">개인정보 보호책임자</td>
                        <td className="border border-border p-3">배효진</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-3">이메일</td>
                        <td className="border border-border p-3">protalk.biz@gmail.com</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">10. 고지의 의무</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>본 개인정보처리방침은 2025년 10월 16일부터 시행됩니다.</p>
                <p>정책 변경 시 웹사이트 및 앱 내 공지사항을 통해 고지합니다.</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
