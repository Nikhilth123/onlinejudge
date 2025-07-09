# 🧑‍💻 Online Judge Platform

A modern Online Judge web application where users can solve coding problems, submit code, get instant feedback, and learn more effectively using AI tools like Hint, Code Explanation, Why Error, and Boilerplate generation. Built with secure Docker-based code execution and a complete admin panel.

---

## ✨ Features

### 👨‍💻 User Features
- Solve coding problems with detailed problem descriptions
- Submit code in **multiple programming languages** (C++, Python, Java, etc.)
- Get instant results using sample and hidden test cases
- View **submission history**:
  - Input, Output, Error
  - **Submitted code**
- 🔐 Register/Login with secure authentication

### 🤖 AI Assistant (Powered by Code LLaMA 7B Instruct via Ollama)
- **Ask for Hint** — provides a clue based on problem description
- **Explain Code** — gives line-by-line code explanation
- **Why Error** — explains compilation or runtime errors
- **Generate Boilerplate** — generates starter code for selected language

### 🔧 Admin Features
- Create, edit, and delete problems
- Upload test cases via `.json` file
- Download test cases for editing
- Manually add/edit test cases via UI
- Set time and memory limits per problem
- Enable support for multiple languages

### 🧱 Tech Stack
- **Frontend**: React, Tailwind CSS, Fetch API (No Axios)
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT Authentication
- **Execution**: Docker for secure and isolated code execution
- **AI Integration**: Ollama running **Code LLaMA 7B Instruct**

---

