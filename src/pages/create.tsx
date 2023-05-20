import { NextPage } from "next";

import NewQuestionInput from "@/components/newQuestionInput";

const CreatePage: NextPage = () => {
  return (
    <>
        <h1 className="font-bold text-3xl w-4/5 m-auto mt-6">Generate A New Study Set</h1>
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

      <NewQuestionInput />
      <NewQuestionInput />
      <NewQuestionInput />

      <div className="flex items-center justify-center my-6">
        <div className="w-4/5 h-32 bg-gray-100 rounded-lg p-6 flex justify-center items-center">
          <h2 className="font-medium">+ Add Card</h2>
        </div>
      </div>
    </>
  );
};

export default CreatePage;
