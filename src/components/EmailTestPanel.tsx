import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { sendWelcomeEmail, sendResetPasswordEmail, sendResendConfirmationEmail, sendCustomEmail } from "@/lib/email-service";

type EmailType = 'welcome' | 'reset-password' | 'resend-confirmation' | 'custom';

export function EmailTestPanel() {
  const [email, setEmail] = useState("");
  const [emailType, setEmailType] = useState<EmailType>('welcome');
  const [userName, setUserName] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [customHtml, setCustomHtml] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendTestEmail = async () => {
    if (!email) {
      toast.error("Email é obrigatório");
      return;
    }

    setLoading(true);

    try {
      switch (emailType) {
        case 'welcome':
          await sendWelcomeEmail(
            email,
            userName || undefined,
            `${window.location.origin}/projects?confirmed=true`
          );
          break;

        case 'reset-password':
          await sendResetPasswordEmail(
            email,
            `${window.location.origin}/reset-password?token=test-token`,
            userName || undefined
          );
          break;

        case 'resend-confirmation':
          await sendResendConfirmationEmail(
            email,
            `${window.location.origin}/projects?confirmed=true`,
            userName || undefined
          );
          break;

        case 'custom':
          if (!customSubject || !customHtml) {
            toast.error("Assunto e HTML são obrigatórios para emails customizados");
            return;
          }
          await sendCustomEmail(email, customSubject, customHtml);
          break;
      }

      toast.success(`Email de teste (${emailType}) enviado com sucesso!`);
    } catch (error) {
      console.error('Error sending test email:', error);
      toast.error('Erro ao enviar email de teste');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Teste de Emails</CardTitle>
        <CardDescription>
          Teste os templates de email profissionais do sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="test-email">Email de destino</Label>
            <Input
              id="test-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email-type">Tipo de email</Label>
            <Select value={emailType} onValueChange={(value) => setEmailType(value as EmailType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="welcome">Boas-vindas</SelectItem>
                <SelectItem value="reset-password">Reset de senha</SelectItem>
                <SelectItem value="resend-confirmation">Reenvio de confirmação</SelectItem>
                <SelectItem value="custom">Email personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="user-name">Nome do usuário (opcional)</Label>
          <Input
            id="user-name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Nome para personalizar o email"
          />
        </div>

        {emailType === 'custom' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="custom-subject">Assunto</Label>
              <Input
                id="custom-subject"
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                placeholder="Assunto do email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-html">HTML do email</Label>
              <textarea
                id="custom-html"
                className="w-full h-32 px-3 py-2 border border-input rounded-md text-sm"
                value={customHtml}
                onChange={(e) => setCustomHtml(e.target.value)}
                placeholder="<h1>Olá!</h1><p>Seu HTML aqui...</p>"
              />
            </div>
          </>
        )}

        <Button 
          onClick={handleSendTestEmail}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Enviando..." : "Enviar Email de Teste"}
        </Button>

        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <h4 className="font-medium text-sm">📋 Status da Configuração</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>✅ Templates profissionais criados</p>
            <p>✅ Edge Function configurada</p>
            <p>⚠️ Usando domínio temporário (resend.dev)</p>
            <p className="text-primary">
              🔧 Configure seu domínio no{" "}
              <a 
                href="https://resend.com/domains" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                Resend
              </a>
              {" "}para emails mais profissionais
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}