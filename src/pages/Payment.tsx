import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const TOSS_CLIENT_KEY = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';

const Payment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const paymentWidgetRef = useRef<any>(null);
  const planId = searchParams.get('planId');

  useEffect(() => {
    if (!planId) {
      toast({
        title: '오류',
        description: '플랜을 선택해주세요.',
        variant: 'destructive'
      });
      navigate('/');
      return;
    }

    const initializePayment = async () => {
      try {
        setIsLoading(true);

        // Get user session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          toast({
            title: '로그인 필요',
            description: '로그인 후 이용해주세요.',
            variant: 'destructive'
          });
          navigate('/auth');
          return;
        }

        // Create checkout
        const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('checkout', {
          body: { planId }
        });

        if (checkoutError) throw checkoutError;

        // Load Toss Payments
        const tossPayments = await loadTossPayments(TOSS_CLIENT_KEY);
        const paymentWidget = tossPayments.widgets({ customerKey: session.user.id });
        
        paymentWidgetRef.current = paymentWidget;

        await paymentWidget.setAmount({
          currency: 'KRW',
          value: checkoutData.amount
        });

        await paymentWidget.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT'
        });

        await paymentWidget.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT'
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Payment initialization error:', error);
        toast({
          title: '결제 초기화 실패',
          description: error instanceof Error ? error.message : '다시 시도해주세요.',
          variant: 'destructive'
        });
        setIsLoading(false);
      }
    };

    initializePayment();
  }, [planId, navigate, toast]);

  const handlePayment = async () => {
    if (!paymentWidgetRef.current) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('로그인이 필요합니다.');

      const { data: checkoutData } = await supabase.functions.invoke('checkout', {
        body: { planId }
      });

      await paymentWidgetRef.current.requestPayment({
        orderId: checkoutData.orderId,
        orderName: checkoutData.planName,
        customerEmail: checkoutData.customerEmail,
        customerName: checkoutData.customerName,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (error) {
      console.error('Payment request error:', error);
      toast({
        title: '결제 요청 실패',
        description: error instanceof Error ? error.message : '다시 시도해주세요.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">결제하기</h1>
        
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">결제 화면을 준비중입니다...</p>
          </div>
        ) : (
          <>
            <div id="payment-method" className="mb-6"></div>
            <div id="agreement" className="mb-6"></div>
            
            <button
              onClick={handlePayment}
              className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              결제하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;