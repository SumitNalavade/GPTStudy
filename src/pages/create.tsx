import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import axios from "axios";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { db } from "@/utils/firebaseConfig";
import NewQuestionInput from "@/components/newQuestionCard";

import { IQuestion } from "@/utils/interfaces";

const CreatePage: NextPage = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const router = useRouter();

  const [numCards, setNumCards] = useState(3);
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    course: z.string().min(1, "Course is required"),
  });

  type FormData = z.infer<typeof formSchema>;

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(formSchema) })

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

  const createStudySet = async (data: FormData) => {
    const { title, course } = data
    
    // const apiResponse = (await axios.post("/api/generate", { questionsArray: questions })).data;

    const questions = [
      {
        question: "Question: What is the capital city of France?",
        answer: "The capital city of France is Paris.",
      },
      {
        question: "Question: What is the capital of California?",
        answer: "Sacramento",
      },
    ];

    const docRef = await addDoc(collection(db, "studySets"), {
      // questions: apiResponse.questions,
      questions,
      title,
      course,
      user: currentUser?.uid,
    });

    router.push({
      pathname: "/study",
      query: { studySetId: docRef.id },
    });
  };

  return (
    <form onSubmit={handleSubmit(createStudySet)}> 
      <p className="font-bold text-3xl w-4/5 m-auto mt-6">
        Generate A New Study Set
      </p>
      <div className="flex w-4/5 m-auto">
        <div className="flex items-center justify-center my-6 w-full mx-2">
          <div className="bg-gray-100 rounded-lg p-6 flex flex-col justify-center items-center w-full">
            <input
              className="border-b border-gray-300 bg-transparent py-2 px-4 focus:outline-none focus:border-blue-500 w-full"
              type="text"
              placeholder="Give your set a title"
              {...register("title")}
            />
            { errors.title && <span className="text-red-500 block self-start mt-4">{ errors.title.message }</span> }
          </div>  
        </div>

        <div className="flex items-center justify-center my-6 w-full mx-2">
          <div className="bg-gray-100 flex-col rounded-lg p-6 flex justify-center items-center w-full">
            <input
              className="border-b border-gray-300 bg-transparent py-2 px-4 focus:outline-none focus:border-blue-500 w-full"
              type="text"
              placeholder="Course"
              {...register("course")}
            />
            { errors.course && <span className="text-red-500 self-start mt-4">{ errors.course.message }</span> }
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

      <div
        className="flex items-center justify-center my-6 w-full"
        onClick={() => setNumCards(numCards + 1)}
      >
        <div className="w-4/5 h-32 bg-gray-100 rounded-lg p-6 flex justify-center items-center">
          <h2 className="font-medium">+ Add Card</h2>
        </div>
      </div>

      <div className="flex items-center justify-center w-full">
        <div className="w-4/5 mb-4 rounded-lg flex justify-end items-center">
          <button className="bg-blue-500 text-white rounded-md py-2 px-4">
            Generate Practice Questions
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreatePage;
