import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export function RootRedirect() {
  useEffect(() => {
    // Verificar se há tokens de reset na URL
    const hash = window.location.hash.substring(1);
    const hashParams = new URLSearchParams(hash);
    const accessToken = hashParams.get('access_token');
    const tokenType = hashParams.get('type');
    
    // Se há tokens de reset, redirecionar para a página de reset
    if (accessToken && tokenType === 'recovery') {
      window.location.href = `/reset-password${window.location.hash}`;
      return;
    }
  }, []);

  // Redirecionar para landing page por padrão
  return <Navigate to="/lp" replace />;
}