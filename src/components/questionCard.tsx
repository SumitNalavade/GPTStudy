import React from "react";

import { IQuestion } from "@/utils/interfaces";

interface Props {
  question: IQuestion;
}

const QuestionCard: React.FC<Props> = ({ question }) => {
  return (
    <div className="sm:flex my-6 w-full text-center">
      <div className="flex-1 bg-gray-100 rounded-lg p-6 mx-2 flex justify-center items-center ">
        <p>{question.question}</p>
      </div>

      <div className="sm:flex hidden flex-1 bg-gray-100 rounded-lg p-6 mx-2 justify-center items-center ">
        <p>{question.answer}</p>
      </div>
    </div>
  );
};

export default QuestionCard;
