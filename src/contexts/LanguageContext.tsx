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
    
    'main_title': 'Gerencie seus projetos com facilidade',
    'main_description': 'Organize suas tarefas de forma visual e eficiente com nosso sistema Kanban intuitivo',
    'get_started': 'Começar Agora',
    'features_title': 'Por que escolher nosso Kanban?',
    'visual_organization': 'Organização Visual',
    'visual_organization_desc': 'Visualize o progresso das suas tarefas de forma clara e intuitiva',
    'team_collaboration': 'Colaboração em Equipe',
    'team_collaboration_desc': 'Trabalhe junto com sua equipe em tempo real',
    'easy_management': 'Gestão Simples',
    'easy_management_desc': 'Interface limpa e fácil de usar para máxima produtividade',
    
    // Landing Page Content
    'free_badge': '🎉 Grátis',
    'hero_title': 'Maximize Sua Produtividade, Minimize Distrações',
    'hero_description': 'O Thaski é a alternativa gratuita e minimalista ao Trello. Organize suas tarefas sem perder tempo com configurações desnecessárias.',
    'start_free': 'Começar gratuitamente',
    'free_features': '✨ Sem cartão de crédito • Sem limites • Grátis',
    'why_thaski': 'Por que escolher o Thaski?',
    'simplicity_works': 'Simplicidade que funciona',
    'tired_complex_tools': 'Cansado de ferramentas complicadas? O Thaski foi projetado para ser simples, rápido e eficiente. Comece a usar em segundos, não em horas.',
    'features': 'Recursos',
    'pricing': 'Preços',
    'demo': 'Demo',
    'enter': 'Entrar',
    'free_start': 'Começar grátis',
    'setup_seconds': 'Setup em segundos',
    'setup_seconds_desc': 'Sem configurações complexas. Crie seu primeiro projeto e comece a organizar suas tarefas imediatamente.',
    'intuitive_interface': 'Interface intuitiva',
    'intuitive_interface_desc': 'Design limpo e fácil de usar. Organize suas tarefas de forma visual e eficiente.',
    'minimalist_interface': 'Interface minimalista',
    'minimalist_interface_desc': 'Design limpo e intuitivo que não distrai. Foque no que realmente importa: suas tarefas.',
    'everything_you_need': 'Tudo que você precisa, nada que você não precisa',
    'transparent_pricing': 'Preços transparentes',
    'simple_as_should_be': 'Simples como deve ser',
    'no_tricks': 'Sem pegadinhas, sem taxa escondidas. O Thaski é e sempre será gratuito.',
    'most_popular': 'Mais popular',
    'free_plan': 'Plano Gratuito',
    'per_month': '/mês',
    'free': 'Grátis',
    'unlimited_projects': 'Projetos ilimitados',
    'unlimited_tasks': 'Tarefas ilimitadas',
    'responsive_interface': 'Interface responsiva',
    'email_support': 'Suporte por email',
    'start_now_free': 'Começar agora - É grátis!',
    'no_credit_card': 'Sem cartão de crédito • Sem período de teste • Grátis',
    'ready_productive': 'Pronto para ser mais produtivo?',
    'join_thousands': 'Junte-se a milhares de pessoas que escolheram a simplicidade do Thaski. Comece em segundos, não em horas.',
    'create_free_account': 'Criar conta gratuita',
    'rating_5': 'Avaliação 5.0',
    'users_1000': '+1000 usuários',
    '100_free': '100% grátis',
    'simplest_tool': 'A ferramenta de gestão de tarefas mais simples do mundo.',
    'create_account': 'Criar conta',
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
    
    'main_title': 'Manage your projects with ease',
    'main_description': 'Organize your tasks visually and efficiently with our intuitive Kanban system',
    'get_started': 'Get Started',
    'features_title': 'Why choose our Kanban?',
    'visual_organization': 'Visual Organization',
    'visual_organization_desc': 'Visualize your task progress clearly and intuitively',
    'team_collaboration': 'Team Collaboration',
    'team_collaboration_desc': 'Work together with your team in real-time',
    'easy_management': 'Simple Management',
    'easy_management_desc': 'Clean and easy-to-use interface for maximum productivity',
    
    // Landing Page Content
    'free_badge': '🎉 Free',
    'hero_title': 'Maximize Your Productivity, Minimize Distractions',
    'hero_description': 'Thaski is the free and minimalist alternative to Trello. Organize your tasks without wasting time on unnecessary configurations.',
    'start_free': 'Start for free',
    'free_features': '✨ No credit card • No limits • Free',
    'why_thaski': 'Why choose Thaski?',
    'simplicity_works': 'Simplicity that works',
    'tired_complex_tools': 'Tired of complicated tools? Thaski was designed to be simple, fast and efficient. Start using in seconds, not hours.',
    'features': 'Features',
    'pricing': 'Pricing',
    'demo': 'Demo',
    'enter': 'Sign In',
    'free_start': 'Start free',
    'setup_seconds': 'Setup in seconds',
    'setup_seconds_desc': 'No complex configurations. Create your first project and start organizing your tasks immediately.',
    'intuitive_interface': 'Intuitive interface',
    'intuitive_interface_desc': 'Clean and easy to use design. Organize your tasks visually and efficiently.',
    'minimalist_interface': 'Minimalist interface',
    'minimalist_interface_desc': 'Clean and intuitive design that doesn\'t distract. Focus on what really matters: your tasks.',
    'everything_you_need': 'Everything you need, nothing you don\'t',
    'transparent_pricing': 'Transparent pricing',
    'simple_as_should_be': 'Simple as it should be',
    'no_tricks': 'No tricks, no hidden fees. Thaski is and always will be free.',
    'most_popular': 'Most popular',
    'free_plan': 'Free Plan',
    'per_month': '/month',
    'free': 'Free',
    'unlimited_projects': 'Unlimited projects',
    'unlimited_tasks': 'Unlimited tasks',
    'responsive_interface': 'Responsive interface',
    'email_support': 'Email support',
    'start_now_free': 'Start now - It\'s free!',
    'no_credit_card': 'No credit card • No trial period • Free',
    'ready_productive': 'Ready to be more productive?',
    'join_thousands': 'Join thousands of people who chose the simplicity of Thaski. Start in seconds, not hours.',
    'create_free_account': 'Create free account',
    'rating_5': '5.0 rating',
    'users_1000': '+1000 users',
    '100_free': '100% free',
    'simplest_tool': 'The world\'s simplest task management tool.',
    'create_account': 'Create account',
  }
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get from localStorage first
    const saved = localStorage.getItem('language');
    if (saved) return saved as Language;
    
    // If not saved, detect browser language
    const browserLang = navigator.language || navigator.languages[0];
    return browserLang.startsWith('en') ? 'en' : 'pt';
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