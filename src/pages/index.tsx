import { NextPage } from "next";

import NewQuestionInput from "@/components/newQuestionInput";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-center">GPT Study</h1>
        <p className="text-xl py-2">Generate study material with the GPT AI</p>
      </div>

      <NewQuestionInput />
    </>
  );
}

export default Home;