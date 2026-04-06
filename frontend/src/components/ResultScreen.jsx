export default function ResultScreen({ score, total, percent, resultText, topic, onRestart }) {
  const emoji = percent >= 80 ? '🏆' : percent >= 50 ? '😊' : '😅'
  const color = percent >= 80 ? 'var(--correct)' : percent >= 50 ? 'var(--accent2)' : 'var(--wrong)'

  return (
    <div style={styles.wrap}>
      <div style={styles.card} className="pop">
        <div style={styles.emojiBig}>{emoji}</div>

        <div style={{ ...styles.percentRing, borderColor: color }}>
          <span style={{ ...styles.percentNum, color }}>{percent}%</span>
          <span style={styles.percentLabel}>chính xác</span>
        </div>

        <h2 style={styles.scoreText}>
          {score} <span style={styles.scoreTotal}>/ {total}</span> câu đúng
        </h2>

        <p style={styles.topicLabel}>Chủ đề: {topic}</p>

        <div style={styles.aiBox}>
          <span style={styles.aiLabel}>🤖 AI nhận xét:</span>
          <p style={styles.aiText}>{resultText}</p>
        </div>

        {/* Score bar */}
        <div style={styles.barWrap}>
          <div style={styles.barTrack}>
            <div style={{ ...styles.barFill, width: `${percent}%`, background: color }} />
          </div>
        </div>

        <div style={styles.actions}>
          <button style={styles.restartBtn} onClick={onRestart}>
            Chơi lại
          </button>
          <button style={styles.shareBtn} onClick={() => {
            if (navigator.share) {
              navigator.share({ title: 'AI Quiz', text: `Tôi đạt ${percent}% trong quiz về ${topic}! Bạn có thể làm tốt hơn không?` })
            }
          }}>
            Chia sẻ 📤
          </button>
        </div>
      </div>

      {/* Stars decoration */}
      <div style={styles.stars} aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} style={{ ...styles.star, animationDelay: `${i * 0.15}s`, left: `${10 + i * 14}%` }}>✦</span>
        ))}
      </div>
    </div>
  )
}

const styles = {
  wrap: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', position: 'relative' },
  card: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '2.5rem 2rem', maxWidth: '480px', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' },
  emojiBig: { fontSize: '3.5rem', lineHeight: 1 },
  percentRing: { width: '120px', height: '120px', borderRadius: '50%', border: '4px solid', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', transition: 'border-color 0.5s' },
  percentNum: { fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, lineHeight: 1 },
  percentLabel: { fontSize: '11px', color: 'var(--text2)', letterSpacing: '0.06em' },
  scoreText: { fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)' },
  scoreTotal: { color: 'var(--text2)', fontWeight: 400 },
  topicLabel: { fontSize: '12px', color: 'var(--text2)', background: 'var(--surface2)', padding: '4px 14px', borderRadius: '20px', border: '1px solid var(--border)' },
  aiBox: { background: 'rgba(124,111,247,0.08)', border: '1px solid rgba(124,111,247,0.2)', borderRadius: '16px', padding: '1.25rem', textAlign: 'left', width: '100%' },
  aiLabel: { fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, display: 'block', marginBottom: '8px' },
  aiText: { fontSize: '14px', color: 'var(--text)', lineHeight: 1.7, fontStyle: 'italic' },
  barWrap: { width: '100%' },
  barTrack: { height: '6px', background: 'var(--surface2)', borderRadius: '3px', overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: '3px', transition: 'width 0.8s ease' },
  actions: { display: 'flex', gap: '12px', width: '100%' },
  restartBtn: { flex: 1, background: 'var(--accent)', border: 'none', borderRadius: '12px', padding: '14px', fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: '#fff', cursor: 'pointer' },
  shareBtn: { flex: 1, background: 'transparent', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px', fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 600, color: 'var(--text2)', cursor: 'pointer' },
  stars: { position: 'absolute', bottom: '2rem', width: '100%', display: 'flex', justifyContent: 'space-around', pointerEvents: 'none' },
  star: { position: 'absolute', bottom: 0, color: 'var(--accent)', opacity: 0.3, fontSize: '1.2rem', animation: 'fadeUp 0.5s ease forwards' },
}
