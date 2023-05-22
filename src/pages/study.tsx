import { NextPage, GetServerSideProps } from "next";
import { useState } from "react";
import openai from "@/utils/gpt";

import { IQuestion } from "@/utils/interfaces";

interface Props {
  questions: { question: string, answer: string }[];
}

const StudyPage: NextPage<Props> = ({ questions }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleButtonClicked = (type: string) => {
        if(type === "next") {
            return setCurrentQuestionIndex(currentQuestionIndex + 1)
        }

        return setCurrentQuestionIndex(currentQuestionIndex - 1)
    }

  return (
    <>
      <div className="flex justify-center items-center h-full">
        <button className="disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 bg-gray-300 text-gray-700 text-sm font-semibold rounded-lg mx-2" disabled={ currentQuestionIndex === 0 } onClick={() => handleButtonClicked("previous")}>
          Previous
        </button>
        <div className="bg-white rounded-lg shadow-md p-8 max-w-lg">
          <div className="text-gray-600 text-lg">
            { questions[currentQuestionIndex].question }
          </div>
        </div>
        <button className="disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 bg-gray-300 text-gray-700 text-sm font-semibold rounded-lg mx-2" disabled={ currentQuestionIndex === questions.length - 1 } onClick={() => handleButtonClicked("next")}>
          Next
        </button>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const apiResponse = "1. Find the volume of the solid obtained by rotating the region bounded by the curve y = x^2 - 4x + 4 and the x-axis about the y-axis.\n  Answer: 128π/15\n\n  2. Find the area between the curves y = x^3 and y = x for x in [0, 1].\n  Answer: 1/4\n\n  3. What is the value of integral from 0 to 1 of (x ln x) dx?\n  Answer: -1/4\n\n  4. Find the volume of the solid obtained by rotating the region bounded by the curve y = x and the lines y = 0, x = 1, x = 2 about the x-axis.\n  Answer: (π/2)\n\n  5. Evaluate the integral from 0 to π of sin(2x)cos(3x) dx.\n  Answer: 0";

    const questionsArray = apiResponse.split("\n\n").map((item) => {
      const [question, answer] = item.split("  Answer: ");
      return { question: question.trim(), answer: answer.trim() };
    });

  return {
    props: {
      questions: questionsArray,
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
