import { NextPage, GetServerSideProps } from "next";
import openai from "@/utils/gpt";

import { IQuestion } from "@/utils/interfaces";

interface Props {
  questions: IQuestion[];
}

const StudyPage: NextPage<Props> = ({ questions }) => {
  console.log(questions);

  return <h1>Hello World</h1>;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const apiResponse = `1. Find the volume of the solid obtained by rotating the region bounded by y = x^2, y = 0, x = 2, and x-axis, about the y-axis.
    2. Evaluate the integral ∫(1 to 4) 3x^2 dx.
    3. Find the equation of the tangent to the curve y = 3x^2 + 4x - 5 at x = 2.
    4. Find the area of the region bounded by the curves y = x^2 - 2x + 3 and y = 3x - 1.
    5. Find the average value of the function f(x) = x^2 + 5 on the interval [0, 3].`
    
    return {
        props: {
          questions: apiResponse.split("\n").map((q) => q.trim()),
        },
      };

//   const questionsArray = JSON.parse(query.data as string);

//   const messages = questionsArray.flatMap((question: IQuestion) => [
//     { role: "user", content: question.question },
//     { role: "assistant", content: question.answer }
//   ]);

//   messages.push({ role: "user", content: "Create a set of 5 questions similar to these" })

//   const chatGPT = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: messages.map((message: any) => ({
//       role: message.role as 'system' | 'user' | 'assistant',
//       content: message.content,
//     }))
//   })

//   const chatGPTMessage = chatGPT.data.choices[0].message;

//   console.log(chatGPTMessage?.content);


//   return {
//     props: {
//       questions: chatGPTMessage?.content,
//     },
//   };
};

export default StudyPage;
