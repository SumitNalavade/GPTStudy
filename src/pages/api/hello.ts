import type { NextApiRequest, NextApiResponse } from "next";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAIAPIKEY,
});

const openai = new OpenAIApi(configuration);

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  let messages = [
    { role: "user", content: "what is the least abundant element on earth" }
  ]

  const chatGPT = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages.map((message) => ({
      role: message.role as 'system' | 'user' | 'assistant',
      content: message.content,
    }))
  })

  const chatGPTMessage = chatGPT.data.choices[0].message;

  console.log(chatGPTMessage);
  
  res.status(200).json({ name: process.env.OPENAIAPIKEY as string });
}
