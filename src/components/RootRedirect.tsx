import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export function RootRedirect() {
  const [shouldRedirectToReset, setShouldRedirectToReset] = useState(false);

  useEffect(() => {
    // Capturar URL completa para debug
    const fullUrl = window.location.href;
    const hash = window.location.hash;
    console.log("RootRedirect: Full URL:", fullUrl);
    console.log("RootRedirect: Hash:", hash);
    
    // Verificar se há tokens de reset na URL (tanto em hash quanto em search)
    const urlParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(hash.substring(1));
    
    const accessToken = urlParams.get('access_token') || hashParams.get('access_token');
    const tokenType = urlParams.get('type') || hashParams.get('type');
    
    console.log("RootRedirect: Found tokens:", { 
      accessToken: !!accessToken, 
      tokenType,
      fromSearch: !!urlParams.get('access_token'),
      fromHash: !!hashParams.get('access_token')
    });
    
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