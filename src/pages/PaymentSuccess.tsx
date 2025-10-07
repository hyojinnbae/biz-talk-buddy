import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const paymentKey = searchParams.get('paymentKey');
        const orderId = searchParams.get('orderId');
        const amount = searchParams.get('amount');

        if (!paymentKey || !orderId || !amount) {
          throw new Error('결제 정보가 올바르지 않습니다.');
        }

        const { data, error } = await supabase.functions.invoke('confirm-payment', {
          body: {
            paymentKey,
            orderId,
            amount: parseInt(amount)
          }
        });

        if (error) throw error;

        setSuccess(true);
        toast({
          title: '결제 완료',
          description: '플랜이 성공적으로 등록되었습니다.',
        });
      } catch (error) {
        console.error('Payment confirmation error:', error);
        toast({
          title: '결제 처리 실패',
          description: error instanceof Error ? error.message : '다시 시도해주세요.',
          variant: 'destructive'
        });
        navigate('/payment/fail');
      } finally {
        setIsProcessing(false);
      }
    };

    confirmPayment();
  }, [searchParams, navigate, toast]);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground">결제를 처리중입니다...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <CheckCircle2 className="w-24 h-24 text-success mx-auto" />
          <h1 className="text-3xl font-bold">결제 완료!</h1>
          <p className="text-muted-foreground">
            이제 선택하신 플랜을 이용하실 수 있습니다.
          </p>
          <Button onClick={() => navigate('/practice')} size="lg">
            연습 시작하기
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default PaymentSuccess;