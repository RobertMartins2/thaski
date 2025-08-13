import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { validateEmail } from "@/lib/security";
import { sendResendConfirmationEmail } from "@/lib/email-service";

interface ResendConfirmationProps {
  onBackToLogin: () => void;
}

export function ResendConfirmationForm({ onBackToLogin }: ResendConfirmationProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResendConfirmation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!validateEmail(email)) {
      toast.error("Por favor, insira um email válido");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/projects`
        }
      });
      
      if (error) throw error;

      // Enviar email profissional usando nossos templates
      try {
        await sendResendConfirmationEmail(
          email.trim(),
          `${window.location.origin}/projects`, // URL de redirecionamento após confirmação
          email.split('@')[0] // Nome baseado no email
        );
      } catch (emailError) {
        console.warn('Erro ao enviar email profissional:', emailError);
        // Não falha o processo se o email personalizado falhar
      }
      
      setEmailSent(true);
      toast.success("Email de confirmação reenviado!");
    } catch (error: any) {
      console.error("Resend confirmation error:", error);
      toast.error(error.message || "Erro ao reenviar email de confirmação");
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="w-full max-w-sm mx-auto text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📧</span>
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Email reenviado!</h1>
          <p className="text-muted-foreground">
            Enviamos um novo link de confirmação para <strong>{email}</strong>. 
            Verifique sua caixa de entrada e spam.
          </p>
        </div>

        <Button 
          onClick={onBackToLogin} 
          variant="outline" 
          className="w-full h-12"
        >
          Voltar para o login
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Reenviar confirmação</h1>
        <p className="text-muted-foreground">
          Digite seu email para reenviar o link de confirmação da conta.
        </p>
      </div>

      <form onSubmit={handleResendConfirmation} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12"
            placeholder="seu@email.com"
            required
          />
        </div>

        <Button 
          type="submit" 
          className="w-full h-12" 
          disabled={loading}
        >
          {loading ? "Reenviando..." : "Reenviar confirmação"}
        </Button>

        <Button 
          type="button"
          variant="ghost"
          onClick={onBackToLogin}
          className="w-full h-12"
        >
          Voltar para o login
        </Button>
      </form>
    </div>
  );
}