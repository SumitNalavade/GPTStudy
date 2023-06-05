import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import app from "../utils/firebaseConfig";

import Container from "@/components/container";

const queryClient  = new QueryClient({ defaultOptions: {
  queries: {
    staleTime: Infinity,
    refetchOnWindowFocus: false
  }
}});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log(app);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Component {...pageProps} />
      </Container>
    </QueryClientProvider>
  );
}

/*
  TODO: Fix mobile layout, implement RQ on auth page, paginate study page
*/