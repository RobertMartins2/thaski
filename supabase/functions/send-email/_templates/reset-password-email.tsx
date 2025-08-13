import {
  Button,
  Link,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'
import { BaseTemplate } from './base-template.tsx'

interface ResetPasswordEmailProps {
  userName?: string;
  resetUrl: string;
}

export const ResetPasswordEmail = ({ userName = 'usuário', resetUrl }: ResetPasswordEmailProps) => (
  <BaseTemplate
    preview="Redefinir sua senha do Thaski"
    title="Redefinir Senha"
  >
    <Text style={text}>
      Olá{userName !== 'usuário' ? ` ${userName}` : ''},
    </Text>

    <Text style={text}>
      Recebemos uma solicitação para redefinir a senha da sua conta no <strong>Thaski</strong>.
    </Text>

    <Text style={text}>
      Se você fez esta solicitação, clique no botão abaixo para criar uma nova senha:
    </Text>

    <Section style={buttonContainer}>
      <Button style={button} href={resetUrl}>
        Redefinir Minha Senha
      </Button>
    </Section>

    <Text style={text}>
      Ou copie e cole este link no seu navegador:
    </Text>
    
    <Text style={linkText}>
      <Link href={resetUrl} style={link}>
        {resetUrl}
      </Link>
    </Text>

    <Section style={warningBox}>
      <Text style={warningTitle}>⚠️ Importante:</Text>
      <Text style={warningText}>
        Este link expira em <strong>1 hora</strong> por motivos de segurança.
      </Text>
      <Text style={warningText}>
        Se você não solicitou a redefinição de senha, pode ignorar este email com segurança. Sua senha permanecerá inalterada.
      </Text>
    </Section>

    <Text style={text}>
      Se você continuar tendo problemas para acessar sua conta, entre em contato conosco.
    </Text>
  </BaseTemplate>
)

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#ef4444',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 32px',
}

const linkText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '1.4',
  margin: '16px 0 32px',
  wordBreak: 'break-all' as const,
}

const link = {
  color: '#3b82f6',
  textDecoration: 'underline',
}

const warningBox = {
  backgroundColor: '#fef2f2',
  border: '1px solid #fecaca',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
}

const warningTitle = {
  color: '#dc2626',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 12px',
}

const warningText = {
  color: '#7f1d1d',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0 0 8px',
}