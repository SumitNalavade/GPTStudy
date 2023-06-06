import { NextPage } from "next";
import Link from "next/link";

import { getAuth } from "firebase/auth";

const Home: NextPage = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <>
      <div className="flex flex-col items-center justify-center pb-20 h-full">
        <h1 className="sm:text-8xl text-7xl font-bold text-center">GPT Study</h1>
        <p className="sm:text-2xl text-xl py-2">Generate study material with the GPT AI</p>

        <Link href={user ? "/create" : "/auth"} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 mt-10 rounded-lg shadow-lg">
          Create a free study set
        </Link>
      </div>
    </>
  );
};

export default Home;
