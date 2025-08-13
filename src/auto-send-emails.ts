import { sendWelcomeEmail, sendResetPasswordEmail, sendResendConfirmationEmail } from "@/lib/email-service";

// Executar envio automático dos templates
const sendAllTemplates = async () => {
  const email = "robert@piki.digital";
  const userName = "Robert";
  const baseUrl = "https://89b5f724-9d48-4849-8524-46c5ebc702d4.lovableproject.com";
  
  console.log('🚀 Iniciando envio de todos os templates para:', email);
  
  try {
    // Email de boas-vindas
    console.log('📧 Enviando email de boas-vindas...');
    await sendWelcomeEmail(
      email,
      userName,
      `${baseUrl}/projects?confirmed=true`
    );
    console.log('✅ Email de boas-vindas enviado!');

    // Email de redefinição de senha
    console.log('📧 Enviando email de redefinição de senha...');
    await sendResetPasswordEmail(
      email,
      `${baseUrl}/reset-password?token=demo-token`,
      userName
    );
    console.log('✅ Email de redefinição de senha enviado!');

    // Email de reenvio de confirmação
    console.log('📧 Enviando email de reenvio de confirmação...');
    await sendResendConfirmationEmail(
      email,
      `${baseUrl}/projects?confirmed=true`,
      userName
    );
    console.log('✅ Email de reenvio de confirmação enviado!');

    console.log('🎉 Todos os templates foram enviados com sucesso!');
  } catch (error) {
    console.error('💥 Erro ao enviar templates:', error);
  }
};

// Executar automaticamente
sendAllTemplates();