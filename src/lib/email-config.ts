// Configurações centralizadas para o sistema de emails

export const EMAIL_CONFIG = {
  // Domínio do email (atualize após verificar no Resend)
  FROM_EMAIL: 'Thaski <noreply@thaski.com.br>', // Altere para 'Thaski <noreply@resend.dev>' se ainda não configurou o domínio
  
  // URLs base para links nos emails
  BASE_URL: typeof window !== 'undefined' ? window.location.origin : 'https://thaski.com.br',
  
  // Páginas de redirecionamento
  PAGES: {
    PROJECTS: '/projects',
    LOGIN: '/login',
    RESET_PASSWORD: '/reset-password',
    TERMS: '/terms',
    PRIVACY: '/privacy',
  },
  
  // Configurações de templates
  TEMPLATES: {
    WELCOME: {
      SUBJECT: 'Bem-vindo ao Thaski! Confirme sua conta',
      PREVIEW: 'Bem-vindo ao Thaski! Confirme sua conta para começar',
    },
    RESET_PASSWORD: {
      SUBJECT: 'Redefinir sua senha - Thaski',
      PREVIEW: 'Redefinir sua senha do Thaski',
    },
    RESEND_CONFIRMATION: {
      SUBJECT: 'Confirme sua conta - Thaski',
      PREVIEW: 'Confirme sua conta no Thaski',
    },
  },
  
  // Configurações de tags para análise
  TAGS: {
    WELCOME: 'welcome',
    RESET_PASSWORD: 'reset-password',
    RESEND_CONFIRMATION: 'resend-confirmation',
    CUSTOM: 'custom',
  },
  
  // Configurações de timeout e retry
  TIMEOUT: 30000, // 30 segundos
  RETRY_ATTEMPTS: 3,
} as const;

// Função helper para gerar URLs completas
export const generateEmailUrl = (path: string, params?: Record<string, string>): string => {
  const url = new URL(path, EMAIL_CONFIG.BASE_URL);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }
  
  return url.toString();
};

// Função helper para extrair nome do email
export const extractNameFromEmail = (email: string): string => {
  const localPart = email.split('@')[0];
  return localPart.replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};