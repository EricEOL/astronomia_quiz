import styled from 'styled-components'
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

import { useRouter } from 'next/router';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {

  const router = useRouter()
  
  const [name, setName] = React.useState('');


  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Astronomia</h1>
          </Widget.Header>
          
          <Widget.Content>
            <form onSubmit={function(event){
              event.preventDefault();


              router.push(`/quiz?name=${name}`);

              console.log(name);
            }}>

              <input onChange={function(event){
                setName(event.target.value);
              }} 
              type="name" placeholder="Preencha com seu nome"
              />

              <button type="submit" disabled={name.length === 0}>Jogar {name}</button>
            </form>
          </Widget.Content>

        </Widget>

        <Widget>

          <Widget.Header>
              <h1>Quizes da Galera</h1>
          </Widget.Header>

          <Widget.Content>
            <p>ssssssssssssssssssssssssssssss</p>
          </Widget.Content>

        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/ericeol"/>
    </QuizBackground>
  )
}
