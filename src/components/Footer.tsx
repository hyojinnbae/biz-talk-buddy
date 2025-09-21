import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-foreground">Protalk AI</h3>
            <p className="text-sm text-muted-foreground mt-1">
              AI 기반 영어 회화 코치로 비즈니스 영어 실력을 향상시키세요
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <Link 
              to="/terms" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              이용약관
            </Link>
            <Link 
              to="/privacy" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              개인정보 처리방침
            </Link>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 Protalk AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};