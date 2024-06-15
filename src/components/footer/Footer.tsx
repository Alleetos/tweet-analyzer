// Footer.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo do Projeto" width={30} height={30} />
          <span className="ml-2">PsyTweet Analyzer</span>
        </div>
        <div className="flex space-x-4">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <Link href="/about" className="hover:text-primary">
            Sobre
          </Link>
          <Link href="/contact" className="hover:text-primary">
            Contato
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
