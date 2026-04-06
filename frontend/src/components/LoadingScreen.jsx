export default function LoadingScreen({ message = 'AI đang tạo câu hỏi...' }) {
  return (
    <div style={styles.wrap}>
      <div style={styles.inner}>
        <div style={styles.spinner} />
        <p style={styles.text}>{message}</p>
        <p style={styles.sub}>Claude đang suy nghĩ cho bạn 🧠</p>
      </div>
    </div>
  )
}

const styles = {
  wrap: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  inner: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' },
  spinner: {
    width: '48px', height: '48px',
    border: '3px solid rgba(124,111,247,0.2)',
    borderTop: '3px solid var(--accent)',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite'
  },
  text: { fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)' },
  sub: { fontSize: '13px', color: 'var(--text2)' }
}
