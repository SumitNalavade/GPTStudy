import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useErrorBoundary } from "react-error-boundary";

import Navbar from "./navbar";

interface Props {
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  const { showBoundary } = useErrorBoundary();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        refetchOnWindowFocus: false,
      },
      mutations: {
        onError: (error) => showBoundary(error),
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col h-screen">
        <Navbar />

        <main className="container mx-auto px-4 flex-1">{children}</main>
      </div>
    </QueryClientProvider>
  );
};

export default Container;
