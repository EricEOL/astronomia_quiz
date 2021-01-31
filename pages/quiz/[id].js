import QuizScreen from '../../src/screens/Quiz';
import { ThemeProvider } from 'styled-components';

export default function QuizDaGaleraPage({dbExterno}) {
    return (
        <ThemeProvider theme={dbExterno.theme}>
            <QuizScreen externalQuestions={dbExterno.questions} externalBG={dbExterno.bg}/>
        </ThemeProvider>
    );
};

export async function getServerSideProps(context) {

    const [projectName, githubUser] = context.query.id.split('___');

    const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then(respostaDoServer => {
        if(respostaDoServer.ok) {
            return respostaDoServer.json()
        }
    })
    .then(respostaConvertidaEmObjeto => {
        return respostaConvertidaEmObjeto;
    })
    .catch(err => {
        console.log.error(err);
    })

    return {
        props: {
            dbExterno,
            //name: context.query.name
        },
    };
}