import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export function AuthDebugPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const testSignUp = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/projects`
        }
      });

      setDebugInfo({
        type: 'signup',
        data,
        error: error?.message || null,
        timestamp: new Date().toLocaleString()
      });

      if (error) {
        toast.error(`Erro: ${error.message}`);
      } else {
        toast.success("Cadastro realizado - verifique debugInfo");
      }
    } catch (err: any) {
      console.error("Erro no teste:", err);
      toast.error(`Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testResend = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/projects`
        }
      });

      setDebugInfo({
        type: 'resend',
        data,
        error: error?.message || null,
        timestamp: new Date().toLocaleString()
      });

      if (error) {
        toast.error(`Erro: ${error.message}`);
      } else {
        toast.success("Reenvio realizado - verifique debugInfo");
      }
    } catch (err: any) {
      console.error("Erro no reenvio:", err);
      toast.error(`Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    setDebugInfo({
      type: 'session',
      data,
      error: error?.message || null,
      timestamp: new Date().toLocaleString()
    });
  };

  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Painel de Debug - Autenticação</CardTitle>
          <CardDescription>
            Use este painel para testar e diagnosticar problemas de autenticação
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="debug-email">Email de teste</Label>
            <Input
              id="debug-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="teste@exemplo.com"
            />
          </div>
          
          <div>
            <Label htmlFor="debug-password">Senha de teste</Label>
            <Input
              id="debug-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="MinhaSenh@123"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button onClick={testSignUp} disabled={loading || !email || !password}>
              Testar Cadastro
            </Button>
            <Button onClick={testResend} disabled={loading || !email} variant="outline">
              Testar Reenvio
            </Button>
            <Button onClick={getSession} variant="secondary">
              Ver Sessão
            </Button>
          </div>

          {debugInfo && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  Resultado do teste: {debugInfo.type} - {debugInfo.timestamp}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-3 rounded text-xs overflow-auto">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}

          <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
            <h4 className="font-medium text-yellow-800">Informações importantes:</h4>
            <ul className="text-sm text-yellow-700 mt-2 space-y-1">
              <li>• URL atual: {window.location.origin}</li>
              <li>• Ambiente: {import.meta.env.DEV ? 'Desenvolvimento' : 'Produção'}</li>
              <li>• EmailRedirectTo: {window.location.origin}/projects</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}