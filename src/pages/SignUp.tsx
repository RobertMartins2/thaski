import { useState } from "react";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { EmailConfirmationScreen } from "@/components/auth/EmailConfirmationScreen";
import { ResendConfirmationForm } from "@/components/auth/ResendConfirmationForm";

type AuthView = 'signup' | 'email-confirmation' | 'resend-confirmation';

export default function SignUp() {
  const [currentView, setCurrentView] = useState<AuthView>('signup');


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
        <img 
          src="/lovable-uploads/f8d44504-27ff-433a-98d2-4bb3c8c0b91b.png" 
          alt="Task Card Interface" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}