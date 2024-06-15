// Header.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/" className="flex items-center">
        <Image src="/logo.png" alt="Logo do Projeto" width={50} height={50} />
        <span className="ml-2 text-2xl font-bold">PsyTweet Analyzer</span>
      </Link>
    </header>
  );
};

export default Header;
