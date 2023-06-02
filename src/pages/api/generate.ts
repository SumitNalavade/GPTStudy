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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  
  await delay(5000)
  return res.status(200).json({ questions: [
    {
      question: "Question: What is the capital city of France?",
      answer: "The capital city of France is Paris.",
    },
    {
      question: "Question: What is the capital of California?",
      answer: "Sacramento",
    },
  ] });

  const { questionsArray } = req.body;

  const questionsPromiseArray = questionsArray.map((prompt: IQuestion) =>
    openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: prompt.question },
        { role: "assistant", content: prompt.answer },
        {
          role: "user",
          content: "Create a similar but unique question without the answer to this",
        },
      ],
    })
  );

  const questions = await Promise.all(questionsPromiseArray).then((res) =>
    res.map((elm) => elm.data.choices[0].message?.content)
  );

  const answersPromiseArray = questions.map((question: string) =>
    openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    })
  );

  const answers = await Promise.all(answersPromiseArray).then((res) =>
    res.map((elm) => elm.data.choices[0].message?.content)
  );

  const combinedArray = questions.map((question, index) => {
    return {
      question,
      answer: answers[index]!,
    };
  });

  res.status(200).json({ questions: combinedArray });
}
