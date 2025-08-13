# Configuração Profissional de Emails - Thaski

## Passos para Profissionalizar os Emails

### 1. Configurar Domínio no Resend

1. Acesse [Resend Dashboard](https://resend.com/domains)
2. Clique em "Add Domain"
3. Digite seu domínio: `thaski.com.br`
4. Siga as instruções para adicionar os registros DNS:
   - **SPF**: `v=spf1 include:_spf.resend.com ~all`
   - **DKIM**: Adicione os registros fornecidos pelo Resend
   - **DMARC**: `v=DMARC1; p=quarantine; rua=mailto:dmarc@thaski.com.br`

### 2. Verificar API Key

1. Acesse [Resend API Keys](https://resend.com/api-keys)
2. Verifique se sua `RESEND_API_KEY` está configurada nos secrets do Supabase
3. Se necessário, gere uma nova chave

### 3. Status da Implementação

✅ **Concluído:**
- Templates HTML profissionais criados
- Edge Function atualizada com suporte a templates
- Serviço de email centralizado criado
- Integração com sistema de confirmação

🔄 **Em Configuração:**
- Domínio verificado no Resend
- Configuração DNS

⏳ **Próximos Passos:**
- Integração com hooks de auth do Supabase
- Monitoramento de deliverability
- Analytics de email

## Templates Disponíveis

### 1. Welcome Email (`welcome`)
- Usado para novos cadastros
- Inclui botão de confirmação
- Lista de funcionalidades do Thaski

### 2. Reset Password (`reset-password`)
- Para recuperação de senha
- Aviso de segurança sobre expiração
- Botão de redefinição

### 3. Resend Confirmation (`resend-confirmation`)
- Para reenvio de confirmação
- Dicas sobre spam/lixo eletrônico
- Instruções de whitelisting

## Uso dos Templates

```typescript
import { sendWelcomeEmail, sendResetPasswordEmail, sendResendConfirmationEmail } from "@/lib/email-service";

// Email de boas-vindas
await sendWelcomeEmail(
  "user@email.com",
  "Nome do Usuário",
  "https://thaski.com.br/confirm?token=..."
);

// Reset de senha
await sendResetPasswordEmail(
  "user@email.com", 
  "https://thaski.com.br/reset?token=...",
  "Nome do Usuário"
);

// Reenvio de confirmação
await sendResendConfirmationEmail(
  "user@email.com",
  "https://thaski.com.br/confirm?token=...",
  "Nome do Usuário"
);
```

## Métricas e Monitoramento

Após configurar o domínio, você pode acessar:
- [Logs do Edge Function](https://supabase.com/dashboard/project/ztkmjjagusdhshuxcuxc/functions/send-email/logs)
- [Dashboard Resend](https://resend.com/emails) - para métricas de entrega

## Troubleshooting

### Emails não chegam
1. Verifique se o domínio está verificado no Resend
2. Confirme se os registros DNS estão corretos
3. Verifique os logs do Edge Function

### Templates não renderizam
1. Confirme se `@react-email/components` está instalado
2. Verifique os logs de erro no console do edge function

### API Key inválida
1. Gere uma nova chave no Resend
2. Atualize o secret `RESEND_API_KEY` no Supabase