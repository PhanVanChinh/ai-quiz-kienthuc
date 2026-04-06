import { useState, useCallback } from 'react'

const API = '/api'

export function useQuiz() {
  const [phase, setPhase]         = useState('home')   // home | loading | playing | result
  const [questions, setQuestions] = useState([])
  const [current, setCurrent]     = useState(0)
  const [score, setScore]         = useState(0)
  const [selected, setSelected]   = useState(null)
  const [answered, setAnswered]   = useState(false)
  const [comment, setComment]     = useState('')
  const [resultText, setResultText] = useState('')
  const [resultPercent, setResultPercent] = useState(0)
  const [error, setError]         = useState('')
  const [topic, setTopic]         = useState('')
  const [difficulty, setDifficulty] = useState('medium')
  const [loadingComment, setLoadingComment] = useState(false)

  const startQuiz = useCallback(async (t, d) => {
    setError('')
    setPhase('loading')
    setTopic(t)
    setDifficulty(d)
    try {
      const res = await fetch(`${API}/quiz/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: t, difficulty: d, count: 6 })
      })
      if (!res.ok) throw new Error('Server error')
      const data = await res.json()
      if (!data.questions?.length) throw new Error('No questions returned')
      setQuestions(data.questions)
      setCurrent(0)
      setScore(0)
      setSelected(null)
      setAnswered(false)
      setComment('')
      setPhase('playing')
    } catch (e) {
      setError(e.message || 'Không kết nối được server. Hãy chắc chắn backend đang chạy!')
      setPhase('home')
    }
  }, [])

  const submitAnswer = useCallback(async (option) => {
    if (answered) return
    const q = questions[current]
    const letter = option.charAt(0)
    const isCorrect = letter === q.answer
    const newScore = isCorrect ? score + 1 : score

    setSelected(option)
    setAnswered(true)
    if (isCorrect) setScore(newScore)

    // Get AI comment
    setLoadingComment(true)
    try {
      const res = await fetch(`${API}/quiz/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q.question,
          userAnswer: option,
          correctAnswer: q.options.find(o => o.startsWith(q.answer)),
          isCorrect,
          score: newScore,
          totalQuestions: questions.length
        })
      })
      const data = await res.json()
      setComment(data.comment)
    } catch {
      setComment(isCorrect ? 'Chính xác! 🎉' : 'Tiếc quá!')
    } finally {
      setLoadingComment(false)
    }
  }, [answered, questions, current, score])

  const nextQuestion = useCallback(() => {
    if (current + 1 >= questions.length) {
      finishQuiz()
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
      setAnswered(false)
      setComment('')
    }
  }, [current, questions.length])

  const finishQuiz = useCallback(async () => {
    setPhase('loading')
    try {
      const res = await fetch(`${API}/quiz/result`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score, total: questions.length, topic })
      })
      const data = await res.json()
      setResultText(data.result)
      setResultPercent(data.percent)
    } catch {
      setResultText(`Bạn đạt ${score}/${questions.length} điểm!`)
      setResultPercent(Math.round((score / questions.length) * 100))
    }
    setPhase('result')
  }, [score, questions.length, topic])

  const restart = useCallback(() => {
    setPhase('home')
    setQuestions([])
    setScore(0)
    setError('')
  }, [])

  return {
    phase, questions, current, score, selected, answered,
    comment, resultText, resultPercent, error, topic, difficulty,
    loadingComment,
    startQuiz, submitAnswer, nextQuestion, restart
  }
}
