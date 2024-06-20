// Header.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center mb-8">
      <Link href="/" className="flex items-center">
        <Image src="/logo.png" alt="Logo do Projeto" width={100} height={100} />
        <span className="ml-2 text-2xl"> / </span>
        <span className="ml-2 text-2xl font-bold">Tweet Analyzer</span>
      </Link>
    </header>
  );
};

export default Header;
