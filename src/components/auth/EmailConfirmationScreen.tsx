import { Button } from "@/components/ui/button";

interface EmailConfirmationScreenProps {
  onBackToLogin: () => void;
  onResendConfirmation: () => void;
}

export function EmailConfirmationScreen({ onBackToLogin, onResendConfirmation }: EmailConfirmationScreenProps) {
  return (
    <div className="w-full max-w-sm mx-auto text-center">
      <div className="mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">✉️</span>
        </div>
        <h1 className="text-2xl font-semibold text-foreground mb-4">Verifique seu email</h1>
        <p className="text-muted-foreground leading-relaxed">
          Enviamos um link de confirmação para seu email. Clique no link para ativar sua conta e fazer login.
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-muted/50 rounded-lg border border-dashed border-muted-foreground/30">
          <p className="text-sm text-muted-foreground">
            Não recebeu o email? Verifique sua caixa de spam ou lixo eletrônico.
          </p>
        </div>

        <Button 
          onClick={onResendConfirmation}
          className="w-full h-12"
        >
          Reenviar email de confirmação
        </Button>

        <Button 
          onClick={onBackToLogin} 
          variant="outline" 
          className="w-full h-12"
        >
          Voltar para o login
        </Button>
      </div>
    </div>
  );
}