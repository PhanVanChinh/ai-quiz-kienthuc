# 🎮 AI Quiz — Đố Vui Thông Minh

Ứng dụng quiz giải trí với AI tự sinh câu hỏi theo chủ đề bạn chọn.
Stack: **React (Vite)** + **Node.js (Express)** + **gemini AI**

---



## 🚀 Cài đặt & Chạy

### 1. Backend

```bash
cd backend
npm install

# Tạo file .env
cp .env.example .env
npm run dev   # 
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev   # 
```
---

## 🔑 Lấy  API Key

1. Vào https://aistudio.com
2. Đăng ký / đăng nhập
3. API Keys → Create Key
4. Dán vào `backend/.env`

---

## ✨ Tính năng

| Tính năng | Mô tả |
|-----------|-------|
| 🎯 AI sinh câu hỏi | Claude tạo 6 câu hỏi theo chủ đề + độ khó |
| 💬 AI nhận xét | Bình luận vui sau mỗi câu trả lời |
| 📖 Giải thích | Giải thích đáp án + fun fact |
| 🏆 Kết quả AI | AI "roast" hoặc khen tùy điểm số |
| 🎨 Dark UI | Thiết kế retro-futuristic tối |
| 📱 Responsive | Hoạt động trên cả mobile |

---

## 🛠 API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/quiz/generate` | Tạo câu hỏi quiz |
| POST | `/api/quiz/comment` | AI nhận xét sau câu trả lời |
| POST | `/api/quiz/result` | AI nhận xét kết quả cuối |
| GET  | `/api/health` | Kiểm tra server |

---


