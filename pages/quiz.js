import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
            </Widget.Header>
      <Widget.Content>
        Preciso fazer o Loading aqui.
            </Widget.Content>
    </Widget>
  )
}

function QuestionWidget({ question, totalQuestions, questionIndex, onSubmit }) {

  const questionId = `question_${questionIndex}`;

  return (
    <Widget>
      <Widget.Header>
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>

      <img
        alt="Descricao"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover'
        }}
        src={question.image}
      />

      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <form onSubmit={(event)=>{
          event.preventDefault();
          
          onSubmit();
        }}>
          {question.alternatives.map((alternative, index) => {
            const alternativeId = `alternative_${index}`;
            return (
              <Widget.Topic as="label" htmlFor={alternativeId}>
                <input
                  id={alternativeId}
                  type="radio"
                  name={questionId}
                  style={{ display: 'none' }}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit">Confirmar</Button>
        </form>
      </Widget.Content>
    </Widget>
  )
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  React.useEffect(()=>{
    setTimeout(()=>{
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000)
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = currentQuestion + 1;

    if(nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.QUIZ &&
          <QuestionWidget
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            onSubmit={handleSubmitQuiz}
          />
        }

        {screenState === screenStates.RESULT && <div>Você acertou X questões, parabéns!</div>}

      </QuizContainer>
    </QuizBackground>
  )
}
