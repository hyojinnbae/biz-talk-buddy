import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "영어 회화 못해도 쓸 수 있나요?",
    answer: "네. 오히려 실수할수록 더 많이 배웁니다. AI는 당신을 평가하지 않고, 자연스럽게 고쳐줍니다."
  },
  {
    question: "회화 연습 시간이 없어요.",
    answer: "바쁜 분들을 위해 만들었습니다. 딱 5분, 미팅 전에도 연습 가능합니다."
  },
  {
    question: "실전처럼 말하는 연습이 될까요?",
    answer: "네. 실제 업무 시나리오로 대화하기 때문에 회의 직전 리허설처럼 느껴집니다."
  },
  {
    question: "어떤 직무에 가장 적합한가요?",
    answer: "BD, PM, 마케터, 창업자 등 글로벌 업무 환경에서 영어로 소통해야 하는 모든 실무자에게 적합합니다."
  },
  {
    question: "AI가 내 발음이나 억양을 교정해주나요?",
    answer: "현재는 표현과 문장 구조에 집중하고 있습니다. 발음 교정 기능은 향후 업데이트에서 제공될 예정입니다."
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
            <p className="text-lg text-muted-foreground">
              실무자들이 가장 궁금해하는 질문들에 답해드립니다.
            </p>
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