import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import { collection, query, where, getDocs, doc, deleteDoc, orderBy, limit, QueryDocumentSnapshot, DocumentData, startAt } from "firebase/firestore";
import { FaTrash } from "react-icons/fa";

import { IStudySet } from "@/utils/interfaces";
import { db } from "@/utils/firebaseConfig";
import withAuthProtection from "@/components/withAuthProtection";

const UserPage: NextPage = () => {
  const router = useRouter();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [studySets, setStudySets] = useState<IStudySet[]>();
  const [lastVisibleStudySet, setlastVisibleStudySet] = useState<QueryDocumentSnapshot<DocumentData> | undefined>();
  const [preventPagination, setPreventPagination] = useState(false);

  const getStudySets = async (initial?: QueryDocumentSnapshot<DocumentData>) => {
    let q = query(collection(db, "studySets"), where("user", "==", currentUser!.uid), orderBy("dateAccessed", "desc"), limit(10));

    if (initial) {
      q = query(collection(db, "studySets"), where("user", "==", currentUser!.uid), orderBy("dateAccessed", "desc"), startAt(initial), limit(10));
    }

    const querySnapshot = await getDocs(q);

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    setlastVisibleStudySet(lastVisible);

    const docData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as unknown as IStudySet[];

    return docData;
  };

  const deleteStudySet = async (studySetId: string) => {
    await deleteDoc(doc(db, "studySets", studySetId)).then(() => setStudySets(studySets?.filter((elm) => elm.id != studySetId)));
  };

  const navigateToStudyPage = (studySet: IStudySet) => {
    router.push({
      pathname: "/study",
      query: { studySet: JSON.stringify(studySet) },
    });
  };

  const { isFetching, error, data, refetch } = useQuery(["initialStudySets"], async () => {
    const newStudySets = await getStudySets(lastVisibleStudySet);

    studySets ? setStudySets([...studySets!, ...newStudySets]) : setStudySets(newStudySets);

    if (newStudySets.length < 10) setPreventPagination(true);
  });

  return (
    <div className="mt-12 w-4/5 m-auto">
      <div className="flex items-center">
        <img src="https://lh3.googleusercontent.com/a/AGNmyxbuvwz-kj0Bo-90Cxj6JY5ciui_l8aHZTLpy7E=s96-c?sz=150" alt="" className="w-16 h-16 rounded-full" />

        <div className="mx-4 flex justify-between w-full">
          <div>
            <p className="text-2xl font-semibold">{currentUser!.displayName}</p>
            <p>{currentUser!.email}</p>
          </div>

          <button className="bg-red-400 text-white rounded-lg px-6 py-2 hover:bg-red-500" onClick={() => signOut(auth)}>
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
                deleteStudySet(studySet.id);
              }}
            />
          </button>
        ))}

        {isFetching && (
          <div className="min-h-screen ">
            <div className="mx-auto p-4">
              <div className="rounded p-6">
                <div className="animate-pulse">
                  {Array.from({ length: 10 }, (_, index) => (
                    <div key={index} className="h-4 bg-gray-300 rounded mb-2"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <button className="my-4 bg-gray-100 rounded-lg p-6 w-full text-lg font-semibold disabled:text-gray-300" onClick={() => refetch()} disabled={preventPagination}>
          More
        </button>
      </div>
    </div>
  );
};

export default withAuthProtection(UserPage);
