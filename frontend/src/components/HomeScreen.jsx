import { useState } from 'react'

const TOPICS = [
  { label: '🌍 Địa lý', value: 'địa lý thế giới' },
  { label: '🧬 Khoa học', value: 'khoa học tự nhiên' },
  { label: '🎬 Phim & TV', value: 'phim ảnh và truyền hình' },
  { label: '⚽ Thể thao', value: 'thể thao' },
  { label: '🍜 Ẩm thực', value: 'ẩm thực Việt Nam và thế giới' },
  { label: '💻 Công nghệ', value: 'công nghệ và lập trình' },
  { label: '🎵 Âm nhạc', value: 'âm nhạc' },
  { label: '📚 Lịch sử', value: 'lịch sử Việt Nam' },
]

const DIFFICULTIES = [
  { value: 'easy', label: 'Dễ', desc: 'Câu hỏi cơ bản', color: '#6ff7b8' },
  { value: 'medium', label: 'Vừa', desc: 'Thách thức vừa', color: '#f7c66f' },
  { value: 'hard', label: 'Khó', desc: 'Dành cho cao thủ', color: '#f76f6f' },
]

export default function HomeScreen({ onStart, error }) {
  const [topic, setTopic] = useState('')
  const [custom, setCustom] = useState('')
  const [diff, setDiff] = useState('medium')

  const finalTopic = topic === 'custom' ? custom : topic

  function handleStart() {
    if (!finalTopic.trim()) return
    onStart(finalTopic.trim(), diff)
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.hero} className="fade-up">
        <div style={styles.badge}>✦ Powered by Claude AI</div>
        <h1 style={styles.title}>AI Quiz</h1>
        <p style={styles.subtitle}>Câu hỏi do AI tạo ra — mỗi lần chơi một khác</p>
      </div>

      <div style={styles.card} className="fade-up">
        <h2 style={styles.sectionLabel}>Chọn chủ đề</h2>
        <div style={styles.topicGrid}>
          {TOPICS.map(t => (
            <button
              key={t.value}
              style={{ ...styles.topicBtn, ...(topic === t.value ? styles.topicActive : {}) }}
              onClick={() => setTopic(t.value)}
            >
              {t.label}
            </button>
          ))}
          <button
            style={{ ...styles.topicBtn, ...(topic === 'custom' ? styles.topicActive : {}), gridColumn: 'span 2' }}
            onClick={() => setTopic('custom')}
          >
            ✏️ Tự nhập chủ đề
          </button>
        </div>

        {topic === 'custom' && (
          <input
            style={styles.input}
            placeholder="Nhập chủ đề bạn muốn... (vd: Anime, Marvel, Toán học)"
            value={custom}
            onChange={e => setCustom(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleStart()}
            autoFocus
          />
        )}

        <h2 style={{ ...styles.sectionLabel, marginTop: '1.5rem' }}>Độ khó</h2>
        <div style={styles.diffRow}>
          {DIFFICULTIES.map(d => (
            <button
              key={d.value}
              style={{
                ...styles.diffBtn,
                ...(diff === d.value ? { borderColor: d.color, background: d.color + '18', color: d.color } : {})
              }}
              onClick={() => setDiff(d.value)}
            >
              <span style={styles.diffLabel}>{d.label}</span>
              <span style={styles.diffDesc}>{d.desc}</span>
            </button>
          ))}
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <button
          style={{
            ...styles.startBtn,
            opacity: finalTopic.trim() ? 1 : 0.4,
            cursor: finalTopic.trim() ? 'pointer' : 'not-allowed'
          }}
          onClick={handleStart}
          disabled={!finalTopic.trim()}
        >
          Bắt đầu Quiz →
        </button>
      </div>

      <p style={styles.hint}>6 câu hỏi · AI nhận xét từng câu · Kết quả cuối bởi AI</p>
    </div>
  )
}

const styles = {
  wrap: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', gap: '1.5rem' },
  hero: { textAlign: 'center' },
  badge: { display: 'inline-block', fontSize: '11px', letterSpacing: '0.1em', padding: '4px 14px', border: '1px solid rgba(124,111,247,0.4)', borderRadius: '20px', color: 'var(--accent)', marginBottom: '1rem', textTransform: 'uppercase' },
  title: { fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', lineHeight: 1 },
  subtitle: { fontSize: '1rem', color: 'var(--text2)', marginTop: '0.75rem' },
  card: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', padding: '2rem', width: '100%', maxWidth: '560px', animationDelay: '0.1s' },
  sectionLabel: { fontFamily: 'var(--font-display)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: '0.75rem' },
  topicGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' },
  topicBtn: { background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '10px', padding: '10px 4px', fontSize: '12px', color: 'var(--text2)', cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'var(--font-body)' },
  topicActive: { borderColor: 'var(--accent)', color: 'var(--accent)', background: 'rgba(124,111,247,0.12)' },
  input: { width: '100%', marginTop: '0.75rem', background: 'var(--surface2)', border: '1px solid var(--accent)', borderRadius: '10px', padding: '12px 16px', color: 'var(--text)', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none' },
  diffRow: { display: 'flex', gap: '10px' },
  diffBtn: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px 8px', cursor: 'pointer', transition: 'all 0.15s', color: 'var(--text2)', fontFamily: 'var(--font-body)' },
  diffLabel: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px' },
  diffDesc: { fontSize: '11px' },
  startBtn: { width: '100%', marginTop: '1.5rem', background: 'var(--accent)', border: 'none', borderRadius: '12px', padding: '16px', fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: '#fff', cursor: 'pointer', letterSpacing: '0.02em', transition: 'transform 0.15s, opacity 0.15s' },
  error: { marginTop: '1rem', padding: '10px 14px', background: 'rgba(247,111,111,0.12)', border: '1px solid rgba(247,111,111,0.3)', borderRadius: '8px', color: '#f76f6f', fontSize: '13px' },
  hint: { fontSize: '12px', color: 'var(--text2)', opacity: 0.7 }
}
