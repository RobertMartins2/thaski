
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthWrapper } from "@/components/AuthWrapper";

import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    console.log('App component rendered');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {/* Landing page - rota pública */}
            <Route path="/lp" element={<LandingPage />} />
            
            {/* Auth routes - não precisam de AuthWrapper */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
             {/* Rota raiz redireciona para landing page */}
             <Route path="/" element={<Navigate to="/lp" replace />} />
            <Route path="/projects" element={
              <AuthWrapper>
                <Projects />
              </AuthWrapper>
            } />
            <Route path="/project/:id" element={
              <AuthWrapper>
                <ProjectDetail />
              </AuthWrapper>
            } />
            <Route path="/settings" element={
              <AuthWrapper>
                <Settings />
              </AuthWrapper>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
