import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, User, Bell, Shield, Palette } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function Settings() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 bg-background">
          <div className="container mx-auto px-6 py-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <SettingsIcon className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
                <p className="text-muted-foreground mt-1">
                  Personalize sua experiência no Kanban Board
                </p>
              </div>
            </div>

            <div className="grid gap-6">
              {/* Profile Settings */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    <CardTitle>Perfil do Usuário</CardTitle>
                  </div>
                  <CardDescription>
                    Gerencie suas informações pessoais e preferências de conta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input id="name" placeholder="Seu nome" defaultValue="Usuario" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" defaultValue="usuario@email.com" />
                    </div>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">
                    Salvar Alterações
                  </Button>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    <CardTitle>Notificações</CardTitle>
                  </div>
                  <CardDescription>
                    Configure como você deseja receber notificações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Notificações por E-mail</div>
                      <div className="text-sm text-muted-foreground">
                        Receba atualizações sobre suas tarefas por e-mail
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Notificações Push</div>
                      <div className="text-sm text-muted-foreground">
                        Receba notificações instantâneas no navegador
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Resumo Diário</div>
                      <div className="text-sm text-muted-foreground">
                        Receba um resumo das suas atividades todos os dias
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              {/* Appearance */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-primary" />
                    <CardTitle>Aparência</CardTitle>
                  </div>
                  <CardDescription>
                    Personalize a aparência da interface
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Modo Escuro</div>
                      <div className="text-sm text-muted-foreground">
                        Alternar entre tema claro e escuro
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Tema de Cores</Label>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-primary cursor-pointer" />
                      <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-transparent cursor-pointer" />
                      <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-transparent cursor-pointer" />
                      <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-transparent cursor-pointer" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <CardTitle>Segurança</CardTitle>
                  </div>
                  <CardDescription>
                    Gerencie suas configurações de segurança
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Autenticação de Dois Fatores</div>
                      <div className="text-sm text-muted-foreground">
                        Adicione uma camada extra de segurança à sua conta
                      </div>
                    </div>
                    <Badge variant="secondary">Em Breve</Badge>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Alterar Senha</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input type="password" placeholder="Senha atual" />
                      <Input type="password" placeholder="Nova senha" />
                    </div>
                    <Button variant="outline" size="sm">
                      Alterar Senha
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}