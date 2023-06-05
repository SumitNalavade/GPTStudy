import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

import app from "../utils/firebaseConfig";

import Container from "@/components/container";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log(app);
  }, []);

  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  );
}

/*
  TODO: Paginate questions and study sets, fix mobile layout
*/