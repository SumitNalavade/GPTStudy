import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { FirebaseError } from "firebase/app";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const SignInPage: NextPage = () => {
  const auth = getAuth();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<undefined | string>();

  const handleEmailChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  const handleChangeButtonClicked = () => {
    setErrorMessage(undefined);
    setIsLogin(!isLogin);
  }

  const handleSignUpButtonClicked = async () => {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).catch(handleError);

    userCredentials ? router.push("/create") : "";
  };

  const handleLoginButtonClicked = async () => {
    const userCredentials  = await signInWithEmailAndPassword(auth, email, password).catch(handleError)

    userCredentials ? router.push("/create") : "";
  }

  const handleError = (error: FirebaseError) => {
    const code = error.code;

    switch (code) {
      case "auth/email-already-in-use":
        setErrorMessage("An account with this email already exists");
        break;
    
      case "auth/invalid-email":
        setErrorMessage("Invalid username or password")
        break;

      case "auth/wrong-password":
        setErrorMessage("Invalid username or password")
        break;

      default:
        setErrorMessage("An error occured, please try again later")
        break;
    }
  }

  return (
    <>
      <div className="w-1/2 m-auto mt-12">
        <p className="font-bold text-3xl m-auto my-6">{isLogin ? "Log In To" : "Sign Up For"} GPTStudy</p>

        <p className="font-semibold text-md m-auto mb-6 text-red-500">{errorMessage}</p>

        <input
          className={`w-full border-b bg-transparent py-2 px-4 focus:outline-none ${ errorMessage ? "border-red-500" : "" } focus:border-blue-500 my-6`}
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />

        <input
          className={`w-full border-b border-gray-300 bg-transparent py-2 px-4 ${ errorMessage ? "border-red-500" : "" } focus:outline-none focus:border-blue-500 my-6`}
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />

        <button
          className="flex items-center justify-center my-6 w-full"
          onClick={isLogin ? handleLoginButtonClicked : handleSignUpButtonClicked}
        >
          <div className="w-4/5 h-16 rounded-lg p-6 flex justify-center items-center bg-blue-500 text-white">
            <h2 className="font-medium">{isLogin ? "Log In" : "Sign Up"}</h2>
          </div>
        </button>

        <button
          className="flex items-center justify-center my-6 w-full"
          onClick={handleChangeButtonClicked}
        >
          <div className="w-4/5 h-12 rounded-lg p-6 flex justify-center items-center bg-gray-100">
            <h2 className="font-medium">{isLogin ? "Create Account" : "Sign In"}</h2>
          </div>
        </button>
      </div>
    </>
  );
};

export default SignInPage;
