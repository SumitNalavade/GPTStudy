import type { NextApiRequest, NextApiResponse } from "next";
import openai from "@/utils/gpt";

import { IQuestion } from "@/utils/interfaces";

type ResponseData = {
  questions: IQuestion[];
};

function delay(milliseconds: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

const createQuestions = async (initialQuestions: IQuestion[]) => {
  const questionsPromiseArray = initialQuestions.map((prompt: IQuestion) =>
    openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: prompt.question },
        { role: "assistant", content: prompt.answer },
        {
          role: "user",
          content:
            "Create a similar but unique question without the answer to this",
        },
      ],
    })
  );

  const questions = await Promise.all(questionsPromiseArray).then((res) =>
    res.map((elm) => elm.data.choices[0].message?.content)
  );

  return questions as string[];
};

const createAnswers = async (questions: string[]) => {
  const answersPromiseArray = questions.map((question: string) =>
    openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    })
  );

  const answers = await Promise.all(answersPromiseArray).then((res) =>
    res.map((elm) => elm.data.choices[0].message?.content)
  );

  return answers;
};

const modifyInitialQuestionsArray = (initialQuestions: IQuestion[], desiredLength: number) => {
  const newArray = [];
    
    if(initialQuestions.length === desiredLength) return initialQuestions
  
    if(desiredLength < initialQuestions.length) {
        while (newArray.length < desiredLength) {
            const randomIndex = Math.floor(Math.random() * initialQuestions.length);
            const randomElement = initialQuestions[randomIndex];
            newArray.push(randomElement);
        }
        
        return newArray
    }
    
    while (desiredLength > newArray.length) {
        const randomIndex = Math.floor(Math.random() * initialQuestions.length);
        newArray.push(initialQuestions[randomIndex])
    }
    
    return newArray;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  await delay(5000);
  return res.status(200).json({
    questions: [
      {
        question: "Question: What is the capital city of France?",
        answer: "The capital city of France is Paris.",
      },
      {
        question: "Question: What is the capital of California?",
        answer: "Sacramento",
      },
    ],
  });

  // const { questionsArray, numQuestions } = req.body;

  // const initialQuestions = modifyInitialQuestionsArray(questionsArray, numQuestions)
  // const questions = await createQuestions(initialQuestions);
  // const answers = await createAnswers(questions);

  // const combinedArray = questions.map((question, index) => {
  //   return {
  //     question,
  //     answer: answers[index]!,
  //   };
  // });

  // res.status(200).json({ questions: combinedArray });
}
