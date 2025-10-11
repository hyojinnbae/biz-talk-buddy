import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SessionResultProps {
  conversationLog: Array<{ role: string; content: string }>;
  rephrasedExpressions: string[];
  onClose: () => void;
}

const SessionResult = ({ conversationLog, rephrasedExpressions, onClose }: SessionResultProps) => {
  const { toast } = useToast();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast({
      title: "복사되었습니다",
      description: "문장이 클립보드에 복사되었습니다.",
    });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">🧠 AI가 다시 표현한 문장들</h1>
          <p className="text-muted-foreground">
            👉 오늘 연습 중 AI가 제안한 자연스러운 표현들입니다.
          </p>
        </div>

        {/* AI Rephrased Expressions */}
        {rephrasedExpressions.length === 0 ? (
          <Card className="p-12">
            <p className="text-muted-foreground text-center">
              AI가 제안한 표현이 없습니다.
            </p>
          </Card>
        ) : (
          <div className="space-y-3 mb-8">
            {rephrasedExpressions.map((sentence, idx) => (
              <div
                key={idx}
                className="group relative bg-card hover:bg-muted/50 border rounded-lg p-6 transition-all cursor-pointer"
                onClick={() => copyToClipboard(sentence, idx)}
              >
                <p className="text-lg leading-relaxed" style={{ color: '#2979ff' }}>
                  {sentence}
                </p>
                
                {/* Copy button */}
                <button
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-background rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(sentence, idx);
                  }}
                >
                  {copiedIndex === idx ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Action button */}
        <div className="text-center">
          <Button onClick={onClose} size="lg" className="px-8">
            새로운 연습 시작하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SessionResult;
