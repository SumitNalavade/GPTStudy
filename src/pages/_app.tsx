import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { initializeApp } from "firebase/app";
import firebaseConfig from '../utils/firebaseConfig';

import Container from "@/components/container"

export default function App({ Component, pageProps }: AppProps) {

  initializeApp(firebaseConfig);

  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  )
}
