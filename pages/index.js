import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

import { useRouter } from 'next/router';

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

              <Input 
                onChange={function(event){
                  setName(event.target.value);
              }} 
                type="name" name="user_name" placeholder="Preencha com seu nome" value={name}
              />

              <Button type="submit" disabled={name.length === 0}>{`Jogar ${name}`}</Button>
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
