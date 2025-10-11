import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Briefcase, Target, AlertCircle, CheckCircle } from 'lucide-react';

interface CaseData {
  service: string;
  problem: string;
  agenda: string;
  goal: string;
  job: string;
  industry: string;
}

interface CaseSheetProps {
  caseData: CaseData;
  onNext: () => void;
}

const CaseSheet = ({ caseData, onNext }: CaseSheetProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Briefcase className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">오늘의 상황 (Case Brief)</h2>
          </div>
          <p className="text-muted-foreground">
            💡 할 말이 떠오르지 않으면 아래 내용을 참고하세요!
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Service */}
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-1">Service</p>
              <p className="text-base leading-relaxed">{caseData.service}</p>
            </div>
          </div>

          {/* Problem */}
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-1">Problem</p>
              <p className="text-base leading-relaxed">{caseData.problem}</p>
            </div>
          </div>

          {/* Agenda */}
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-1">Agenda</p>
              <p className="text-base leading-relaxed">{caseData.agenda}</p>
            </div>
          </div>

          {/* Goal */}
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-1">Goal</p>
              <p className="text-base leading-relaxed">{caseData.goal}</p>
            </div>
          </div>

          {/* Call to action */}
          <div className="pt-6 text-center">
            <Button onClick={onNext} size="lg" className="w-full md:w-auto">
              Warm-up Expressions 시작하기 ▶
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseSheet;
