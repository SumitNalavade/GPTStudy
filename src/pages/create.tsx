import { NextPage } from "next";
import { useState } from "react";

import NewQuestionInput from "@/components/newQuestionInput";

const CreatePage: NextPage = () => {
  const [numCards, setNumCards] = useState(4);

  const handleAddCard = () => {
    setNumCards(numCards + 1);
  };

  return (
    <>
      <h1 className="font-bold text-3xl w-4/5 m-auto mt-6">
        Generate A New Study Set
      </h1>
      <div className="flex w-4/5 m-auto">
        <div className="flex items-center justify-center my-6 w-full mx-2">
          <div className="bg-gray-100 rounded-lg p-6 flex justify-center items-center w-full">
            <input
              className="border-b border-gray-300 bg-transparent py-2 px-4 focus:outline-none focus:border-blue-500 w-full"
              type="text"
              placeholder="Give your set a title"
            />
          </div>
        </div>

        <div className="flex items-center justify-center my-6 w-full mx-2">
          <div className="bg-gray-100 rounded-lg p-6 flex justify-center items-center w-full">
            <input
              className="border-b border-gray-300 bg-transparent py-2 px-4 focus:outline-none focus:border-blue-500 w-full"
              type="text"
              placeholder="Course"
            />
          </div>
        </div>
      </div>

      {Array.from({ length: numCards }, (_, index) => (
        <NewQuestionInput key={index} />
      ))}

      <button className="flex items-center justify-center my-6 w-full" onClick={handleAddCard}>
        <div className="w-4/5 h-32 bg-gray-100 rounded-lg p-6 flex justify-center items-center">
          <h2 className="font-medium">
            + Add Card
          </h2>
        </div>
      </button>
    </>
  );
};

export default CreatePage;
