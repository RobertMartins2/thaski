import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ProjectProvider } from "@/contexts/ProjectContext";
import { cleanupAuthState, validateEmail, validatePassword } from "@/lib/security";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [devMode, setDevMode] = useState(false);

  // Check if we're in development/preview mode
  const isDevelopment = import.meta.env.DEV || 
    window.location.hostname.includes('lovable.app') ||
    window.location.hostname.includes('lovableproject.com');

  // Auto-enable preview mode in development
  useEffect(() => {
    if (isDevelopment && !user) {
      setDevMode(true);
    }
  }, [isDevelopment, user]);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Input validation
    if (!validateEmail(email)) {
      toast.error("Por favor, insira um email válido");
      setLoading(false);
      return;
    }

    if (isSignUp) {
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        toast.error(passwordValidation.message);
        setLoading(false);
        return;
      }
    }

    try {
      if (isSignUp) {
        // Clean up existing state before sign up
        cleanupAuthState();
        try {
          await supabase.auth.signOut({ scope: 'global' });
        } catch (err) {
          // Continue even if this fails
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`
          }
        });
        if (error) throw error;
        toast.success("Conta criada! Verifique seu email para confirmação.");
      } else {
        // Clean up existing state before sign in
        cleanupAuthState();
        try {
          await supabase.auth.signOut({ scope: 'global' });
        } catch (err) {
          // Continue even if this fails
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (data.user) {
          toast.success("Login realizado com sucesso!");
        }
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error(error.message || "Erro na autenticação");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      cleanupAuthState();
      await supabase.auth.signOut({ scope: 'global' });
      toast.success("Logout realizado com sucesso!");
      // Force page reload for clean state
      window.location.href = '/';
    } catch (error) {
      console.error("Sign out error:", error);
      // Force page reload even if sign out fails
      window.location.href = '/';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user && !devMode && !isDevelopment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>PIKI Projetos</CardTitle>
            <CardDescription>
              {isSignUp ? "Criar nova conta" : "Faça login para continuar"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Carregando..." : isSignUp ? "Criar Conta" : "Entrar"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Já tem uma conta? Fazer login" : "Criar nova conta"}
              </Button>
              {isDevelopment && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => setDevMode(true)}
                >
                  🚀 Modo Preview (Sem Login)
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <ProjectProvider>
      <div className="min-h-screen">
        <div className="absolute top-4 right-4">
          <Button variant="outline" onClick={handleSignOut}>
            Sair
          </Button>
        </div>
        {children}
      </div>
    </ProjectProvider>
  );
}