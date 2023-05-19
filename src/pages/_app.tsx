import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import Container from "@/components/container"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  )
}
