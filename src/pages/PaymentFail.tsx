import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

const PaymentFail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const message = searchParams.get('message') || '결제에 실패했습니다.';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md">
        <XCircle className="w-24 h-24 text-destructive mx-auto" />
        <h1 className="text-3xl font-bold">결제 실패</h1>
        <p className="text-muted-foreground">{message}</p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate('/')} variant="outline">
            홈으로
          </Button>
          <Button onClick={() => navigate(-1)}>
            다시 시도
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;