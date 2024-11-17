// components/LoadingOverlay.tsx
import React from "react";
import Image from "next/image";

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = "Carregando...",
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50">
      {/* <div className="relative mb-6">
        <Image
          src="/your-logo.png" // Substitua com o logo do seu projeto
          alt="Logo"
          width={100}
          height={100}
          className="animate-bounce"
        />
      </div> */}
      <span className="text-white text-2xl font-semibold mb-4">{message}</span>
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
        <div className="w-4 h-4 bg-white rounded-full animate-pulse delay-200"></div>
        <div className="w-4 h-4 bg-white rounded-full animate-pulse delay-400"></div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
