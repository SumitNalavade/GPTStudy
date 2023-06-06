import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>GPT Study</title>
        <meta property="og:title" content="GPT Study" key="title" />
        <meta property="og:description" content="Generate study material with the GPT AI" key="description" />
        <meta property="og:image" content="/home.png" key="description" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
