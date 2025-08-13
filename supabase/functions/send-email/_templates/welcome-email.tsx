import {
  Button,
  Link,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'
import { BaseTemplate } from './base-template.tsx'

interface WelcomeEmailProps {
  userName?: string;
  confirmationUrl: string;
}

export const WelcomeEmail = ({ userName = 'usuário', confirmationUrl }: WelcomeEmailProps) => (
  <BaseTemplate
    preview="Bem-vindo ao Thaski! Confirme sua conta para começar"
    title={`Bem-vindo ao Thaski${userName !== 'usuário' ? `, ${userName}` : ''}!`}
  >
    <Text style={text}>
      Obrigado por se cadastrar no <strong>Thaski</strong>, sua plataforma de gerenciamento de projetos simples e eficiente.
    </Text>
    
    <Text style={text}>
      Para começar a usar todas as funcionalidades, você precisa confirmar sua conta clicando no botão abaixo:
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

    <Section style={features}>
      <Text style={featuresTitle}>
        Com o Thaski você pode:
      </Text>
      <Text style={featureItem}>✅ Criar e organizar projetos facilmente</Text>
      <Text style={featureItem}>✅ Gerenciar tarefas com kanban intuitivo</Text>
      <Text style={featureItem}>✅ Colaborar com sua equipe</Text>
      <Text style={featureItem}>✅ Acompanhar o progresso em tempo real</Text>
    </Section>

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
  backgroundColor: '#3b82f6',
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

const features = {
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  padding: '24px',
  margin: '32px 0',
}

const featuresTitle = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 16px',
}

const featureItem = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0 0 8px',
}