import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const SignInPage: NextPage = () => {
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState<undefined | string>();

  const loginFormSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(1, "Password is required"),
  });

  type LoginFormData = z.infer<typeof loginFormSchema>;

  const {
    register: registerLogin,
    handleSubmit: handleLogin,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginFormSchema) });

  const signUpFormSchema = z
    .object({
      email: z.string().email("Invalid Email"),
      password: z.string().min(1, "Password is required"),
      confirmPassword: z.string().min(1),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });

  type SignUpFormData = z.infer<typeof signUpFormSchema>;

  const {
    register: registerSignUp,
    handleSubmit: handleSignUp,
    formState: { errors: signUpErrors },
  } = useForm<SignUpFormData>({ resolver: zodResolver(signUpFormSchema) });

  const handleChangeButtonClicked = () => {
    setErrorMessage(undefined);
    setIsLogin(!isLogin);
  };

  const signInWithGoogleMutation = useMutation(["handleGoogleAuth"], async () => {
    const userCredentials = await signInWithPopup(auth, googleProvider);

    return userCredentials
  }, {
    onSuccess: (userCredentials) => {
      userCredentials ? router.push("/create") : ""
    }
  });

  const createUserMutation = useMutation(
    ["createUser"],
    async (data: SignUpFormData) => {
      const { email, password } = data;

      const userCredentials = await createUserWithEmailAndPassword(auth, email, password).catch(handleError);

      return userCredentials;
    },
    {
      onSuccess: (userCredentials) => {
        userCredentials ? router.push("/create") : "";
      },
    }
  );

  const loginUserMutation = useMutation(
    ["loginUser"],
    async (data: LoginFormData) => {
      const { email, password } = data;

      const userCredentials = await signInWithEmailAndPassword(auth, email, password).catch(handleError);

      return userCredentials;
    },
    {
      onSuccess: (userCredentials) => {
        userCredentials ? router.push("/create") : "";
      },
    }
  );

  const handleError = (error: FirebaseError) => {
    const code = error.code;

    switch (code) {
      case "auth/email-already-in-use":
        setErrorMessage("An account with this email already exists");
        break;

      case "auth/invalid-email":
        setErrorMessage("Invalid username or password");
        break;

      case "auth/wrong-password":
        setErrorMessage("Invalid username or password");
        break;

      case "auth/user-not-found":
        setErrorMessage("Invalid username or password");
        break;

      default:
        setErrorMessage("An error occured, please try again later");
        break;
    }
  };

  return (
    <>
      <div className="max-w-3xl m-auto mt-12">
        <p className="font-bold text-3xl m-auto my-12 text-center">{isLogin ? "Log In To" : "Sign Up For"} GPTStudy</p>

        <p className="font-semibold text-md m-auto mb-6 text-red-500">{errorMessage}</p>

        <button
          className="w-full m-auto my-12 justify-center px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
          onClick={() => signInWithGoogleMutation.mutate()}
        >
          <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
          <span>Login with Google</span>
        </button>

        <div>
          <input
            className={`w-full border-b bg-transparent py-2 px-4 focus:outline-none ${errorMessage ? "border-red-500" : ""} focus:border-blue-500 my-4`}
            type="email"
            placeholder="Email"
            {...(isLogin ? registerLogin("email") : registerSignUp("email"))}
          />
          {loginErrors.email && <span className="text-red-500">{loginErrors.email.message}</span>}
          {signUpErrors.email && <span className="text-red-500">{signUpErrors.email.message}</span>}

          <input
            className={`w-full border-b border-gray-300 bg-transparent py-2 px-4 ${errorMessage ? "border-red-500" : ""} focus:outline-none focus:border-blue-500 my-4`}
            type="password"
            placeholder="Password"
            {...(isLogin ? registerLogin("password") : registerSignUp("password"))}
          />
          {loginErrors.password && <span className="text-red-500">{loginErrors.password.message}</span>}
          {signUpErrors.password && <span className="text-red-500">{signUpErrors.password.message}</span>}

          <div className={`${isLogin ? "hidden" : ""}`}>
            <input
              className={`w-full border-b border-gray-300 bg-transparent py-2 px-4 $ ${errorMessage ? "border-red-500" : ""} focus:outline-none focus:border-blue-500 my-4`}
              type="password"
              placeholder="Confirm Password"
              {...(isLogin ? {} : registerSignUp("confirmPassword"))}
            />
            {signUpErrors.confirmPassword && <span className="text-red-500">{signUpErrors.confirmPassword.message}</span>}
          </div>

          <button
            className={`flex items-center justify-center my-6 w-full disabled:opacity-50`}
            disabled={loginUserMutation.isLoading || createUserMutation.isLoading}
            onClick={isLogin ? handleLogin((loginData) => loginUserMutation.mutate(loginData)) : handleSignUp((signUpData) => createUserMutation.mutate(signUpData))}
          >
            <div className="w-4/5 h-16 rounded-lg p-6 flex justify-center items-center bg-blue-500 text-white">
              <h2 className="font-medium">{isLogin ? "Log In" : "Sign Up"}</h2>
            </div>
          </button>
        </div>

        <button className="flex items-center justify-center my-6 w-full" onClick={handleChangeButtonClicked}>
          <div className="w-4/5 h-12 rounded-lg p-6 flex justify-center items-center bg-gray-100">
            <h2 className="font-medium">{isLogin ? "Create Account" : "Sign In"}</h2>
          </div>
        </button>
      </div>
    </>
  );
};

export default SignInPage;
