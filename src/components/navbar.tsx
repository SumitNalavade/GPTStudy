import React from "react";
import Link from "next/link";

import { getAuth } from "firebase/auth";

const Navbar: React.FC = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white font-bold text-lg">GPTStudy</Link>
          </div>
          <div className="flex items-center">
            <Link href={ user ? "/user" : "/auth" } className="rounded-full text-white p-2 flex items-center justify-center">
              <img src={user?.photoURL as string} alt="Profile Picture" className="w-10 h-10 rounded-full" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;