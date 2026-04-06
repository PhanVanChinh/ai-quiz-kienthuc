require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {
  GoogleGenAI
} = require("@google/genai");

const app = express();
const PORT = process.env.PORT || 3001;

// Gemini config
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Middleware
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());


// --- Generate Quiz Questions ---
app.post('/api/quiz/generate', async (req, res) => {
  const {
    topic,
    difficulty = 'medium',
    count = 5
  } = req.body;

  if (!topic) return res.status(400).json({
    error: 'Topic is required'
  });

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Tạo ${count} câu hỏi quiz vui về chủ đề "${topic}".
Độ khó: ${difficulty}.

Trả về JSON:
{
  "questions": [
    {
      "id": 1,
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "answer": "A",
      "explanation": "...",
      "fun_fact": "..."
    }
  ],
  "topic": "${topic}",
  "difficulty": "${difficulty}"
}`
    });

    const cleanText = response.text.replace(/```json|```/g, "");
    const json = JSON.parse(cleanText);

    res.json(json);

  } catch (err) {
    console.error('Generate error:', err);
    res.status(500).json({
      error: 'Không thể tạo câu hỏi (Gemini lỗi hoặc hết quota).'
    });
  }
});


// --- AI Comment ---
app.post('/api/quiz/comment', async (req, res) => {
  const {
    question,
    isCorrect
  } = req.body;

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Bạn là MC quiz vui tính.
Người chơi ${isCorrect ? 'trả lời ĐÚNG' : 'trả lời SAI'} câu: "${question}"

Viết 1 câu bình luận ngắn, vui vẻ.`
    });

    res.json({
      comment: response.text.trim()
    });

  } catch (err) {
    res.json({
      comment: isCorrect ? 'Xuất sắc! 🎉' : 'Cố lên nhé!'
    });
  }
});


// --- Final Result ---
app.post('/api/quiz/result', async (req, res) => {
  const {
    score,
    total,
    topic
  } = req.body;
  const percent = Math.round((score / total) * 100);

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Người chơi hoàn thành quiz "${topic}" với ${score}/${total} (${percent}%).

Viết nhận xét hài hước ngắn gọn.`
    });

    res.json({
      result: response.text.trim(),
      percent
    });

  } catch (err) {
    res.json({
      result: `Bạn đạt ${score}/${total} điểm. Không tệ!`,
      percent
    });
  }
});


// --- Health check ---
app.get('/api/health', (req, res) =>
  res.json({
    status: 'ok',
    message: 'AI Quiz Backend running!'
  })
);


// --- Start server ---
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});