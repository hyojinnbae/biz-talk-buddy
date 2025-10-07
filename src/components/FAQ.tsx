import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "영어 회화 못해도 쓸 수 있나요?",
    answer: "네. 오히려 실수할수록 더 빨리 늘 수 있어요. AI는 틀려도 평가하지 않아요."
  },
  {
    question: "AI와의 대화는 부자연스럽지 않나요?",
    answer: "최신 AI 기술을 활용해 매우 자연스러운 대화가 가능합니다. 실제 업무 상황을 기반으로 한 시나리오로 진행되어 현실감 있는 연습이 됩니다."
  },
  {
    question: "실전처럼 말하는 연습이 될까요?",
    answer: "실제 업무 시나리오 기반으로 설계돼 있어 '내가 진짜로 회의 들어가는 느낌'이 납니다."
  },
  {
    question: "BD, PM, 마케터 직무가 아니어도 적합한가요?",
    answer: "물론입니다. 글로벌 업무 환경에서 영어로 소통하는 모든 실무자에게 적합합니다."
  },
  {
    question: "대화 내용이 저장되나요?",
    answer: "개인 학습 목적으로만 저장되며, 외부에 공유되지 않습니다. 언제든 삭제 요청이 가능합니다."
  }
];

export const FAQ = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">
              자주 묻는 질문
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};