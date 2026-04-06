import { useQuiz } from './hooks/useQuiz'
import HomeScreen   from './components/HomeScreen'
import QuizScreen   from './components/QuizScreen'
import ResultScreen from './components/ResultScreen'
import LoadingScreen from './components/LoadingScreen'

export default function App() {
  const quiz = useQuiz()

  if (quiz.phase === 'loading') return <LoadingScreen />

  if (quiz.phase === 'home') return (
    <HomeScreen
      onStart={quiz.startQuiz}
      error={quiz.error}
    />
  )

  if (quiz.phase === 'playing') return (
    <QuizScreen
      questions={quiz.questions}
      current={quiz.current}
      score={quiz.score}
      selected={quiz.selected}
      answered={quiz.answered}
      comment={quiz.comment}
      loadingComment={quiz.loadingComment}
      onAnswer={quiz.submitAnswer}
      onNext={quiz.nextQuestion}
    />
  )

  if (quiz.phase === 'result') return (
    <ResultScreen
      score={quiz.score}
      total={quiz.questions.length}
      percent={quiz.resultPercent}
      resultText={quiz.resultText}
      topic={quiz.topic}
      onRestart={quiz.restart}
    />
  )

  return null
}
