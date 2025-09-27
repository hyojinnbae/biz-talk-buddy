import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name: name || ''
          }
        }
      });

      if (error) {
        let message = '회원가입 중 오류가 발생했습니다.';
        if (error.message.includes('already_registered')) {
          message = '이미 등록된 이메일입니다.';
        } else if (error.message.includes('invalid_email')) {
          message = '유효하지 않은 이메일 주소입니다.';
        } else if (error.message.includes('weak_password')) {
          message = '비밀번호가 너무 약합니다. 6자 이상 입력해주세요.';
        }
        
        toast({
          variant: "destructive",
          title: "회원가입 실패",
          description: message,
        });
        return { error };
      }

      toast({
        title: "회원가입 성공",
        description: "이메일을 확인하여 계정을 활성화해주세요.",
      });

      return { error: null };
    } catch (err) {
      const error = err as Error;
      toast({
        variant: "destructive",
        title: "오류",
        description: error.message,
      });
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        let message = '로그인 중 오류가 발생했습니다.';
        if (error.message.includes('invalid_credentials')) {
          message = '이메일 또는 비밀번호가 올바르지 않습니다.';
        } else if (error.message.includes('email_not_confirmed')) {
          message = '이메일 인증이 완료되지 않았습니다.';
        }
        
        toast({
          variant: "destructive",
          title: "로그인 실패",
          description: message,
        });
        return { error };
      }

      toast({
        title: "로그인 성공",
        description: "Protalk에 오신 것을 환영합니다!",
      });

      return { error: null };
    } catch (err) {
      const error = err as Error;
      toast({
        variant: "destructive",
        title: "오류",
        description: error.message,
      });
      return { error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Google 로그인 실패",
          description: error.message,
        });
        return { error };
      }

      return { error: null };
    } catch (err) {
      const error = err as Error;
      toast({
        variant: "destructive",
        title: "오류",
        description: error.message,
      });
      return { error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          variant: "destructive",
          title: "로그아웃 실패",
          description: error.message,
        });
      } else {
        toast({
          title: "로그아웃",
          description: "성공적으로 로그아웃되었습니다.",
        });
      }
    } catch (err) {
      const error = err as Error;
      toast({
        variant: "destructive",
        title: "오류",
        description: error.message,
      });
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}