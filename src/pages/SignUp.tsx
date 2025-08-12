import { useState } from "react";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { EmailConfirmationScreen } from "@/components/auth/EmailConfirmationScreen";
import { ResendConfirmationForm } from "@/components/auth/ResendConfirmationForm";

type AuthView = 'signup' | 'email-confirmation' | 'resend-confirmation';

export default function SignUp() {
  const [currentView, setCurrentView] = useState<AuthView>('signup');

  // Check if we're in development/preview mode
  const isDevelopment = import.meta.env.DEV || 
    window.location.hostname.includes('lovable.app') ||
    window.location.hostname.includes('lovableproject.com');

  const handleSwitchView = (view: AuthView) => {
    setCurrentView(view);
  };

  const renderAuthContent = () => {
    switch (currentView) {
      case 'signup':
        return (
          <SignUpForm
            onSwitchToLogin={() => window.location.href = '/login'}
            onSignUpSuccess={() => handleSwitchView('email-confirmation')}
          />
        );
      case 'email-confirmation':
        return (
          <EmailConfirmationScreen
            onBackToLogin={() => window.location.href = '/login'}
            onResendConfirmation={() => handleSwitchView('resend-confirmation')}
          />
        );
      case 'resend-confirmation':
        return (
          <ResendConfirmationForm
            onBackToLogin={() => window.location.href = '/login'}
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
          {isDevelopment && currentView === 'signup' && (
            <div className="mt-8 pt-6 border-t border-muted">
              <button
                type="button"
                onClick={() => window.location.href = '/projects'}
                className="w-full h-12 px-4 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm font-medium transition-colors"
              >
                🚀 Modo Preview (Sem Login)
              </button>
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