import React from 'react'
import Widget from '../../components/Widget'
import QuizContainer from '../../components/QuizContainer'
import QuizLogo from '../../components/QuizLogo'
import QuizBackground from '../../components/QuizBackground'
import Button from '../../components/Button'
import AlternativesForm from '../../components/AlternativesForm'
import BackLinkArrow from '../../components/BackLinkArrow'

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  )
}

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {results.reduce((sum, result) => {
            const isRight = result === true
            if (isRight) {
              return sum + 1
            }
            return sum
          }, 0)}
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              {`#${index + 1} Resultado: ${result === true ? 'Acertou' : 'Errou'}`}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  )
}

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult,
}) {
  const questionId = `question__${questionIndex}`
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined)
  const isCorrect = selectedAlternative === question.answer
  const [isQuestionsSubmited, setIsQuestionSubmited] = React.useState(false)
  const hasAlternativeSelected = selectedAlternative !== undefined
  const altertiveStatus = isCorrect ? 'SUCCESS' : 'ERROR'

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />

      <Widget.Content>
        <h2>{question.title}</h2>

        <p>{question.description}</p>

        <AlternativesForm onSubmit={(e) => {
          e.preventDefault()
          setIsQuestionSubmited(true)

          setTimeout(() => {
            addResult(isCorrect)
            onSubmit()
            setIsQuestionSubmited(false)
            setSelectedAlternative(undefined)
          }, 3 * 1000)
        }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`
            const isSelected = selectedAlternative === alternativeIndex

            return (
              <Widget.Topic
                htmlFor={alternativeId}
                as="label"
                key={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionsSubmited && altertiveStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  type="radio"
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                />
                {alternative}
              </Widget.Topic>
            )
          })}

          <Button
            type="submit"
            disabled={!hasAlternativeSelected}
          >
            Confirmar
          </Button>

          {isQuestionsSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionsSubmited && !isCorrect && <p>Você errou!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  )
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
}

export default function QuizPage({ externalQuestions, externalBg }) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING)
  const totalQuestions = externalQuestions.length
  const [currentQuestion, setCurrentQuestion] = React.useState(0)
  const questionIndex = currentQuestion
  const question = externalQuestions[questionIndex]
  const [results, setResults] = React.useState([])

  function addResult(result) {
    setResults([
      ...results,
      result,
    ])
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 1 * 1000)
  }, [])

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(questionIndex + 1)
    } else {
      setScreenState(screenStates.RESULT)
    }
  }

  return (
    <QuizBackground backgroundImage={externalBg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  )
}
