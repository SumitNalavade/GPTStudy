import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-white font-bold text-lg">Logo</span>
          </div>
          <div className="flex items-center">
            <a
              className="text-white hover:text-gray-200 px-3 py-2 rounded-md"
              href="#"
            >
              Home
            </a>
            <a
              className="text-white hover:text-gray-200 px-3 py-2 rounded-md"
              href="#"
            >
              About
            </a>
            <a
              className="text-white hover:text-gray-200 px-3 py-2 rounded-md"
              href="#"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;