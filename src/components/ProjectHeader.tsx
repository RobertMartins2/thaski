
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";

interface ProjectHeaderProps {
  projectName?: string;
}

export function ProjectHeader({ projectName = "Real Estate Project" }: ProjectHeaderProps) {
  const [apiKey, setApiKey] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  const generateRandomImage = async () => {
    if (!apiKey) {
      toast.error("Por favor, insira sua chave da API Runware");
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await fetch('https://api.runware.ai/v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            "taskType": "authentication",
            "apiKey": apiKey
          },
          {
            "taskType": "imageInference",
            "taskUUID": crypto.randomUUID(),
            "positivePrompt": "abstract gradient background, modern professional design, corporate header, blue purple gradient, minimalist",
            "width": 1200,
            "height": 300,
            "model": "runware:100@1",
            "numberResults": 1,
            "outputFormat": "WEBP"
          }
        ])
      });

      const data = await response.json();
      
      if (data.data && data.data.length > 0) {
        const imageData = data.data.find((item: any) => item.taskType === "imageInference");
        if (imageData && imageData.imageURL) {
          setBackgroundImage(imageData.imageURL);
          toast.success("Imagem gerada com sucesso!");
        }
      }
    } catch (error) {
      console.error("Erro ao gerar imagem:", error);
      toast.error("Erro ao gerar imagem. Verifique sua chave da API.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      setHasApiKey(true);
      generateRandomImage();
    }
  };

  useEffect(() => {
    if (hasApiKey && apiKey) {
      generateRandomImage();
    }
  }, []);

  if (!hasApiKey) {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
        <div className="max-w-md mx-auto space-y-4">
          <h3 className="text-white text-lg font-semibold">Configurar Geração de Imagens</h3>
          <p className="text-white/80 text-sm">
            Insira sua chave da API Runware para gerar imagens de fundo aleatórias. 
            Obtenha sua chave em: <a href="https://runware.ai/" target="_blank" className="underline">runware.ai</a>
          </p>
          <div className="flex gap-2">
            <Input
              type="password"
              placeholder="Chave da API Runware"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              onKeyPress={(e) => e.key === "Enter" && handleApiKeySubmit()}
            />
            <Button onClick={handleApiKeySubmit} className="bg-white text-blue-600 hover:bg-white/90">
              Salvar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative h-40 bg-gradient-to-r from-blue-600 to-purple-600 bg-cover bg-center"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative h-full flex flex-col justify-center px-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm font-medium mb-1">
              PROJETO / {projectName.toUpperCase()}
            </p>
            <h1 className="text-white text-3xl font-bold">
              {projectName}
            </h1>
          </div>
          <Button
            onClick={generateRandomImage}
            disabled={isGenerating}
            variant="secondary"
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Gerando...' : 'Nova Imagem'}
          </Button>
        </div>
      </div>
    </div>
  );
}
