import db from '../db.json';
import Widget from '../src/components/Widget';
import Link from '../src/components/Link';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function Home() {

  const router = useRouter()

  const [name, setName] = React.useState('');

  const [lastResultUser, setLastResultUser] = React.useState('');

  React.useEffect(()=>{
    setLastResultUser(localStorage.getItem('ResultQuizAstronomy'));
  }, []);

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          variants={{
            show: { opacity: 1, y: '0'},
            hidden: { opacity: 0, y: '100%' }
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>Astronomia</h1>
          </Widget.Header>

          <Widget.Content>
            <form onSubmit={function (event) {
              event.preventDefault();


              router.push(`/quiz?name=${name}`);

              console.log(name);
            }}>

              <Input
                onChange={function (event) {
                  setName(event.target.value);
                }}
                type="name" name="user_name" placeholder="Preencha com seu nome" value={name}
              />

              <Button type="submit" disabled={name.length === 0}>{`Jogar ${name}`}</Button>
            </form>

            <Widget.Topic style={{ marginTop: '15px' }}>
              {`Acertos do último jogador:  ${lastResultUser}`}
            </Widget.Topic>
          
          </Widget.Content>

        </Widget>

        <Widget
          as={motion.section}
          transition={{duration: 1.0}}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 }
          }}
          initial="hidden"
          animate="show"
        >

          <Widget.Header>
            <h1>Quizes da Galera</h1>
          </Widget.Header>

          <Widget.Content>
            <ul>
              {db.external.map((link) => {

                const [projectName, githubUser] = link.replace('https://', '').replace('.vercel.app', '').split('.');

                return (
                  <li key={projectName}><Widget.Topic as={Link} href={`/quiz/${projectName}___${githubUser}`}>{`${githubUser}/${projectName}`}</Widget.Topic></li>
                )
              })}
            </ul>
          </Widget.Content>

        </Widget>
        <Footer
          as={motion.section}
          transition={{duration: 2.0}}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 }
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/ericeol" />
    </QuizBackground>
  )
}
