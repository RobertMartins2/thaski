import { useEffect } from 'react';
import { toast } from 'sonner';
import { sendAllTemplateEmails } from '@/lib/send-test-emails';

export const ForceEmailSend = () => {
  useEffect(() => {
    const sendEmails = async () => {
      try {
        console.log('🚀 Forçando envio de emails de teste...');
        await sendAllTemplateEmails('contato@robertmartins.com.br');
        toast.success('📧 Emails enviados com sucesso para contato@robertmartins.com.br!');
        console.log('✅ Emails enviados com novo logo!');
      } catch (error) {
        console.error('❌ Erro ao enviar emails:', error);
        toast.error(`Erro: ${error.message}`);
      }
    };

    // Enviar imediatamente
    sendEmails();
  }, []);

  return null;
};