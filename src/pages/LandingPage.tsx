import React from 'react';
import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Bem-vindo ao Thaski
        </h1>
        
        <div className="text-center mb-12">
          <p className="text-xl text-muted-foreground mb-6">
            Gerencie seus projetos de forma eficiente com nossa plataforma
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link 
              to="/login" 
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Fazer Login
            </Link>
            <Link 
              to="/signup" 
              className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors"
            >
              Criar Conta
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Gestão de Tarefas</h3>
            <p className="text-muted-foreground">
              Organize suas tarefas com nosso sistema Kanban intuitivo
            </p>
          </div>
          
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Colaboração em Equipe</h3>
            <p className="text-muted-foreground">
              Trabalhe em equipe de forma sincronizada e eficiente
            </p>
          </div>
          
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Relatórios</h3>
            <p className="text-muted-foreground">
              Acompanhe o progresso dos seus projetos com relatórios detalhados
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;