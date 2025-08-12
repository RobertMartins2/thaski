import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Zap, Users, Smartphone, Star, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    console.log('LandingPage component loaded and rendered');
  }, []);

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: "Setup em segundos",
      description: "Sem configurações complexas. Crie seu primeiro projeto e comece a organizar suas tarefas imediatamente."
    },
    {
      icon: <Users className="w-6 h-6 text-green-600" />,
      title: "Interface intuitiva",
      description: "Design limpo e fácil de usar. Organize suas tarefas de forma visual e eficiente."
    },
    {
      icon: <Smartphone className="w-6 h-6 text-purple-600" />,
      title: "Interface minimalista",
      description: "Design limpo e intuitivo que não distrai. Foque no que realmente importa: suas tarefas."
    }
  ];

  const benefits = [
    "100% gratuito, sem limites de projetos",
    "Interface minimalista e intuitiva", 
    "Drag & drop para organizar tarefas",
    "Sem configurações desnecessárias",
    "Responsivo - funciona em qualquer dispositivo",
    "Código aberto e transparente"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/311a49a3-a023-4208-954c-dad2347c5e50.png" 
              alt="Thaski Logo" 
              className="h-8"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Recursos
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Preços
            </a>
            <a href="#demo" className="text-muted-foreground hover:text-foreground transition-colors">
              Demo
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <NavLink to="/login">
              <Button variant="ghost">Entrar</Button>
            </NavLink>
            <NavLink to="/signup">
              <Button>Começar grátis</Button>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background p-4">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Recursos
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Preços  
              </a>
              <a href="#demo" className="text-muted-foreground hover:text-foreground transition-colors">
                Demo
              </a>
              <div className="flex flex-col gap-2 pt-4">
                <NavLink to="/login">
                  <Button variant="ghost" className="w-full">Entrar</Button>
                </NavLink>
                <NavLink to="/signup">
                  <Button className="w-full">Começar grátis</Button>
                </NavLink>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[size:60px_60px] opacity-20"></div>
        
        <div className="container mx-auto px-6 py-24 lg:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20">
              🎉 Grátis
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Maximize Sua Produtividade, Minimize Distrações
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              O Thaski é a alternativa <strong>gratuita e minimalista</strong> ao Trello. 
              Organize suas tarefas sem perder tempo com configurações desnecessárias.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <NavLink to="/signup">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg font-semibold">
                  Começar gratuitamente
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </NavLink>
            </div>

            <p className="text-blue-200 text-sm">
              ✨ Sem cartão de crédito • Sem limites • Grátis
            </p>
          </div>

          {/* Product Preview */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-4 text-xs text-gray-400">thaski.com</div>
                </div>
              </div>
              
              {/* Mock Kanban Interface */}
              <div className="bg-gray-50 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800">📋 A Fazer</h4>
                      <span className="text-xs text-gray-500">3</span>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                        <p className="text-sm text-gray-800 font-medium">Redesign da homepage</p>
                        <p className="text-xs text-gray-600 mt-1">Alta prioridade</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-800">Reunião com cliente</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800">🔄 Em Progresso</h4>
                      <span className="text-xs text-gray-500">2</span>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-500">
                        <p className="text-sm text-gray-800 font-medium">Desenvolvimento API</p>
                        <div className="flex items-center mt-2 gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                            J
                          </div>
                          <span className="text-xs text-gray-600">João Silva</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800">✅ Concluído</h4>
                      <span className="text-xs text-gray-500">5</span>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500 opacity-75">
                        <p className="text-sm text-gray-800 line-through">Setup do projeto</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg opacity-75">
                        <p className="text-sm text-gray-800 line-through">Definir requisitos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4">Por que escolher o Thaski?</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Simplicidade que funciona
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cansado de ferramentas complicadas? O Thaski foi projetado para ser simples, 
              rápido e eficiente. Comece a usar em segundos, não em horas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 rounded-full bg-gradient-to-r from-blue-50 to-blue-100">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits Grid */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                  Tudo que você precisa, nada que você não precisa
                </h3>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600"></div>
                    <div>
                      <div className="font-semibold text-foreground">vs. Outras ferramentas</div>
                      <div className="text-sm text-muted-foreground">Comparação rápida</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm">Setup inicial</span>
                      <Badge className="bg-green-100 text-green-800">2 minutos</Badge>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm">Preço mensal</span>
                      <Badge className="bg-green-100 text-green-800">R$ 0</Badge>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm">Complexidade</span>
                      <Badge className="bg-green-100 text-green-800">Simples</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4">Preços transparentes</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Simples como deve ser
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sem pegadinhas, sem taxa escondidas. O Thaski é e sempre será gratuito.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <Card className="border-2 border-blue-200 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <Badge className="bg-blue-100 text-blue-800 mb-4">Mais popular</Badge>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Plano Gratuito</h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-5xl font-bold text-foreground">R$ 0</span>
                    <div className="text-left">
                      <div className="text-muted-foreground">/mês</div>
                      <div className="text-sm text-green-600 font-semibold">Grátis</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8 text-left">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Projetos ilimitados</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Tarefas ilimitadas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Interface responsiva</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Suporte por email</span>
                  </div>
                </div>

                <NavLink to="/signup" className="block">
                  <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Começar agora - É grátis!
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </NavLink>
                
                <p className="text-sm text-muted-foreground mt-4">
                  Sem cartão de crédito • Sem período de teste • Grátis
                </p>
                
                {/* Product Screenshot */}
                <div className="mt-12">
                  <img 
                    src="/lovable-uploads/b7a16a39-d118-4e70-ac87-ba52f7f8ad9b.png"
                    alt="Interface do Thaski mostrando projeto Horse com colunas A Fazer, Em Andamento, Em Revisão e Concluído"
                    className="w-full max-w-4xl mx-auto rounded-xl shadow-2xl border border-gray-200"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[size:60px_60px] opacity-30"></div>
        
        <div className="container mx-auto px-6 text-center relative">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Pronto para ser mais produtivo?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que escolheram a simplicidade do Thaski. 
            Comece em segundos, não em horas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NavLink to="/signup">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg font-semibold">
                Criar conta gratuita
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </NavLink>
            <NavLink to="/login">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg">
                Já tenho conta
              </Button>
            </NavLink>
          </div>

          <div className="flex items-center justify-center gap-8 mt-12 text-blue-200">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-current" />
              <span className="text-sm">Avaliação 5.0</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="text-sm">+1000 usuários</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">100% grátis</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <img 
                src="/lovable-uploads/311a49a3-a023-4208-954c-dad2347c5e50.png" 
                alt="Thaski Logo" 
                className="h-8"
              />
            </div>
            <p className="text-gray-400 mb-6">
              A ferramenta de gestão de tarefas mais simples do mundo.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <NavLink to="/login" className="hover:text-white transition-colors">
                Entrar
              </NavLink>
              <NavLink to="/signup" className="hover:text-white transition-colors">
                Criar conta
              </NavLink>
              <a href="#features" className="hover:text-white transition-colors">
                Recursos
              </a>
              <a href="#pricing" className="hover:text-white transition-colors">
                Preços
              </a>
            </div>
            
            <div className="border-t border-gray-800 pt-8">
              <p className="text-sm text-gray-500">
                © 2024 Thaski. Todos os direitos reservados. Feito com ❤️ para pessoas produtivas.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}