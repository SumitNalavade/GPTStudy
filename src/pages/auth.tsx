import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const SignInPage: NextPage = () => {
  const auth = getAuth();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  const handleChangeButtonClicked = () => {
    setIsLogin(!isLogin);
  }

  const handleSignUpButtonClicked = async () => {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => console.log(error));

    userCredentials ? router.push("/create") : "";
  };

  const handleLoginButtonClicked = async () => {
    const userCredentials  = await signInWithEmailAndPassword(auth, email, password).catch((error) => console.log(error));

    userCredentials ? router.push("/create") : "";
  }

  return (
    <>
      <div className="w-1/2 m-auto mt-12">
        <p className="font-bold text-3xl m-auto my-6">{isLogin ? "Log In To" : "Sign Up For"} GPTStudy</p>
        <input
          className="w-full border-b border-gray-300 bg-transparent py-2 px-4 focus:outline-none focus:border-blue-500 my-6"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />

        <input
          className="w-full border-b border-gray-300 bg-transparent py-2 px-4 focus:outline-none focus:border-blue-500 my-6"
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
