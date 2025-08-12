import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { validateEmail } from "@/lib/security";
import { ArrowLeft } from "lucide-react";

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

export function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!validateEmail(email)) {
      toast.error("Por favor, insira um email válido");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      
      if (error) throw error;
      
      setEmailSent(true);
      toast.success("Email de recuperação enviado!");
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(error.message || "Erro ao enviar email de recuperação");
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
          <h1 className="text-2xl font-semibold text-foreground mb-2">Email enviado!</h1>
          <p className="text-muted-foreground">
            Enviamos um link para redefinir sua senha para <strong>{email}</strong>. 
            Verifique sua caixa de entrada e spam.
          </p>
        </div>

        <Button 
          onClick={onBackToLogin} 
          variant="outline" 
          className="w-full h-12"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para o login
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Esqueci minha senha</h1>
        <p className="text-muted-foreground">
          Digite seu email e enviaremos um link para redefinir sua senha.
        </p>
      </div>

      <form onSubmit={handleResetPassword} className="space-y-6">
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
          {loading ? "Enviando..." : "Enviar link de recuperação"}
        </Button>

        <Button 
          type="button"
          variant="ghost"
          onClick={onBackToLogin}
          className="w-full h-12"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para o login
        </Button>
      </form>
    </div>
  );
}