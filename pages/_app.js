import Head from 'next/head';
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import db from '../db.json';
import { useRouter } from 'next/router';

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;

    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;

    color: ${({theme}) => theme.colors.contrastText};
  }

  html, body {
    min-height: 100vh;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`

const theme = db.theme;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
          <title>Quiz de Astronomia</title>

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
        
          <meta name="description" content="Quiz sobre Astronomia" />

          <meta property="og:image" content="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80" key="ogimage" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://astronomia-quiz.ericeol.vercel.app/" />
          <meta property="og:title" content="Quiz sobre Astronomia" key="ogtitle" />
          <meta property="og:description" content="Perguntas e respostas para você se divertir e aprender" key="ogdesc" />
      </Head>

      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
