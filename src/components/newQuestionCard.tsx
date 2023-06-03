import React from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import { IQuestion } from "@/utils/interfaces";

interface Props {
  handleEditQuestion: (question: IQuestion) => void
}

const NewQuestionCard: React.FC<Props> = ({ handleEditQuestion }) => {
  const [id, setId] = useState(uuid())
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleQuestionInput = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = evt.target

    setQuestion(value);

  };

  const handleAnswerInput = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(evt.target.value);
  };

  const handleBlur = () => {
    handleEditQuestion({ question, answer, id })
  }

  return (
    <div className="flex items-center justify-center my-6">
      <div className="w-full h-32 bg-gray-100 rounded-lg p-6">
        <div className="flex h-full ">
          <div className="w-1/2 flex items-center mx-2">
            <textarea
              className="w-full border-b border-gray-300 bg-transparent py-2 px-4 focus:outline-none focus:border-blue-500"
              placeholder="Question"
              value={question}
              onChange={handleQuestionInput}
            />
          </div>
          <div className="w-1/2 flex items-center mx-2">
            <textarea
              className="w-full border-b border-gray-300 bg-transparent py-2 px-4 focus:outline-none focus:border-blue-500"
              placeholder="Answer"
              onChange={handleAnswerInput}
              value={answer}
              onBlur={handleBlur}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewQuestionCard;
