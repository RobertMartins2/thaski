

interface ProjectHeaderProps {
  projectName?: string;
}

export function ProjectHeader({ projectName = "Real Estate Project" }: ProjectHeaderProps) {
  return (
    <div className="relative h-32 bg-gradient-to-r from-blue-600 to-purple-600 bg-cover bg-center">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative h-full flex flex-col justify-center px-8">
        <div>
          <p className="text-white/80 text-sm font-medium mb-1">
            PROJETO / {projectName.toUpperCase()}
          </p>
          <h1 className="text-white text-2xl font-bold">
            {projectName}
          </h1>
        </div>
      </div>
    </div>
  );
}
