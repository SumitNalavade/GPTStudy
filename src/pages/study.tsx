import { NextPage, GetServerSideProps } from "next";
import { useState } from "react";
import openai from "@/utils/gpt";

import { IQuestion } from "@/utils/interfaces";

import QuestionCard from "@/components/questionCard";

interface Props {
  questions: IQuestion[];
  title: string;
  course: string;
}

const StudyPage: NextPage<Props> = ({ questions, title, course }) => {
  const [displayQuestion, setDisplayQuestion] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleButtonClicked = (type: string) => {
    if (type === "next") {
      return setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    return setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleCardFlip = () => {
    setDisplayQuestion(!displayQuestion);
  };

  return (
    <>
      <div className="flex flex-col items-center mt-12 h-full justify-center">
        <p className="font-bold text-4xl w-1/2">{title}</p>
        <p className="text-lg w-1/2 mb-4">{course}</p>

        <div
          className="w-1/2 h-96 rounded-xl bg-gray-100 cursor-pointer"
          onClick={handleCardFlip}
        >
          <div className="flex items-center text-gray-600 text-2xl text-center h-full p-8 justify-center">
            {displayQuestion ? (
              <p>{questions[currentQuestionIndex].question}</p>
            ) : (
              <p>{questions[currentQuestionIndex].answer}</p>
            )}
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
              <path d="M19 12H6M12 5l-7 7 7 7" />
            </svg>
          </button>

          <p className="font-medium text-lg">
            {currentQuestionIndex + 1}/{questions.length}
          </p>

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

        <div className="w-1/2 mt-20">
          {questions.map((question, index) => (
            <QuestionCard question={question} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const questions = [
    {
      question: 'Question: What is the capital city of France?',
      answer: 'The capital city of France is Paris.'
    },
    {
      question: 'Question: What is the capital of California?',
      answer: 'Sacramento'
    }
  ]

  return {
    props: {
      questions
    }
  }

  // const questionsArray = JSON.parse(query.data as string);

  // const questionsPromiseArray = questionsArray.map((prompt: IQuestion) =>
  //   openai.createChatCompletion({
  //     model: "gpt-3.5-turbo",
  //     messages: [
  //       { role: "user", content: prompt.question },
  //       { role: "assistant", content: prompt.answer },
  //       {
  //         role: "user",
  //         content: "Create a similar question without the answer to this",
  //       },
  //     ],
  //   })
  // );

  // const questions = await Promise.all(questionsPromiseArray).then((res) =>
  //   res.map((elm) => elm.data.choices[0].message?.content)
  // );

  // const answersPromiseArray = questions.map((question: string) =>
  //   openai.createChatCompletion({
  //     model: "gpt-3.5-turbo",
  //     messages: [
  //       { role: "user", content: question },
  //     ],
  //   })
  // );

  // const answers = await Promise.all(answersPromiseArray).then((res) =>
  //   res.map((elm) => elm.data.choices[0].message?.content)
  // );

  // const combinedArray = questions.map((question, index) => {
  //   return {
  //     question,
  //     answer: answers[index]
  //   };
  // });

  // return {
  //   props: {
  //     questions: combinedArray,
  //   },
  // };
};

export default StudyPage;
