import React from "react";

const NewQuestionInput: React.FC = () => {
  return (
    <div className="flex items-center justify-center my-6">
      <div className="w-4/5 h-32 bg-gray-100 rounded-lg p-6">
        <div className="flex h-full ">
          <div className="w-1/2 flex items-center mx-2">
            <input
              className="w-full border-b border-gray-300 bg-transparent py-2 px-4 focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Question"
            />
          </div>
          <div className="w-1/2 flex items-center mx-2">
            <input
              className="w-full border-b border-gray-300 bg-transparent py-2 px-4 focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Answer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewQuestionInput;
