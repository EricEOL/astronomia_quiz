import db from '../../db.json';
import Widget from '../../src/components/Widget';
import QuizLogo from '../../src/components/QuizLogo';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import AlternativesForm from '../../src/components/AlternativesForm';
import Button from '../../src/components/Button';
import Loading from '../../src/components/Loading';
import { motion } from 'framer-motion';
import Link from '../../src/components/Link';

function LoadingWidget() {
  return (
    <Loading
      as={motion.section}
      transition={{ duration: 1.0 }}
      variants={{
        show: { scale: 1.2, rotate: 360 },
        hidden: { scale: 0, rotate: 0 }
      }}
      initial="hidden"
      animate="show"

    />
    /*     <Widget>
          <Widget.Header>
            Carregando...
                </Widget.Header>
          <Widget.Content>
            Preciso fazer o Loading aqui.
                </Widget.Content>
        </Widget> */
  )
}

function ResultWidget({ result, totalQuestions, name }) {

  return (
    <Widget>
      <Widget.Header>
        Resultado
            </Widget.Header>
      <Widget.Content>
        <p>
          {`Você acertou `}
          {result.reduce((currentSum, currentValue) => {

            const isAcerto = currentValue === true;
            if (isAcerto) {
              return currentSum + 1;
            }

            return currentSum;
          }, 0)}
          {` das ${totalQuestions} perguntas.`}
        </p>
        <ul>
          {result.map((questionResult, index) => (
            <li key={index}>
              {`#${index + 1}: ${questionResult === true ? 'Acertou' : 'Errou'}`}
            </li>
          ))}
        </ul>

        <Link href="/" onClick={() => {
          localStorage.setItem('ResultQuizAstronomy',

            result.reduce((currentSum, currentValue) => {

              const isAcerto = currentValue === true;
              if (isAcerto) {
                return currentSum + 1;
              }

              return currentSum;
            }, 0))

          localStorage.setItem('UserQuizAstronomy', name);
        }}>
          <Button>
            Retornar
            </Button>
        </Link>
        <p style={{textAlign: 'center'}}>Seu nome vai aparecer na tela inicial :)</p>
      </Widget.Content>
    </Widget>
  )
}

function QuestionWidget({ question, totalQuestions, questionIndex, onSubmit, addResult }) {

  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question_${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

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

        <AlternativesForm onSubmit={(event) => {
          event.preventDefault();
          setIsQuestionSubmited(true);

          addResult(isCorrect);

          setTimeout(() => {
            setIsQuestionSubmited(false);
            setSelectedAlternative(undefined);
            onSubmit();
          }, 1 * 1000);

        }}>
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative_${alternativeIndex}`;

            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;

            return (
              <Widget.Topic
                key={alternativeId}
                as="label"
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  id={alternativeId}
                  type="radio"
                  name={questionId}
                  style={{ display: 'none' }}
                  onChange={() => {
                    setSelectedAlternative(alternativeIndex);
                  }}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected}>Confirmar</Button>

          {isQuestionSubmited && isCorrect && <p>Você acertou</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou</p>}

        </AlternativesForm>

      </Widget.Content>
    </Widget>
  )
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage(props) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [result, setResult] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  console.log(props.name);

  function addResult(results) {
    setResult([...result, results]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000)
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < totalQuestions) {
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
            addResult={addResult}
          />
        }

        {screenState === screenStates.RESULT && <ResultWidget result={result} totalQuestions={totalQuestions} name={props.name}/>}

      </QuizContainer>
    </QuizBackground>
  )
}

export async function getServerSideProps(context) {

  return {
    props: {
      name: context.query.name,
    },
  };
}
