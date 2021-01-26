import Head from 'next/head';
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import db from '../db.json';

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
        
          <meta name="description" content="Quiz sobre Astronomia" />

          <meta property="og:image" content="https://i.ibb.co/W5qp6CG/site-image.jpg" key="ogimage" />
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
