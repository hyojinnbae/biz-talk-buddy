import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, X } from "lucide-react";

interface SessionResultProps {
  conversationLog: Array<{ role: string; content: string }>;
  rephrasedExpressions: string[];
  onClose: () => void;
}

const SessionResult = ({ conversationLog, rephrasedExpressions, onClose }: SessionResultProps) => {
  const downloadRephrases = () => {
    const content = rephrasedExpressions.join('\n\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-rephrase-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">연습 세션 결과</h1>
          <Button variant="ghost" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">🧠 AI가 다시 표현한 문장들</CardTitle>
              <p className="text-sm text-muted-foreground">
                👉 오늘 연습 중 AI가 제안한 자연스러운 표현들입니다.
              </p>
            </div>
            <Button 
              onClick={downloadRephrases} 
              variant="outline" 
              size="sm" 
              disabled={rephrasedExpressions.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              다운로드
            </Button>
          </CardHeader>
          <CardContent>
            {rephrasedExpressions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                AI가 제안한 표현이 없습니다.
              </p>
            ) : (
              <div className="space-y-3">
                {rephrasedExpressions.map((sentence, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-950/30 transition-colors cursor-pointer"
                    onClick={() => copyToClipboard(sentence)}
                    title="클릭하여 복사"
                  >
                    <p className="text-blue-700 dark:text-blue-400 leading-relaxed">
                      {sentence}
                    </p>
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
