import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white font-bold text-lg">GPTStudy</Link>
          </div>
          <div className="flex items-center">
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;