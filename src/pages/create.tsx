import { NextPage } from "next";
import react, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import axios from "axios";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { db } from "@/utils/firebaseConfig";
import NewQuestionInput from "@/components/newQuestionCard";

import withAuthProtection from "@/components/withAuthProtection";
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
    numQuestions: z.number().min(1).max(20),
  });

  type FormData = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema), defaultValues: { numQuestions: 3 } });

  const numQuestions = watch("numQuestions");

  const handleEditQuestion = (question: IQuestion) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = prevQuestions.filter((q) => q.id !== question.id);

      if (question.question.length > 0 || question.answer.length > 0) {
        updatedQuestions.push(question);
      }

      return updatedQuestions;
    });
  };

  const mutation = useMutation(
    ["createStudySet"],
    async (data: FormData) => {
      const { title, course } = data;

      const apiResponse = (await axios.post("/api/generate", { questionsArray: questions, numQuestions })).data;

      const currentDate = new Date();

      const docRef = await addDoc(collection(db, "studySets"), {
        questions: apiResponse.questions,
        title,
        course,
        user: currentUser?.uid,
        dateCreated: currentDate,
        dateAccessed: currentDate,
      });

      return docRef;
    },
    {
      onSuccess: (docRef) => {
        router.push({
          pathname: "/study",
          query: { studySetId: docRef.id },
        });
      },
    }
  );

  return (
    <div className="xl:w-4/5 m-auto">
      <p className="font-bold sm:text-3xl text-2xl m-auto mt-6">Generate A New Study Set</p>
      <div className="xl:flex m-auto">
        <div className="flex items-center justify-center my-6 w-full mx-2">
          <div className="bg-gray-100 rounded-lg p-6 flex flex-col justify-center items-center w-full">
            <input
              className="border-b border-gray-300 bg-transparent py-2 px-4 focus:outline-none focus:border-blue-500 w-full"
              type="text"
              placeholder="Give your set a title"
              {...register("title")}
            />
            {errors.title && <span className="text-red-500 block self-start mt-4">{errors.title.message}</span>}
          </div>
        </div>

        <div className="flex items-center justify-center my-6 w-full mx-2">
          <div className="bg-gray-100 flex-col rounded-lg p-6 flex justify-center items-center w-full">
            <input className="border-b border-gray-300 bg-transparent py-2 px-4 focus:outline-none focus:border-blue-500 w-full" type="text" placeholder="Course" {...register("course")} />
            {errors.course && <span className="text-red-500 self-start mt-4">{errors.course.message}</span>}
          </div>
        </div>
      </div>

      <div>
        <p className="font-bold text-xl sm:text-2xl mt-6">Number of Questions</p>

        <p className="font-medium text-md sm:text-lg mt-2">How many questions do you want to generate?</p>

        <div className="flex items-center">
          <input type="range" min="1" max="20" className="sm:w-1/2 w-full appearance-none h-2 bg-gray-200 rounded-lg outline-none" {...register("numQuestions", { valueAsNumber: true })} />
          <span className="ml-4">{numQuestions}</span>
        </div>
      </div>

      <div>
        <p className="font-bold text-xl sm:text-2xl mt-6">Example Questions</p>

        <p className="font-medium text-md sm:text-lg mt-2">Enter some of your questions to generate similar questions</p>

        {Array.from({ length: numCards }, (_, index) => (
          <NewQuestionInput key={index} handleEditQuestion={handleEditQuestion} />
        ))}
      </div>

      <div className="flex items-center justify-center my-6 w-full" onClick={() => setNumCards(numCards + 1)}>
        <div className="w-full h-32 bg-gray-100 rounded-lg p-6 flex justify-center items-center">
          <h2 className="font-medium">+ Add Card</h2>
        </div>
      </div>

      <div className="flex items-center justify-center sm:justify-end mb-4 w-full">
        <button className="bg-blue-500 text-white rounded-md py-2 px-4 disabled:bg-blue-300 disabled:opacity-50 w-full sm:w-fit" disabled={mutation.isLoading}>
          <p className={`${mutation.isLoading ? "hidden" : ""}`} onClick={handleSubmit((data) => mutation.mutate(data))}>
            Generate Practice Questions
          </p>
          <div className={`flex items-center justify-center ${!mutation.isLoading ? "hidden" : ""} text-white`}>
            <span className="mr-2">Generating Questions</span>
            <span className="text-gray-900">
              <span className="animate-ping text-white">.</span>
              <span className="animate-ping animate-pulse text-white">.</span>
              <span className="animate-ping animate-pulse text-white">.</span>
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default withAuthProtection(CreatePage);
