export default function QuizScreen({ questions, current, score, selected, answered, comment, loadingComment, onAnswer, onNext }) {
  const q = questions[current]
  const progress = ((current) / questions.length) * 100

  function getOptionStyle(opt) {
    const base = styles.option
    const letter = opt.charAt(0)
    if (!answered) return { ...base, ...styles.optionIdle }
    if (letter === q.answer) return { ...base, ...styles.optionCorrect }
    if (opt === selected && letter !== q.answer) return { ...base, ...styles.optionWrong }
    return { ...base, ...styles.optionDimmed }
  }

  return (
    <div style={styles.wrap}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }} />
        </div>
        <div style={styles.meta}>
          <span style={styles.metaItem}>Câu {current + 1} / {questions.length}</span>
          <span style={styles.metaItem}>⭐ {score} điểm</span>
        </div>
      </div>

      {/* Question card */}
      <div style={styles.questionCard} className="fade-up" key={current}>
        <div style={styles.qNumber}>Q{String(current + 1).padStart(2, '0')}</div>
        <p style={styles.question}>{q.question}</p>
      </div>

      {/* Options */}
      <div style={styles.options} className="fade-up">
        {q.options.map((opt, i) => (
          <button
            key={i}
            style={getOptionStyle(opt)}
            onClick={() => onAnswer(opt)}
            disabled={answered}
          >
            <span style={styles.optLetter}>{opt.charAt(0)}</span>
            <span style={styles.optText}>{opt.slice(3)}</span>
          </button>
        ))}
      </div>

      {/* After answer */}
      {answered && (
        <div style={styles.feedbackBlock} className="pop">
          {/* Explanation */}
          <div style={styles.explanation}>
            <span style={styles.expLabel}>📖 Giải thích</span>
            <p style={styles.expText}>{q.explanation}</p>
            {q.fun_fact && (
              <p style={styles.funFact}>✨ {q.fun_fact}</p>
            )}
          </div>

          {/* AI Comment */}
          <div style={styles.aiComment}>
            <span style={styles.aiLabel}>🤖 AI nói:</span>
            {loadingComment
              ? <span style={styles.loading}>Đang suy nghĩ<span style={styles.dots}>...</span></span>
              : <p style={styles.commentText}>{comment}</p>
            }
          </div>

          <button style={styles.nextBtn} onClick={onNext}>
            {current + 1 >= questions.length ? 'Xem kết quả 🏆' : 'Câu tiếp theo →'}
          </button>
        </div>
      )}
    </div>
  )
}

const styles = {
  wrap: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem 1rem 3rem', gap: '1.25rem', maxWidth: '600px', margin: '0 auto' },
  header: { width: '100%' },
  progressBar: { height: '4px', background: 'var(--surface2)', borderRadius: '2px', overflow: 'hidden', marginBottom: '10px' },
  progressFill: { height: '100%', background: 'linear-gradient(90deg, var(--accent), var(--accent2))', borderRadius: '2px', transition: 'width 0.4s ease' },
  meta: { display: 'flex', justifyContent: 'space-between' },
  metaItem: { fontSize: '13px', color: 'var(--text2)', fontFamily: 'var(--font-display)', fontWeight: 600 },
  questionCard: { width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', padding: '2rem', minHeight: '120px' },
  qNumber: { fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '0.75rem', opacity: 0.8 },
  question: { fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', fontWeight: 600, color: 'var(--text)', lineHeight: 1.5 },
  options: { width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', animationDelay: '0.05s' },
  option: { width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '12px', border: '1px solid', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', fontFamily: 'var(--font-body)' },
  optionIdle: { background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' },
  optionCorrect: { background: 'rgba(111,247,184,0.12)', borderColor: 'var(--correct)', color: 'var(--correct)' },
  optionWrong: { background: 'rgba(247,111,111,0.12)', borderColor: 'var(--wrong)', color: 'var(--wrong)' },
  optionDimmed: { background: 'transparent', borderColor: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.25)', cursor: 'default' },
  optLetter: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', minWidth: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.06)', borderRadius: '6px' },
  optText: { fontSize: '14px', lineHeight: 1.4 },
  feedbackBlock: { width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' },
  explanation: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.25rem' },
  expLabel: { fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, display: 'block', marginBottom: '6px' },
  expText: { fontSize: '13px', color: 'var(--text2)', lineHeight: 1.7 },
  funFact: { fontSize: '12px', color: 'var(--accent2)', marginTop: '8px', lineHeight: 1.6 },
  aiComment: { background: 'rgba(124,111,247,0.08)', border: '1px solid rgba(124,111,247,0.2)', borderRadius: '16px', padding: '1rem 1.25rem' },
  aiLabel: { fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, display: 'block', marginBottom: '6px' },
  commentText: { fontSize: '14px', color: 'var(--text)', lineHeight: 1.6, fontStyle: 'italic' },
  loading: { fontSize: '13px', color: 'var(--text2)', animation: 'pulse 1.5s infinite' },
  dots: { animation: 'pulse 1s infinite' },
  nextBtn: { width: '100%', background: 'var(--accent)', border: 'none', borderRadius: '12px', padding: '15px', fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: '#fff', cursor: 'pointer', letterSpacing: '0.02em' },
}
