import { Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Contact = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">문의 채널</h2>
          <p className="text-lg text-muted-foreground">
            궁금한 점이 있으시면 언제든 연락주세요
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-lg bg-card border">
            <Mail className="mx-auto mb-4 text-primary" size={48} />
            <h3 className="font-semibold mb-2">이메일 문의</h3>
            <p className="text-muted-foreground mb-4">
              자세한 문의사항은 이메일로 보내주세요
            </p>
            <Button variant="outline" asChild>
              <a href="mailto:contact@protalk.ai">
                contact@protalk.ai
              </a>
            </Button>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-card border">
            <MessageCircle className="mx-auto mb-4 text-primary" size={48} />
            <h3 className="font-semibold mb-2">카카오톡 문의</h3>
            <p className="text-muted-foreground mb-4">
              빠른 답변이 필요하시면 카톡으로 연락주세요
            </p>
            <Button variant="outline" asChild>
              <a href="https://pf.kakao.com/_xoGxbxj" target="_blank" rel="noopener noreferrer">
                카카오톡 문의하기
              </a>
            </Button>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-card border">
            <Phone className="mx-auto mb-4 text-primary" size={48} />
            <h3 className="font-semibold mb-2">전화 문의</h3>
            <p className="text-muted-foreground mb-4">
              평일 10:00 - 18:00 (점심시간 12:00-13:00 제외)
            </p>
            <Button variant="outline" asChild>
              <a href="tel:02-1234-5678">
                02-1234-5678
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};