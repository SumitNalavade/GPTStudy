import React from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import MathInput from "react-math-keyboard";
import { BiMath } from "react-icons/bi";

import { IQuestion } from "@/utils/interfaces";

interface Props {
  handleEditQuestion: (question: IQuestion) => void;
}

const NewQuestionCard: React.FC<Props> = ({ handleEditQuestion }) => {
  const [id, setId] = useState(uuid());
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionMathActive, setQuestionMathActive] = useState(false);
  const [answerMathActive, setAnswerMathActive] = useState(false);

  const handleQuestionInput = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = evt.target;

    setQuestion(value);
  };

  const handleAnswerInput = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(evt.target.value);
  };

  const handleBlur = () => {
    handleEditQuestion({ question, answer, id });
  };

  return (
    <div className="flex items-center justify-center my-6">
      <div className="w-full md:h-36 bg-gray-100 rounded-lg p-4">
        <div className="md:flex h-full ">
          <div className="md:w-1/2 flex flex-col mx-2 mb-2">
            <div className="bg-gray-300 py-2 mb-2 rounded-lg md:w-1/4 w-1/2">
              <div className="hover:cursor-pointer">
                <BiMath className="mx-4" onClick={() => setQuestionMathActive(!questionMathActive)} />
              </div>
            </div>
            {questionMathActive ? (
              <MathInput numericToolbarKeys={["cos", "sin", "tan"]} setValue={setQuestion} />
            ) : (
              <textarea
                className="w-full border-b border-gray-300 bg-transparent px-4 my-2 focus:outline-none focus:border-blue-500"
                placeholder="Question"
                value={question}
                onChange={handleQuestionInput}
              />
            )}
          </div>
          <div className="md:w-1/2 flex flex-col mx-2 mb-2" onBlur={handleBlur}>
            <div className="bg-gray-300 mb-2 py-2 rounded-lg md:w-1/4 w-1/2">
              <div className="hover:cursor-pointer">
                <BiMath className="mx-4" onClick={() => setAnswerMathActive(!answerMathActive)} />
              </div>
            </div>
            {answerMathActive ? (
              <MathInput numericToolbarKeys={["cos", "sin", "tan"]} setValue={setAnswer} />
            ) : (
              <textarea
                className="w-full border-b border-gray-300 my-2 bg-transparent px-4 focus:outline-none focus:border-blue-500"
                placeholder="Answer"
                onChange={handleAnswerInput}
                value={answer}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewQuestionCard;
