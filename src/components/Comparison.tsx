import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const comparisonData = [
  {
    category: "회화 방식",
    existing: "전화영어, 일반 튜터",
    ours: "AI 음성 시뮬레이션",
    isAdvantage: true
  },
  {
    category: "표현 교정",
    existing: "일반 회화 수준",
    ours: "실무자 현업 표현으로 업그레이드",
    isAdvantage: true
  },
  {
    category: "상황 적합성",
    existing: "일반 회화 위주",
    ours: "실무 상황 시나리오",
    isAdvantage: true
  },
  {
    category: "시간 제약",
    existing: "예약 필요, 위약금 있음",
    ours: "언제든 5~15분 루틴 가능",
    isAdvantage: true
  },
  {
    category: "부담감",
    existing: "사람과의 대화, 콜포비아",
    ours: "AI라 부담 없음",
    isAdvantage: true
  },
  {
    category: "비용",
    existing: "최소 월 30만원 상당",
    ours: "기존 서비스 비 1/10 이하",
    isAdvantage: true
  }
];

export const Comparison = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">
              기존 서비스와 차별점
            </h2>
            <p className="text-lg text-muted-foreground">
              실무 중심, 루틴 중심, 피드백 중심 → 오직 BD·PM·마케터를 위한 말하기 훈련 도구
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-6 font-semibold">비교 항목</th>
                    <th className="text-left p-6 font-semibold">기존 서비스</th>
                    <th className="text-left p-6 font-semibold bg-primary/5">Protalk</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((item, index) => (
                    <tr key={index} className="border-t border-border">
                      <td className="p-6 font-medium">{item.category}</td>
                      <td className="p-6 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <X className="w-4 h-4 text-destructive" />
                          {item.existing}
                        </div>
                      </td>
                      <td className="p-6 bg-primary/5">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-success" />
                          <span className="font-medium">{item.ours}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};