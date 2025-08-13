import {
  Button,
  Link,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'
import { BaseTemplate } from './base-template.tsx'

interface ResendConfirmationEmailProps {
  userName?: string;
  confirmationUrl: string;
}

export const ResendConfirmationEmail = ({ userName = 'usuário', confirmationUrl }: ResendConfirmationEmailProps) => (
  <BaseTemplate
    preview="Confirme sua conta no Thaski"
    title="Confirmação de Conta"
  >
    <Text style={text}>
      Olá{userName !== 'usuário' ? ` ${userName}` : ''},
    </Text>

    <Text style={text}>
      Você solicitou o reenvio do link de confirmação da sua conta no <strong>Thaski</strong>.
    </Text>

    <Text style={text}>
      Para ativar sua conta e começar a usar todas as funcionalidades, clique no botão abaixo:
    </Text>

    <Section style={buttonContainer}>
      <Button style={button} href={confirmationUrl}>
        Confirmar Minha Conta
      </Button>
    </Section>

    <Text style={text}>
      Ou copie e cole este link no seu navegador:
    </Text>
    
    <Text style={linkText}>
      <Link href={confirmationUrl} style={link}>
        {confirmationUrl}
      </Link>
    </Text>

    <Section style={tipBox}>
      <Text style={tipTitle}>💡 Dica:</Text>
      <Text style={tipText}>
        Verifique sua caixa de spam ou lixo eletrônico se você não encontrar nossos emails na caixa de entrada.
      </Text>
      <Text style={tipText}>
        Adicione <strong>noreply@thaski.com.br</strong> aos seus contatos para garantir que receba nossos emails.
      </Text>
    </Section>

    <Text style={text}>
      Após a confirmação, você terá acesso completo ao Thaski para gerenciar seus projetos e tarefas.
    </Text>

    <Text style={text}>
      Se você não criou uma conta no Thaski, pode ignorar este email com segurança.
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
  backgroundColor: '#10b981',
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

const tipBox = {
  backgroundColor: '#f0f9ff',
  border: '1px solid #bae6fd',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
}

const tipTitle = {
  color: '#0369a1',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 12px',
}

const tipText = {
  color: '#075985',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0 0 8px',
}