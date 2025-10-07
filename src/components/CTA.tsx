import { Button } from "@/components/ui/button";
import { ArrowRight, Mic, Users, Target } from "lucide-react";
import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <section className="py-20 px-4 bg-blue-50 text-center">
      <div className="inline-block p-8 bg-white rounded-2xl shadow-sm max-w-3xl">
        <h3 className="text-2xl font-bold text-blue-600 mb-4">
          자신 있는 말 한마디가 커리어를 바꿉니다
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          효과적인 방법으로 연습할 기회가 없었을 뿐이에요. <br />
          Protalk는 이를 해결하는 직무 맞춤형 AI 영어 시뮬레이터입니다.
        </p>
        <Button 
          size="lg" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md" 
          asChild
        >
          <Link to="/practice">
            지금 시작하기 →
          </Link>
        </Button>
      </div>
    </section>
  );
};