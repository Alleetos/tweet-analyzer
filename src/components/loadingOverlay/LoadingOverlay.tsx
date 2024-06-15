import React from "react";
import Image from "next/image";

interface LoadingOverlayProps {
  username: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ username }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-85 flex flex-col items-center justify-center z-50">
      <div className="relative mb-4">
        <Image
          src={"/twitter-logo.png"}
          alt="Logo do Twitter"
          width={90}
          height={90}
          className="animate-pulse mb-4"
        />
      </div>
      <span className="text-white text-2xl font-semibold mb-4">
        Buscando dados de {username} no Twitter
        <span className="animate-dot-pulse"> </span>
      </span>
    </div>
  );
};

export default LoadingOverlay;
