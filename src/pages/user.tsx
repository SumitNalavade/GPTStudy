import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  orderBy
} from "firebase/firestore";
import { FaTrash } from "react-icons/fa";

import { IStudySet } from "@/utils/interfaces";
import { db } from "@/utils/firebaseConfig";
import withAuthProtection from "@/components/withAuthProtection";

const UserPage: NextPage = () => {
    const router = useRouter();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [studySets, setStudySets] = useState<IStudySet[]>();

  const getStudySets = async () => {
    const q = query(
      collection(db, "studySets"),
      where("user", "==", currentUser!.uid),
      orderBy("dateAccessed", "desc")
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as unknown as IStudySet[];
  };

  const deleteStudySet = async (studySetId: string) => {
    await deleteDoc(doc(db, "studySets", studySetId)).then(() => setStudySets(studySets?.filter((elm) => elm.id != studySetId)))
  };

  const navigateToStudyPage = (studySet: IStudySet) => {
    router.push({ pathname: "/study", query: { studySet: JSON.stringify(studySet) } })
  }

  useEffect(() => {
    getStudySets().then((res) => setStudySets(res))
  }, []);

  return (
    <div className="mt-12 w-4/5 m-auto">
      <div className="flex items-center">
        <img
          src="https://lh3.googleusercontent.com/a/AGNmyxbuvwz-kj0Bo-90Cxj6JY5ciui_l8aHZTLpy7E=s96-c?sz=150"
          alt=""
          className="w-16 h-16 rounded-full"
        />

        <div className="mx-4 flex justify-between w-full">
          <div>
            <p className="text-2xl font-semibold">{currentUser!.displayName}</p>
            <p>{currentUser!.email}</p>
          </div>

          <button
            className="bg-red-400 text-white rounded-lg px-6 py-2 hover:bg-red-500"
            onClick={() => signOut(auth)}
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="my-12">
        <h1 className="text-3xl font-bold mb-6">Study Sets</h1>

        {studySets?.map((studySet, index) => (
          <button className="my-4 bg-gray-100 rounded-lg p-6 flex justify-between items-center w-full" onClick={() => navigateToStudyPage(studySet)}>
            <div>
              <p className="text-lg font-semibold">
                {studySet.title} | {studySet.course}{" "}
              </p>
              <p className="text-start">{studySet.questions.length} terms</p>
            </div>

            <FaTrash
              size={"20"}
              color="red"
              onClick={(evt) => {
                evt.stopPropagation();
                deleteStudySet(studySet.id)
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default withAuthProtection(UserPage);
