import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, ArrowLeft } from "lucide-react";

interface SessionResultProps {
  conversationLog: Array<{role: string, text: string, timestamp: Date}>;
  rephrasedExpressions: Array<{original: string, rephrased: string}>;
  onClose: () => void;
}

export const SessionResult = ({ conversationLog, rephrasedExpressions, onClose }: SessionResultProps) => {
  const downloadLog = () => {
    const content = conversationLog.map(item => 
      `[${item.timestamp.toLocaleTimeString()}] ${item.role === 'user' ? 'You' : 'AI'}: ${item.text}`
    ).join('\n\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation-${new Date().toISOString()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadRephrased = () => {
    const content = rephrasedExpressions.map((item, idx) => 
      `${idx + 1}.\n원문: ${item.original}\n개선: ${item.rephrased}\n`
    ).join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rephrased-expressions-${new Date().toISOString()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-gray-900">대화 복습</h1>
          <Button onClick={onClose} variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            돌아가기
          </Button>
        </div>

        {/* Conversation Log */}
        <Card className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">대화 로그</h2>
            <Button onClick={downloadLog} variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              다운로드
            </Button>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {conversationLog.map((item, idx) => (
              <div key={idx} className={`p-4 rounded-lg ${
                item.role === 'user' ? 'bg-blue-50 ml-8' : 'bg-gray-50 mr-8'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-gray-700">
                    {item.role === 'user' ? 'You' : 'AI'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {item.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-base text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Rephrased Expressions */}
        {rephrasedExpressions.length > 0 && (
          <Card className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">AI가 개선한 표현</h2>
              <Button onClick={downloadRephrased} variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                다운로드
              </Button>
            </div>
            <div className="space-y-6">
              {rephrasedExpressions.map((item, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-gray-200">
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-semibold text-gray-500">원문</span>
                      <p className="text-base text-gray-600 mt-1">{item.original}</p>
                    </div>
                    <div className="h-px bg-gray-200"></div>
                    <div>
                      <span className="text-sm font-semibold text-blue-600">개선된 표현</span>
                      <p className="text-base text-gray-800 font-medium mt-1">{item.rephrased}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
