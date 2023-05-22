import { NextPage } from "next";
import { useState } from "react";
import axios from "axios";

import NewQuestionInput from "@/components/newQuestionCard";

import { IQuestion } from "@/utils/interfaces";

const CreatePage: NextPage = () => {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [numCards, setNumCards] = useState(3);
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const handleTitleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.target.value);

    console.log(title);
  };

  const handleCourseChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setCourse(evt.target.value);
  };

  const handleAddCard = async () => {
    setNumCards(numCards + 1);
  };

  const handleEditQuestion = (question: IQuestion) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = prevQuestions.filter(
        (q) => q.id !== question.id
      );

      if (question.question.length > 0 || question.answer.length > 0) {
        updatedQuestions.push(question);
      }

      return updatedQuestions;
    });
  };

  const handleButtonClicked = async () => {
    // const response = (await axios.post("/api/hello", { questions })).data

    // console.log(response);
  };

  return (
    <>
      <p className="font-bold text-3xl w-4/5 m-auto mt-6">
        Generate A New Study Set
      </p>
      <div className="flex w-4/5 m-auto">
        <div className="flex items-center justify-center my-6 w-full mx-2">
          <div className="bg-gray-100 rounded-lg p-6 flex justify-center items-center w-full">
            <input
              className="border-b border-gray-300 bg-transparent py-2 px-4 focus:outline-none focus:border-blue-500 w-full"
              type="text"
              placeholder="Give your set a title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
        </div>

        <div className="flex items-center justify-center my-6 w-full mx-2">
          <div className="bg-gray-100 rounded-lg p-6 flex justify-center items-center w-full">
            <input
              className="border-b border-gray-300 bg-transparent py-2 px-4 focus:outline-none focus:border-blue-500 w-full"
              type="text"
              placeholder="Course"
              value={course}
              onChange={handleCourseChange}
            />
          </div>
        </div>
      </div>

      <div className="w-4/5 m-auto">
        <p className="font-bold text-2xl mt-6">Example Questions</p>

        <p className="font-medium text-lg mt-2">
          Enter some of your questions to generate similar questions
        </p>
      </div>

      {Array.from({ length: numCards }, (_, index) => (
        <NewQuestionInput key={index} handleEditQuestion={handleEditQuestion} />
      ))}

      <button
        className="flex items-center justify-center my-6 w-full"
        onClick={handleAddCard}
      >
        <div className="w-4/5 h-32 bg-gray-100 rounded-lg p-6 flex justify-center items-center">
          <h2 className="font-medium">+ Add Card</h2>
        </div>
      </button>

      <div className="flex items-center justify-center w-full">
        <div className="w-4/5 mb-4 rounded-lg flex justify-end items-center">
          <button
            className="bg-blue-500 text-white rounded-md py-2 px-4"
            onClick={handleButtonClicked}
          >
            Generate Practice Questions
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePage;
