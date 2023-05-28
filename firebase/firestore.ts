import { collection, addDoc } from "firebase/firestore";

import { db } from "../src/utils/firebaseConfig";
import { IQuestion } from "@/utils/interfaces";

export const saveStudySet = async (
  questions: IQuestion[],
  user: string,
  title: string,
  course: string
) => {
  const docRef = await addDoc(collection(db, "studySets"), {
    questions,
    title,
    course,
    user,
  });
};
