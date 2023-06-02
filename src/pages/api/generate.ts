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

const createQuestions = async (
  questionsArray: IQuestion[],
  numQuestions: number
) => {
  const messages = questionsArray.flatMap((question: IQuestion) => [
    { role: "user", content: question.question },
    { role: "assistant", content: question.answer },
  ]);
  messages.push({
    role: "user",
    content: `Create a set of ${numQuestions} questions similar in content to these but without answers. Split each question with a ||`,
  });

  const chatGPT = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages.map((message: any) => ({
      role: message.role as "system" | "user" | "assistant",
      content: message.content,
    })),
  });

  const chatGPTMessage = chatGPT.data.choices[0].message?.content;

  console.log(chatGPTMessage);

  return chatGPTMessage?.split("||");
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

  console.log(answers);

  return answers;
};

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

  // const questions = await createQuestions(questionsArray, numQuestions);
  // const answers = await createAnswers(questions!);

  // const combinedArray = questions!.map((question, index) => {
  //   return {
  //     question,
  //     answer: answers[index]!,
  //   };
  // });

  // res.status(200).json({ questions: combinedArray });
}
