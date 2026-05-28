# 🧠 Online Judge Platform

A full-stack Online Judge platform inspired by LeetCode and Codeforces that allows users to solve coding problems, run code securely, and get instant feedback with AI-powered assistance.

---

## 🚀 Live Demo
👉[ https://your-live-link.com ](https://onlinejudge-pearl.vercel.app/) 


---

## 📌 Features

### 👨‍💻 Problem Solving
- Browse and solve coding problems  
- View detailed problem descriptions, constraints, and examples  
- Multiple test case support  

### ⚡ Code Execution
- Run code with custom input  
- Submit solutions for evaluation  
- Handles:
  - Compilation Errors  
  - Runtime Errors  
  - Time Limit Exceeded (TLE)  

### 🐳 Secure Code Execution
- Code runs inside isolated Docker containers  
- Prevents unsafe execution  
- Supports multiple programming languages  

### 📊 Submissions System
- View all past submissions  
- Track verdicts (Accepted, Wrong Answer, TLE, Error)  
- View submitted code  

### 🤖 AI Integration
- Code explanation  
- Error fixing suggestions  
- Optimization hints  

### 🔐 Authentication
- User Signup & Login  
- JWT-based authentication  
- Protected routes  

### 🛠 Admin Features
- Add/Edit/Delete problems  
- Manage test cases (JSON upload/download)  
- Admin dashboard  

---

## 🛠 Tech Stack

### Frontend
- React  
- Tailwind CSS  
- React Router  

### Backend
- Node.js  
- Express.js  
- MongoDB  

### Code Execution
- Docker (isolated code runner container)  

### AI Integration
- Gemini API  

---

## 📂 Folder Structure

```
Online-Judge/
│
├── backend/
│ ├── src/
│ │ ├── config/ # Database & environment setup
│ │ ├── controllers/ # Business logic (auth, problems, submissions)
│ │ ├── middlewares/ # JWT auth middleware
│ │ ├── models/ # MongoDB schemas
│ │ ├── routes/ # API routes
│ │ ├── services/ # Code execution & AI logic
│ │ └── index.js # Entry point
│ │
│ ├── Dockerfile # Backend container config
│ └── package.json
│
├── coderunner/
│ ├── Dockerfile # Secure code execution container
│ └── scripts/ # Compile & run scripts
│
├── frontend/
│ ├── src/
│ │ ├── components/ # UI components
│ │ ├── pages/ # Pages (Problems, Editor, Submissions)
│ │ ├── context/ # State management
│ │ ├── utils/ # Helpers
│ │ ├── App.jsx
│ │ └── main.jsx
│ │
│ └── package.json
│
└── README.md
```

---

## ⚙️ How It Works

1. User logs in or signs up  
2. Selects a coding problem  
3. Writes code in the editor  
4. Clicks:
   - **Run** → executes with custom input  
   - **Submit** → evaluated against test cases  
5. Backend:
   - Sends code to Docker container  
   - Compiles and runs code securely  
   - Captures output/errors  
6. Returns:
   - Verdict (Accepted / Error / TLE)  
   - Output & execution details  
7. AI features provide:
   - Explanation  
   - Fix suggestions  
   - Optimization tips  

---

## 📦 Installation & Setup

### 🔹 Clone Repository
```bash
git clone https://github.com/your-username/online-judge.git
cd online-judge
```
Backend Setup
```
cd backend
npm install
Backend .env
PORT=5000
NODE_ENV=development

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
AI_API_KEY=your_gemini_api_key
```
Run Backend
npm run dev
🔹 Code Runner Setup (Docker)

Make sure Docker is installed and running.

cd coderunner
docker build -t coderunner .
🔹 Frontend Setup
cd frontend
npm install
npm start
Frontend .env
REACT_APP_BACKEND_URL=http://localhost:5000
