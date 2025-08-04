
# 🧠 Online Judge Platform

A full-stack **Online Judge system** built using the MERN stack, Docker, and role-based access control.  
This platform enables users to solve coding problems, run and submit code, and get AI-powered help.  
Admins can manage problems, test cases, and promote users.

---

## 📁 Project Structure

\`\`\`
onlinejudge/
├── frontend/          # Vite + React + React Router-based UI
├── backend/           # Authentication, problems, submissions, users
└── compiler-backend/  # Code execution and AI help (uses Docker)
\`\`\`

---

## 🚀 Features

### 👨‍💻 User Features

- View and solve coding problems  
- Run code and view output  
- Submit code and get verdicts  
- View previous submissions  
- Manage profile

### 🛠️ Admin Features

- Add new problems  
- Edit/delete existing problems  
- Add test cases manually  
- Upload/download test cases as JSON  
- Promote any user to admin

---

## ⚙️ Getting Started

### 🔙 Backend Setup

\`\`\`bash
cd backend
npm install
cp .env.example .env  # Fill in MongoDB URI, JWT secret, etc.
npm start
\`\`\`

### 🐳 Compiler Backend Setup

> ✅ Requires Docker installed and running

\`\`\`bash
cd compiler-backend
cp .env.example .env  # Fill in required env variables
npm install
npm start
\`\`\`

- Uses \`child_process\` for secure code execution in Docker  
- Handles AI features like hints, explanations, and fixes

### 💻 Frontend Setup

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

- Built using **Vite**, **React**, and **React Router**

---

## 💾 Database

- Requires **MongoDB** (local or remote)  
- Used for storing users, problems, test cases, and submissions

---

## 🔐 Role-Based Access Control

| Role   | Permissions                                                                 |
|--------|------------------------------------------------------------------------------|
| User   | Run code, submit code, view submissions, and manage profile                 |
| Admin  | All user actions + add/edit/delete problems, manage test cases, promote users |

---

## 🧪 Test Case Management (Admin Only)

- Add test cases manually in the editor  
- Download test cases as a \`.json\` file  
- Upload \`.json\` to replace test cases

---

## 🤖 AI Integration (Compiler Backend)

The compiler backend also supports AI functionality for:
- Generating **hints**
- **Explaining** submitted code
- **Fixing** errors in code

---

## 🧰 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, React Router  
- **Backend**: Node.js, Express, MongoDB, JWT  
- **Compiler Backend**: Node.js, Docker, \`child_process\`  
- **AI Integration**: Gemini API (or any LLM)

---

## 📎 License

This project is licensed under the **MIT License**.

---

## ✨ Author

Developed by [Nikhil Thakur](https://github.com/Nikhilth123)
