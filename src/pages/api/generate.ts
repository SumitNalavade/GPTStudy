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
            "Create a similar but unique question without the answer to this without LaTeX",
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

  // await delay(5000);
  // return res.status(200).json({
  //   questions: [
  //     {
  //       question: "Question: What is the capital city of France?",
  //       answer: "The capital city of France is Paris.",
  //     },
  //     {
  //       question: "Question: What is the capital of California?",
  //       answer: "Sacramento",
  //     },
  //     {
  //       question: "What is the atomic number of the element that has 16 neutrons and 16 electrons in its atom?",
  //       answer: "The atomic number of an element is equal to the number of protons in its nucleus, and it determines the identity of the element. To find the atomic number of the element described, we need to use the fact that the number of electrons in a neutral atom is equal to the number of protons in its nucleus. Therefore, if the element has 16 electrons, it must have 16 protons. The number of neutrons in an atom can be calculated by subtracting the atomic number from the mass number. The mass number is the sum of the number of protons and neutrons in the nucleus. In this case, we are given that the atom has 16 neutrons, so we can set up the following equation: mass number = atomic number + number of neutrons mass number = 16 + 16 mass number = 32 Therefore, the element has an atomic number of 16 (which is also the number of protons) and a mass number of 32. Based on the periodic table of elements, we can determine that this is the element sulfur (S)."
  //     }
  //   ],
  // });

  const { questionsArray, numQuestions } = req.body;

  const initialQuestions = modifyInitialQuestionsArray(questionsArray, numQuestions)
  const questions = await createQuestions(initialQuestions);
  const answers = await createAnswers(questions);

  const combinedArray = questions.map((question, index) => {
    return {
      question,
      answer: answers[index]!,
    };
  });

  res.status(200).json({ questions: combinedArray });
}
