import { supabase } from "@/integrations/supabase/client";

interface EmailData {
  userName?: string;
  confirmationUrl?: string;
  resetUrl?: string;
}

interface SendEmailOptions {
  to: string;
  type: 'welcome' | 'reset-password' | 'resend-confirmation' | 'custom';
  data?: EmailData;
  subject?: string;
  html?: string;
}

export const sendEmail = async (options: SendEmailOptions) => {
  try {
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        to: options.to,
        type: options.type,
        data: options.data,
        subject: options.subject,
        html: options.html,
      },
    });

    if (error) {
      console.error('Error sending email:', error);
      throw new Error('Erro ao enviar email');
    }

    return data;
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
};

// Funções específicas para cada tipo de email
export const sendWelcomeEmail = async (to: string, userName?: string, confirmationUrl?: string) => {
  return sendEmail({
    to,
    type: 'welcome',
    data: { userName, confirmationUrl },
  });
};

export const sendResetPasswordEmail = async (to: string, resetUrl: string, userName?: string) => {
  return sendEmail({
    to,
    type: 'reset-password',
    data: { userName, resetUrl },
  });
};

export const sendResendConfirmationEmail = async (to: string, confirmationUrl: string, userName?: string) => {
  return sendEmail({
    to,
    type: 'resend-confirmation',
    data: { userName, confirmationUrl },
  });
};

export const sendCustomEmail = async (to: string, subject: string, html: string) => {
  return sendEmail({
    to,
    type: 'custom',
    subject,
    html,
  });
};