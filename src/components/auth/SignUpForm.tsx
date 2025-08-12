import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { validateEmail, validatePassword } from "@/lib/security";
import { cleanupAuthState } from "@/lib/security";
import { Upload } from "lucide-react";

interface SignUpFormProps {
  onSwitchToLogin: () => void;
  onSignUpSuccess: () => void;
}

export function SignUpForm({ onSwitchToLogin, onSignUpSuccess }: SignUpFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validações
    if (!formData.name.trim()) {
      toast.error("Nome é obrigatório");
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Por favor, insira um email válido");
      setLoading(false);
      return;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      toast.error(passwordValidation.message);
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Senhas não coincidem");
      setLoading(false);
      return;
    }

    try {
      cleanupAuthState();
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }

      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: formData.name,
            phone: formData.phone
          }
        }
      });

      if (error) throw error;
      
      // Mostrar tela de confirmação por email
      onSignUpSuccess();
    } catch (error: any) {
      console.error("SignUp error:", error);
      toast.error(error.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Criar conta grátis</h1>
        <p className="text-muted-foreground">Preencha os dados abaixo para criar sua conta.</p>
      </div>

      <form onSubmit={handleSignUp} className="space-y-6">
        {/* Upload de foto */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="w-20 h-20">
              <AvatarImage src={previewUrl || undefined} />
              <AvatarFallback className="bg-muted">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <Label className="text-sm text-muted-foreground cursor-pointer">
            Clique para adicionar foto de perfil
          </Label>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">Nome completo</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="h-12 mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="h-12 mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium">Telefone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="h-12 mt-1"
              placeholder="(00) 00000-0000"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-sm font-medium">Criar senha</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="h-12 mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-sm font-medium">Repetir senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              className="h-12 mt-1"
              required
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full h-12" 
          disabled={loading}
        >
          {loading ? "Criando conta..." : "Cadastrar"}
        </Button>

        <div className="text-center">
          <span className="text-muted-foreground text-sm">
            Já tem uma conta?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-primary hover:underline font-medium"
            >
              Fazer login
            </button>
          </span>
        </div>
      </form>
    </div>
  );
}