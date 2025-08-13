import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export function RootRedirect() {
  const [shouldRedirectToReset, setShouldRedirectToReset] = useState(false);

  useEffect(() => {
    console.log("RootRedirect: Checking URL hash...", window.location.hash);
    
    // Verificar se há tokens de reset na URL
    const hash = window.location.hash.substring(1);
    const hashParams = new URLSearchParams(hash);
    const accessToken = hashParams.get('access_token');
    const tokenType = hashParams.get('type');
    
    console.log("RootRedirect: Found tokens:", { accessToken: !!accessToken, tokenType });
    
    // Se há tokens de reset, redirecionar para a página de reset
    if (accessToken && tokenType === 'recovery') {
      console.log("RootRedirect: Redirecting to reset password page");
      setShouldRedirectToReset(true);
      return;
    }
  }, []);

  // Se deve redirecionar para reset, usar window.location para preservar os tokens
  if (shouldRedirectToReset) {
    window.location.href = `/reset-password${window.location.hash}`;
    return <div>Redirecionando...</div>;
  }

  // Redirecionar para landing page por padrão
  return <Navigate to="/lp" replace />;
}