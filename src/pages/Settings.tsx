import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings as SettingsIcon, User, Shield, Upload, Globe } from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { EmailTestPanel } from "@/components/EmailTestPanel";

export default function Settings() {
  const { language, setLanguage, t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    full_name: "",
    email: "",
    phone: ""
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    loadUserProfile();
    
    // Auto-enviar templates de email para contato@robertmartins.com.br
    const autoSendEmails = async () => {
      try {
        console.log('🚀 Iniciando auto-envio de templates de email...');
        
        const { sendAllTemplateEmails } = await import("@/lib/send-test-emails");
        
        await sendAllTemplateEmails('contato@robertmartins.com.br');
        console.log('✅ Todos os templates enviados com sucesso!');
        toast.success('Todos os templates foram enviados para contato@robertmartins.com.br!');
      } catch (error) {
        console.error('💥 Erro ao enviar templates:', error);
        toast.error('Erro ao enviar os templates de email');
      }
    };
    
    // Executar imediatamente
    autoSendEmails();
  }, []);

  const loadUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserProfile({
          full_name: user.user_metadata?.full_name || "",
          email: user.email || "",
          phone: user.user_metadata?.phone || ""
        });

        // Load avatar from storage
        const { data: avatarFile } = await supabase.storage
          .from('avatars')
          .list(user.id, { limit: 1 });

        if (avatarFile && avatarFile.length > 0) {
          const { data } = supabase.storage
            .from('avatars')
            .getPublicUrl(`${user.id}/${avatarFile[0].name}`);
          
          setCurrentAvatarUrl(data.publicUrl);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
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

  const uploadAvatar = async (userId: string, file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `avatar.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    const { error } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (error) throw error;

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não encontrado");

      // Upload avatar if changed
      if (profileImage) {
        const avatarUrl = await uploadAvatar(user.id, profileImage);
        setCurrentAvatarUrl(avatarUrl);
        setPreviewUrl(null);
        setProfileImage(null);
      }

      // Update user metadata
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: userProfile.full_name,
          phone: userProfile.phone
        }
      });

      if (error) throw error;
      toast.success(t('profile_updated_success'));
      
      // Dispatch custom event to update sidebar
      window.dispatchEvent(new CustomEvent('profileUpdated'));
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      toast.error(t('profile_update_error'));
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    toast.success(t('language_updated_success'));
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <SettingsIcon className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t('settings_title')}</h1>
              <p className="text-muted-foreground mt-1">
                {t('settings_description')}
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  <CardTitle>{t('user_profile')}</CardTitle>
                </div>
                <CardDescription>
                  {t('user_profile_description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Upload de foto */}
                <div className="flex flex-col items-center space-y-4 mb-6">
                  <div className="relative">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={previewUrl || currentAvatarUrl || undefined} />
                      <AvatarFallback className="bg-muted">
                        {userProfile.full_name ? userProfile.full_name.charAt(0).toUpperCase() : <Upload className="w-8 h-8 text-muted-foreground" />}
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
                    {t('change_profile_photo')}
                  </Label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('full_name')}</Label>
                    <Input 
                      id="name" 
                      placeholder={t('full_name')} 
                      value={userProfile.full_name}
                      onChange={(e) => handleInputChange("full_name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('email')}</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="seu@email.com" 
                      value={userProfile.email}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('phone')}</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="(00) 00000-0000"
                      value={userProfile.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={handleSaveProfile}
                  disabled={loading}
                >
                  {loading ? t('saving') : t('save_changes')}
                </Button>
              </CardContent>
            </Card>

            {/* Language Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  <CardTitle>{t('language')}</CardTitle>
                </div>
                <CardDescription>
                  {t('language_description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language-select">{t('language')}</Label>
                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-full md:w-[300px]">
                      <SelectValue placeholder={t('language')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt">{t('portuguese')}</SelectItem>
                      <SelectItem value="en">{t('english')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <CardTitle>{t('security')}</CardTitle>
                </div>
                <CardDescription>
                  {t('security_description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">{t('two_factor_auth')}</div>
                    <div className="text-sm text-muted-foreground">
                      {t('two_factor_description')}
                    </div>
                  </div>
                  <Badge variant="secondary">{t('coming_soon')}</Badge>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>{t('change_password')}</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input type="password" placeholder={t('current_password')} />
                    <Input type="password" placeholder={t('new_password')} />
                  </div>
                  <Button variant="outline" size="sm">
                    {t('change_password')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Email Testing */}
            <EmailTestPanel />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}