//import db from '../../../db.json';

import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import AlternativesForm from '../../components/AlternativesForm';
import Button from '../../components/Button';
import BackLinkArrow from '../../components/BackLinkArrow';

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

function ResultWidget({result, totalQuestions}) {
  return (
    <Widget>
      <Widget.Header>
        Resultado
            </Widget.Header>
      <Widget.Content>
        <p>
          {`Você acertou `} 
          {result.reduce((currentSum, currentValue)=> {
          
            const isAcerto = currentValue === true;
            if(isAcerto) {
              return currentSum + 1;          
            }

            return currentSum;
          }, 0)} 
          {` das ${totalQuestions} perguntas.`}
        </p>
        <ul>
        {result.map((questionResult, index)=>(
            <li key={index}>
              {`#${index + 1}: ${questionResult === true ? 'Acertou' : 'Errou'}`} 
            </li>
        ))}
       </ul>
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
          <BackLinkArrow href="/" />
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

          setTimeout(()=>{
            setIsQuestionSubmited(false);
            setSelectedAlternative(undefined);
            onSubmit();
          }, 1* 1000);

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

export default function QuizPage({ externalQuestions, externalBG }) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [result, setResult] = React.useState([]);
  const totalQuestions = externalQuestions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];

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
    <QuizBackground backgroundImage={externalBG}>
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

        {screenState === screenStates.RESULT && <ResultWidget result={result} totalQuestions={totalQuestions}  />}

      </QuizContainer>
    </QuizBackground>
  )
}