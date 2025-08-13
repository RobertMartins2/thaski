import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Img,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface BaseTemplateProps {
  preview: string;
  title: string;
  children: React.ReactNode;
}

export const BaseTemplate = ({ preview, title, children }: BaseTemplateProps) => (
  <Html>
    <Head />
    <Preview>{preview}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Img
            src="https://89b5f724-9d48-4849-8524-46c5ebc702d4.lovableproject.com/thaski-logo.png"
            width="150"
            height="50"
            alt="Thaski"
            style={logo}
          />
        </Section>
        <Section style={content}>
          <Heading style={h1}>{title}</Heading>
          {children}
        </Section>
        <Section style={footer}>
          <Text style={footerText}>
            © 2025 Thaski. Todos os direitos reservados.
          </Text>
          <Text style={footerText}>
            Este é um email automático, não responda a esta mensagem.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
}

const header = {
  padding: '32px 24px 24px',
  borderBottom: '1px solid #e6ebf1',
}

const logo = {
  display: 'block',
  margin: '0 auto',
}

const content = {
  padding: '32px 24px',
}

const h1 = {
  color: '#1f2937',
  fontSize: '28px',
  fontWeight: '700',
  lineHeight: '1.3',
  margin: '0 0 24px',
  textAlign: 'center' as const,
}

const footer = {
  padding: '24px',
  borderTop: '1px solid #e6ebf1',
  backgroundColor: '#f8fafc',
}

const footerText = {
  color: '#6b7280',
  fontSize: '12px',
  lineHeight: '1.4',
  margin: '0 0 8px',
  textAlign: 'center' as const,
}