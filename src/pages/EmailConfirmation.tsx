import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function EmailConfirmation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        const token = searchParams.get('token');
        const type = searchParams.get('type');
        
        console.log('🔗 Processando confirmação de email:', { token: token?.substring(0, 10) + '...', type });

        if (type === 'signup' && token) {
          // Verificar o token de confirmação
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'signup'
          });

          if (error) {
            console.error('❌ Erro na confirmação:', error);
            toast.error('Link de confirmação inválido ou expirado.');
            navigate('/signup');
            return;
          }

          console.log('✅ Email confirmado com sucesso!', data);
          toast.success('Email confirmado com sucesso! Faça login para continuar.');
          
          // Redirecionar para login após confirmação
          setTimeout(() => {
            navigate('/login');
          }, 1000);
        } else {
          // Se não tem os parâmetros corretos, redirecionar para signup
          console.warn('⚠️ Parâmetros de confirmação ausentes ou inválidos');
          navigate('/signup');
        }
      } catch (error) {
        console.error('💥 Erro ao processar confirmação:', error);
        toast.error('Erro ao confirmar email. Tente novamente.');
        navigate('/signup');
      } finally {
        setProcessing(false);
      }
    };

    handleEmailConfirmation();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <h1 className="text-xl font-semibold text-foreground">
          {processing ? 'Confirmando seu email...' : 'Redirecionando...'}
        </h1>
        <p className="text-muted-foreground">
          Aguarde enquanto processamos sua confirmação de email.
        </p>
      </div>
    </div>
  );
}