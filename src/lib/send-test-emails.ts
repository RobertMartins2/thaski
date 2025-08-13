import { sendWelcomeEmail, sendResetPasswordEmail, sendResendConfirmationEmail } from "@/lib/email-service";

export const sendAllTemplateEmails = async (email: string) => {
  const userName = "Robert";
  const baseUrl = window.location.origin;
  
  try {
    // Email de boas-vindas
    await sendWelcomeEmail(
      email,
      userName,
      `${baseUrl}/projects?confirmed=true`
    );
    
    // Email de redefinição de senha
    await sendResetPasswordEmail(
      email,
      `${baseUrl}/reset-password?token=demo-token`,
      userName
    );
    
    // Email de reenvio de confirmação
    await sendResendConfirmationEmail(
      email,
      `${baseUrl}/projects?confirmed=true`,
      userName
    );
    
    return { success: true, message: "Todos os templates foram enviados com sucesso!" };
  } catch (error) {
    console.error('Error sending template emails:', error);
    throw new Error('Erro ao enviar os templates de email');
  }
};