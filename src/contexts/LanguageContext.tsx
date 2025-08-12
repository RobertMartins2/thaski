import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

const translations = {
  pt: {
    // Common
    'save': 'Salvar',
    'cancel': 'Cancelar',
    'loading': 'Carregando...',
    'saving': 'Salvando...',
    'edit': 'Editar',
    'delete': 'Excluir',
    'create': 'Criar',
    'update': 'Atualizar',
    'close': 'Fechar',
    
    // Navigation
    'projects': 'Projetos',
    'settings': 'Configurações',
    'logout': 'Sair',
    'login': 'Entrar',
    'signup': 'Cadastrar',
    'already_have_account': 'Já tenho conta',
    
    // Settings
    'settings_title': 'Configurações',
    'settings_description': 'Personalize sua experiência no Kanban Board',
    'user_profile': 'Perfil do Usuário',
    'user_profile_description': 'Gerencie suas informações pessoais e preferências de conta',
    'full_name': 'Nome completo',
    'email': 'E-mail',
    'phone': 'Telefone',
    'change_profile_photo': 'Clique para alterar foto de perfil',
    'save_changes': 'Salvar Alterações',
    'security': 'Segurança',
    'security_description': 'Gerencie suas configurações de segurança',
    'two_factor_auth': 'Autenticação de Dois Fatores',
    'two_factor_description': 'Adicione uma camada extra de segurança à sua conta',
    'coming_soon': 'Em Breve',
    'change_password': 'Alterar Senha',
    'current_password': 'Senha atual',
    'new_password': 'Nova senha',
    'language': 'Idioma',
    'language_description': 'Escolha o idioma da interface',
    'portuguese': 'Português',
    'english': 'Inglês',
    'profile_updated_success': 'Perfil atualizado com sucesso!',
    'profile_update_error': 'Erro ao salvar perfil',
    'language_updated_success': 'Idioma alterado com sucesso!',
    'main_menu': 'MENU PRINCIPAL',
    'user': 'Usuário',
    'logout_success': 'Logout realizado com sucesso!',
    
    // Landing Page
    'main_title': 'Gerencie seus projetos com facilidade',
    'main_description': 'Organize suas tarefas de forma visual e eficiente com nosso sistema Kanban intuitivo',
    'get_started': 'Começar Agora',
    'features_title': 'Por que escolher nosso Kanban?',
    'visual_organization': 'Organização Visual',
    'visual_organization_desc': 'Visualize o progresso das suas tarefas de forma clara e intuitiva',
    'team_collaboration': 'Colaboração em Equipe',
    'team_collaboration_desc': 'Trabalhe junto com sua equipe em tempo real',
    'easy_management': 'Gestão Simples',
    'easy_management_desc': 'Interface limpa e fácil de usar para máxima produtividade'
  },
  en: {
    // Common
    'save': 'Save',
    'cancel': 'Cancel',
    'loading': 'Loading...',
    'saving': 'Saving...',
    'edit': 'Edit',
    'delete': 'Delete',
    'create': 'Create',
    'update': 'Update',
    'close': 'Close',
    
    // Navigation
    'projects': 'Projects',
    'settings': 'Settings',
    'logout': 'Sign Out',
    'login': 'Sign In',
    'signup': 'Sign Up',
    'already_have_account': 'Already have an account',
    
    // Settings
    'settings_title': 'Settings',
    'settings_description': 'Customize your Kanban Board experience',
    'user_profile': 'User Profile',
    'user_profile_description': 'Manage your personal information and account preferences',
    'full_name': 'Full name',
    'email': 'Email',
    'phone': 'Phone',
    'change_profile_photo': 'Click to change profile photo',
    'save_changes': 'Save Changes',
    'security': 'Security',
    'security_description': 'Manage your security settings',
    'two_factor_auth': 'Two-Factor Authentication',
    'two_factor_description': 'Add an extra layer of security to your account',
    'coming_soon': 'Coming Soon',
    'change_password': 'Change Password',
    'current_password': 'Current password',
    'new_password': 'New password',
    'language': 'Language',
    'language_description': 'Choose interface language',
    'portuguese': 'Portuguese',
    'english': 'English',
    'profile_updated_success': 'Profile updated successfully!',
    'profile_update_error': 'Error saving profile',
    'language_updated_success': 'Language changed successfully!',
    'main_menu': 'MAIN MENU',
    'user': 'User',
    'logout_success': 'Logout successful!',
    
    // Landing Page
    'main_title': 'Manage your projects with ease',
    'main_description': 'Organize your tasks visually and efficiently with our intuitive Kanban system',
    'get_started': 'Get Started',
    'features_title': 'Why choose our Kanban?',
    'visual_organization': 'Visual Organization',
    'visual_organization_desc': 'Visualize your task progress clearly and intuitively',
    'team_collaboration': 'Team Collaboration',
    'team_collaboration_desc': 'Work together with your team in real-time',
    'easy_management': 'Simple Management',
    'easy_management_desc': 'Clean and easy-to-use interface for maximum productivity'
  }
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get from localStorage or default to Portuguese
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'pt';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Dispatch event for other components to react
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[Language]] || key;
  };

  useEffect(() => {
    // Set HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}