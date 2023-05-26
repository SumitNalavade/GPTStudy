import { NextPage } from "next";
import { useRouter } from "next/router";

import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";

const UserPage: NextPage = () => {
    const auth = getAuth();
    const router = useRouter();
    
    const handleSignOut = async () => {
        await signOut(auth);
        
        router.push("/");
    }

    return (
        <button onClick={handleSignOut}>Sign Out</button>
    )
}

export default UserPage;