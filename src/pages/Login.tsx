import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { EmailConfirmationScreen } from "@/components/auth/EmailConfirmationScreen";
import { ResendConfirmationForm } from "@/components/auth/ResendConfirmationForm";

type AuthView = 'login' | 'forgot-password' | 'email-confirmation' | 'resend-confirmation';

export default function Login() {
  const [currentView, setCurrentView] = useState<AuthView>('login');


  const handleSwitchView = (view: AuthView) => {
    setCurrentView(view);
  };

  const renderAuthContent = () => {
    switch (currentView) {
      case 'login':
        return (
          <LoginForm
            onSwitchToSignUp={() => window.location.href = '/signup'}
            onSwitchToForgotPassword={() => handleSwitchView('forgot-password')}
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
            onResendConfirmation={() => handleSwitchView('resend-confirmation')}
          />
        );
      case 'resend-confirmation':
        return (
          <ResendConfirmationForm
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
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img 
              src="/lovable-uploads/311a49a3-a023-4208-954c-dad2347c5e50.png" 
              alt="PIKI Projetos Logo" 
              className="h-12 mx-auto mb-2"
            />
          </div>
          {renderAuthContent()}
        </div>
      </div>
      
      {/* Right side - Background with image */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative">
        <video 
          src="/login-background-video.mp4" 
          autoPlay 
          loop 
          muted 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}