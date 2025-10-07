import { Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Contact = () => {
  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4 text-center">
        <div className="mt-12 text-gray-700 max-w-2xl mx-auto">
          <hr className="border-gray-200 my-8 w-1/2 mx-auto" />
          <p className="text-base">문의가 있으신가요? 아래 채널로 연락주세요.</p>
          <p className="mt-2 font-semibold text-lg">support@protalk.ai</p>
        </div>
      </div>
    </section>
  );
};