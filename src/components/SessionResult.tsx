import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, X } from "lucide-react";

interface SessionResultProps {
  conversationLog: Array<{ role: string; content: string }>;
  rephrasedExpressions: Array<{ original: string; rephrased: string }>;
  onClose: () => void;
}

const SessionResult = ({ conversationLog, rephrasedExpressions, onClose }: SessionResultProps) => {
  const downloadLog = () => {
    const logText = conversationLog
      .map((msg) => `${msg.role === 'user' ? 'YOU' : 'AI'}: ${msg.content}`)
      .join('\n\n');
    
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation-log-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadRephrases = () => {
    const csvHeader = 'Original,Rephrased\n';
    const csvContent = rephrasedExpressions
      .map((expr) => `"${expr.original}","${expr.rephrased}"`)
      .join('\n');
    
    const blob = new Blob([csvHeader + csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rephrase-expressions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">연습 세션 결과</h1>
          <Button variant="ghost" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Rephrase 표현 모아보기 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>AI가 다시 표현한 문장들</CardTitle>
            <Button onClick={downloadRephrases} variant="outline" size="sm" disabled={rephrasedExpressions.length === 0}>
              <Download className="w-4 h-4 mr-2" />
              다운로드
            </Button>
          </CardHeader>
          <CardContent>
            {rephrasedExpressions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Rephrase된 표현이 없습니다.</p>
            ) : (
              <div className="space-y-4">
                {rephrasedExpressions.map((expr, idx) => (
                  <div key={idx} className="border-l-4 border-primary pl-4 py-2">
                    <p className="text-sm text-muted-foreground mb-1">원래 표현:</p>
                    <p className="mb-2">{expr.original}</p>
                    <p className="text-sm text-muted-foreground mb-1">AI Rephrase:</p>
                    <p className="text-primary font-medium">{expr.rephrased}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button onClick={onClose} size="lg">
            새로운 연습 시작하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SessionResult;
