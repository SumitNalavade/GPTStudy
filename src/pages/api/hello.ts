import type { NextApiRequest, NextApiResponse } from "next";

import openai from "@/utils/gpt";
import { IQuestion } from "@/utils/interfaces";

type Data = {
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const { questions } = req.body

  const messages = questions.flatMap((question: IQuestion) => [
    { role: "user", content: question.question },
    { role: "assistant", content: question.answer }
  ]);
  
  messages.push({ role: "user", content: "Create a set of 5 questions similar to these" })

  const chatGPT = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages.map((message: any) => ({
      role: message.role as 'system' | 'user' | 'assistant',
      content: message.content,
    }))
  })

  const chatGPTMessage = chatGPT.data.choices[0].message;

  res.status(200).json({ content: chatGPTMessage!.content });
}
