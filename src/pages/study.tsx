import { NextPage, GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "@/utils/firebaseConfig";
import { IQuestion, IStudySet } from "@/utils/interfaces";

import QuestionCard from "@/components/questionCard";

interface Props {
  questions: IQuestion[];
  title: string;
  course: string;
  studySetId: string;
}

const StudyPage: NextPage<Props> = ({ questions, title, course, studySetId }) => {
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

  const updateAccessedDateMutation = useMutation(["updateAccessedDate"], async () => {
    const studySetRef = doc(db, "studySets", studySetId);

    await updateDoc(studySetRef, {
      dateAccessed: new Date()
    })
  })

  useEffect(() => {
    updateAccessedDateMutation.mutate();
  }, []);

  return (
    <>
      <div className="flex flex-col mt-12 h-full justify-center w-full max-w-3xl m-auto">
        <p className="font-bold text-5xl sm:text-left text-center">{title}</p>
        <p className="text-lg sm:text-left text-center mb-4">{course}</p>

        <div className="sm:min-h-[375px] min-h-[250px] rounded-xl bg-gray-100 cursor-pointer" onClick={handleCardFlip}>
          <div className="flex items-center text-gray-600 sm:text-2xl text-lg text-center h-full p-8 justify-center">
            {displayQuestion ? <p>{questions[currentQuestionIndex].question}</p> : <p>{questions[currentQuestionIndex].answer}</p>}
          </div>
        </div>

        <div className="flex justify-evenly items-center mt-4">
          <button
            className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentQuestionIndex === 0}
            onClick={() => handleButtonClicked("previous")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
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

        <div>
          {questions.map((question, index) => (
            <QuestionCard question={question} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { studySetId, studySet } = query;

  if (studySet) {
    const set: IStudySet = JSON.parse(studySet as string);
    return {
      props: {
        questions: set.questions,
        title: set.title,
        course: set.course,
        studySetId: set.id,
      },
    };
  }

  const docRef = doc(db, "studySets", studySetId as string);
  const docSnap = await getDoc(docRef);

  // @ts-ignore
  const { questions, title, course } = docSnap.data();

  return {
    props: {
      questions,
      title,
      course,
      studySetId,
    },
  };
};

export default StudyPage;
