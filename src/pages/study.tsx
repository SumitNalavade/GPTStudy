import { NextPage, GetServerSideProps } from "next";
import { useState } from "react";
import openai from "@/utils/gpt";

import { IQuestion } from "@/utils/interfaces";

interface Props {
  questions: { question: string; answer: string }[];
  title: string;
  course: string;
}

const StudyPage: NextPage<Props> = ({ questions, title, course }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleButtonClicked = (type: string) => {
    if (type === "next") {
      return setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    return setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  return (
    <>
      <p className="font-bold text-3xl w-1/2 m-auto mt-6">{title}</p>
      <p className="text-lg w-1/2 m-auto ">{course}</p>
      <div className="flex flex-col items-center mt-12">
        {/* <button
          className="disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 bg-gray-300 text-gray-700 text-sm font-semibold rounded-lg mx-2"
          disabled={currentQuestionIndex === 0}
          onClick={() => handleButtonClicked("previous")}
        >
          Previous
        </button> */}
        <div className="w-1/2 h-96 rounded-xl bg-gray-100">
          <div className="flex items-center text-gray-600 text-2xl text-center h-full p-8">
            {questions[currentQuestionIndex].question}
          </div>
        </div>

        <div className="w-1/2 flex justify-evenly items-center mt-4">
          <button
            className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentQuestionIndex === 0}
            onClick={() => handleButtonClicked("previous")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M5 12h13M12 5l7 7-7 7" />
            </svg>
          </button>

          <p className="font-medium text-lg">{currentQuestionIndex + 1}/{questions.length}</p>

          <button
            className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentQuestionIndex === questions.length - 1}
            onClick={() => handleButtonClicked("next")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 transform rotate-180"
            >
              <path d="M19 12H6M12 5l-7 7 7 7" />
            </svg>
          </button>
        </div>

        {/* <button
          className="disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 bg-gray-300 text-gray-700 text-sm font-semibold rounded-lg mx-2"
          disabled={currentQuestionIndex === questions.length - 1}
          onClick={() => handleButtonClicked("next")}
        >
          Next
        </button> */}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { title, course } = query;

  const apiResponse =
    "1. Find the volume of the solid obtained by rotating the region bounded by the curve y = x^2 - 4x + 4 and the x-axis about the y-axis.\n  Answer: 128π/15\n\n  2. Find the area between the curves y = x^3 and y = x for x in [0, 1].\n  Answer: 1/4\n\n  3. What is the value of integral from 0 to 1 of (x ln x) dx?\n  Answer: -1/4\n\n  4. Find the volume of the solid obtained by rotating the region bounded by the curve y = x and the lines y = 0, x = 1, x = 2 about the x-axis.\n  Answer: (π/2)\n\n  5. Evaluate the integral from 0 to π of sin(2x)cos(3x) dx.\n  Answer: 0";

  const questionsArray = apiResponse.split("\n\n").map((item) => {
    const [question, answer] = item.split("  Answer: ");
    return { question: question.trim(), answer: answer.trim() };
  });

  return {
    props: {
      questions: questionsArray,
      title,
      course,
    },
  };

  //   const questionsArray = JSON.parse(query.data as string);

  //   const messages = questionsArray.flatMap((question: IQuestion) => [
  //     { role: "user", content: question.question },
  //     { role: "assistant", content: question.answer }
  //   ]);

  //   messages.push({ role: "user", content: "Create a set of 5 questions similar to these with answers" })

  //   const chatGPT = await openai.createChatCompletion({
  //     model: "gpt-3.5-turbo",
  //     messages: messages.map((message: any) => ({
  //       role: message.role as 'system' | 'user' | 'assistant',
  //       content: message.content,
  //     }))
  //   })

  //   const chatGPTMessage = chatGPT.data.choices[0].message?.content;

  //   const questions = chatGPTMessage!.split("\n\n").map((item) => {
  //           const [question, answer] = item.split("  Answer: ");
  //           return { question: question.trim(), answer: answer.trim() };
  //         });

  //   return {
  //     props: {
  //       questions,
  //     },
  //   };
};

export default StudyPage;
