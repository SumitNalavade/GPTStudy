import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ErrorBoundary } from "react-error-boundary";

import ErrorComponent from "../components/errorScreen";
import app from "../utils/firebaseConfig";

import Container from "@/components/container";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    console.log(app);
  }, []);

  return (
    <ErrorBoundary key={router.pathname} fallback={<ErrorComponent />} onError={(error) => console.log(error)}>
        <Container>
          <Component {...pageProps} />
        </Container>
    </ErrorBoundary>
  );
}

/*
  TODO
  Fix Mobile Layout
  Fix Latex on flashcards
  Fix Profile Picture
  Add Discover Page
*/
