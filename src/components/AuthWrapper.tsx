import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ProjectProvider } from "@/contexts/ProjectContext";
import { cleanupAuthState } from "@/lib/security";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { EmailConfirmationScreen } from "@/components/auth/EmailConfirmationScreen";

interface AuthWrapperProps {
  children: React.ReactNode;
}

type AuthView = 'login' | 'signup' | 'forgot-password' | 'email-confirmation';

export function AuthWrapper({ children }: AuthWrapperProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<AuthView>('login');
  const [devMode, setDevMode] = useState(false);

  // Check if we're in development/preview mode
  const isDevelopment = import.meta.env.DEV || 
    window.location.hostname.includes('lovable.app') ||
    window.location.hostname.includes('lovableproject.com');

  // Auto-enable preview mode in development
  useEffect(() => {
    if (isDevelopment && !user) {
      setDevMode(true);
    }
  }, [isDevelopment, user]);

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

  const handleSwitchView = (view: AuthView) => {
    setCurrentView(view);
  };

  const handleSignOut = async () => {
    try {
      cleanupAuthState();
      await supabase.auth.signOut({ scope: 'global' });
      toast.success("Logout realizado com sucesso!");
      // Force page reload for clean state
      window.location.href = '/';
    } catch (error) {
      console.error("Sign out error:", error);
      // Force page reload even if sign out fails
      window.location.href = '/';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user && !isDevelopment) {
    const renderAuthContent = () => {
      switch (currentView) {
        case 'login':
          return (
            <LoginForm
              onSwitchToSignUp={() => handleSwitchView('signup')}
              onSwitchToForgotPassword={() => handleSwitchView('forgot-password')}
            />
          );
        case 'signup':
          return (
            <SignUpForm
              onSwitchToLogin={() => handleSwitchView('login')}
              onSignUpSuccess={() => handleSwitchView('email-confirmation')}
            />
          );
        case 'forgot-password':
          return (
            <ForgotPasswordForm
              onBackToLogin={() => handleSwitchView('login')}
            />
          );
        case 'email-confirmation':
          return (
            <EmailConfirmationScreen
              onBackToLogin={() => handleSwitchView('login')}
            />
          );
        default:
          return null;
      }
    };

    return (
      <div className="min-h-screen flex">
        {/* Left side - Auth form */}
        <div className="flex-1 flex items-center justify-center p-8 bg-background">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary mb-2">PIKI Projetos</h2>
            </div>
            {renderAuthContent()}
            {isDevelopment && currentView === 'login' && (
              <div className="mt-8 pt-6 border-t border-muted">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12"
                  onClick={() => setDevMode(true)}
                >
                  🚀 Modo Preview (Sem Login)
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Right side - Background */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-muted/20 to-muted/40 items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
          <div className="relative text-center max-w-md px-8">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <div className="w-12 h-12 bg-primary/20 rounded-lg" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Gerencie seus projetos com facilidade
            </h3>
            <p className="text-muted-foreground">
              Organize suas tarefas, acompanhe o progresso e colabore com sua equipe de forma eficiente.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProjectProvider>
      <div className="min-h-screen">
        {children}
      </div>
    </ProjectProvider>
  );
}