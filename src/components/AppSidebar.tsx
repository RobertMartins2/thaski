import { useState, useEffect } from "react";
import {
  FolderOpen,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { cleanupAuthState } from "@/lib/security";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const location = useLocation();
  const { t } = useLanguage();
  const [userProfile, setUserProfile] = useState({
    full_name: "",
    email: "",
    avatar_url: null as string | null
  });
  
  const menuItems = [
    {
      title: t('projects'),
      url: "/projects",
      icon: FolderOpen,
    },
    {
      title: t('settings'),
      url: "/settings",
      icon: Settings,
    },
  ];

  useEffect(() => {
    loadUserProfile();
    
    // Listen to auth state changes to update profile
    const authSubscription = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          loadUserProfile();
        }
      }
    );

    // Listen to custom profile update events
    const handleProfileUpdate = () => {
      loadUserProfile();
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);

    return () => {
      authSubscription.data.subscription.unsubscribe();
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, []);

  const loadUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        let avatarUrl = null;
        
        // Load avatar from storage
        const { data: avatarFile } = await supabase.storage
          .from('avatars')
          .list(user.id, { limit: 1 });

        if (avatarFile && avatarFile.length > 0) {
          const { data } = supabase.storage
            .from('avatars')
            .getPublicUrl(`${user.id}/${avatarFile[0].name}`);
          
          avatarUrl = data.publicUrl;
        }

        setUserProfile({
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || "",
          email: user.email || "",
          avatar_url: avatarUrl
        });
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    }
  };

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const handleSignOut = async () => {
    try {
      cleanupAuthState();
      await supabase.auth.signOut({ scope: 'global' });
      toast.success(t('logout_success'));
      // Redirecionar para página de login
      window.location.href = '/login';
    } catch (error) {
      console.error("Sign out error:", error);
      // Redirecionar para login mesmo se houver erro
      window.location.href = '/login';
    }
  };

  return (
    <Sidebar 
      collapsible="icon" 
      className="border-r border-border/40"
      style={{
        borderRadius: '10px',
        border: '2px solid #E4F0FF',
        background: 'linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.50) 100%)',
        boxShadow: '0 4px 20px 0 rgba(229, 237, 247, 0.30)'
      }}
    >
      <SidebarHeader className="border-b border-border/40 px-3 py-4">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/311a49a3-a023-4208-954c-dad2347c5e50.png" 
            alt="Thaski Logo" 
            className="h-8"
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            {t('main_menu')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`w-full ${
                      isActive(item.url) 
                        ? 'bg-primary/10 text-primary font-medium border-r-2 border-primary' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <NavLink to={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors">
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="font-medium">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 px-3 py-4 space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userProfile.avatar_url || undefined} alt="User" />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {userProfile.full_name ? userProfile.full_name.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-foreground">{userProfile.full_name || t('user')}</p>
            <p className="text-xs text-muted-foreground">{userProfile.email}</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="w-full justify-start gap-3 px-3 py-2 h-auto text-muted-foreground hover:text-foreground hover:bg-muted/50"
        >
          <LogOut className="h-4 w-4" />
          <span className="font-medium">{t('logout')}</span>
        </Button>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  );
}