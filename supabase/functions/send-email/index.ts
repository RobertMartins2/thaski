import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";
import React from 'npm:react@18.3.1';
import { renderAsync } from 'npm:@react-email/components@0.0.22';
import { WelcomeEmail } from './_templates/welcome-email.tsx';
import { ResetPasswordEmail } from './_templates/reset-password-email.tsx';
import { ResendConfirmationEmail } from './_templates/resend-confirmation-email.tsx';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject?: string;
  html?: string;
  type: 'welcome' | 'reset-password' | 'resend-confirmation' | 'custom';
  data?: {
    userName?: string;
    confirmationUrl?: string;
    resetUrl?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, html, type, data }: EmailRequest = await req.json();

    let emailSubject = subject;
    let emailHtml = html;

    // Gerar template baseado no tipo
    if (type !== 'custom') {
      switch (type) {
        case 'welcome':
          emailSubject = 'Bem-vindo ao Thaski! Confirme sua conta';
          emailHtml = await renderAsync(
            React.createElement(WelcomeEmail, {
              userName: data?.userName,
              confirmationUrl: data?.confirmationUrl || '',
            })
          );
          break;

        case 'reset-password':
          emailSubject = 'Redefinir sua senha - Thaski';
          emailHtml = await renderAsync(
            React.createElement(ResetPasswordEmail, {
              userName: data?.userName,
              resetUrl: data?.resetUrl || '',
            })
          );
          break;

        case 'resend-confirmation':
          emailSubject = 'Confirme sua conta - Thaski';
          emailHtml = await renderAsync(
            React.createElement(ResendConfirmationEmail, {
              userName: data?.userName,
              confirmationUrl: data?.confirmationUrl || '',
            })
          );
          break;

        default:
          throw new Error(`Tipo de email não suportado: ${type}`);
      }
    }

    if (!emailSubject || !emailHtml) {
      throw new Error('Subject e HTML são obrigatórios para emails customizados');
    }

    // Para usar domínio personalizado, atualize após verificar no Resend:
    // from: "Thaski <noreply@thaski.com.br>"
    const emailResponse = await resend.emails.send({
      from: "Thaski <noreply@resend.dev>", // Temporário até verificar domínio
      to: [to],
      subject: emailSubject,
      html: emailHtml,
      tags: [
        {
          name: 'category',
          value: type,
        },
        {
          name: 'environment',
          value: Deno.env.get('ENVIRONMENT') || 'production',
        },
      ],
    });

    console.log(`Email ${type} sent successfully to ${to}:`, emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    
    // Log detalhado para debugging
    if (error.message?.includes('API key')) {
      console.error("API key issue - verify RESEND_API_KEY is set correctly");
    }
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        timestamp: new Date().toISOString(),
        type: 'email-send-error'
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);