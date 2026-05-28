# Online Judge Platform

A full-stack Online Judge platform inspired by LeetCode and Codeforces that supports secure Dockerized code execution, problem solving, AI-assisted coding help, submission tracking, and admin-based problem management.

The project is built using:

* React + Vite frontend
* Main Express backend
* Separate Dockerized compiler backend
* MongoDB database
* Gemini AI integration

---

# Features

## User Features

* User Authentication & Authorization
* Solve Coding Problems
* Online Code Editor
* Run Code with Custom Input
* Submit Code
* View Submission History
* AI-Based Coding Assistance
* Responsive UI

---

## Admin Features

* Add Problems
* Edit Problems
* Delete Problems
* Upload Test Cases using JSON
* Manage Problem Metadata

---

## Judge Features

* Dockerized Code Execution
* Separate Compiler Backend
* Compilation Error Handling
* Runtime Error Detection
* Time Limit Exceeded (TLE)
* Automated Test Case Validation
* Multi-language Execution Support

---

# Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* Context API
* React Router DOM

## Main Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication
* Cloudinary

## Compiler Backend

* Node.js
* Docker
* Child Processes
* Isolated Sandboxed Execution

## AI Integration

* Gemini API

---

# System Architecture

```text id="g74c1v"
                    +----------------------+
                    |      Frontend        |
                    |   React + Vite       |
                    +----------------------+
                               |
                               v
                    +----------------------+
                    |     Main Backend     |
                    | Express + MongoDB    |
                    +----------------------+
                               |
         +---------------------------------------------+
         |                                             |
         v                                             v
+----------------------+                 +---------------------------+
| MongoDB Database     |                 |    Compiler Backend      |
| Users, Problems,     |                 | Dockerized Code Runner   |
| Submissions          |                 +---------------------------+
+----------------------+                               |
                                                        v
                                            +----------------------+
                                            |   Docker Container   |
                                            | Compile & Execute    |
                                            +----------------------+
```

---

# Project Structure

```bash id="f2vv7d"
onlinejudge/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── Context/
│   │   ├── Layouts/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── Controller/
│   ├── Middlewares/
│   ├── Model/
│   ├── Routes/
│   ├── Utils/
│   ├── app.js
│   ├── Connection.js
│   └── cronecleaner.js
│
├── compilerbackend/
│   ├── codes/
│   ├── controllers/
│   ├── executors/
│   ├── formaterrors/
│   ├── inputs/
│   ├── outputs/
│   ├── routes/
│   ├── Dockerfile
│   ├── generateFile.js
│   ├── generateinputfile.js
│   ├── index.js
│   └── cronecleaner.js
│
└── README.md
```

---

# Backend Architecture

The platform uses two separate backend services.

---

# 1. Main Backend

Handles:

* Authentication
* User Management
* Problem Management
* Submission Storage
* AI Features
* Cloudinary Uploads

Folder Responsibilities:

| Folder      | Purpose                             |
| ----------- | ----------------------------------- |
| Controller  | Business logic                      |
| Routes      | API endpoints                       |
| Model       | MongoDB schemas                     |
| Middlewares | Authentication & request middleware |
| Utils       | Helper functions                    |

---

# 2. Compiler Backend

Dedicated backend for secure code execution.

Responsibilities:

* Code compilation
* Code execution
* Runtime handling
* Verdict generation
* File generation
* Dockerized sandboxing

Important folders:

| Folder       | Purpose                |
| ------------ | ---------------------- |
| executors    | Language executors     |
| controllers  | Execution logic        |
| routes       | Execution APIs         |
| codes        | Generated source files |
| inputs       | Input test cases       |
| outputs      | Execution outputs      |
| formaterrors | Error formatting       |

---

# Code Execution Workflow

1. User writes code in editor
2. Frontend sends request to Main Backend
3. Main Backend forwards execution request to Compiler Backend
4. Compiler Backend generates source/input files
5. Docker container compiles and executes code
6. Output is compared with expected output
7. Verdict returned to frontend

---

# AI Features

Integrated AI support using Gemini API for:

* Code Explanation
* Error Fixing
* Optimization Suggestions
* Problem Hints

---

# Authentication

JWT-based authentication system with:

* Login
* Signup
* Protected Routes
* Admin Authorization

---

# Supported Verdicts

* Accepted
* Wrong Answer
* Compilation Error
* Runtime Error
* Time Limit Exceeded

---

# Installation

## Clone Repository

```bash id="ozd8kx"
git clone https://github.com/Nikhilth123/onlinejudge.git
cd onlinejudge
```

---

# Frontend Setup

```bash id="zsl0h8"
cd frontend
npm install
npm run dev
```

---

# Main Backend Setup

```bash id="sdxjlwm"
cd backend
npm install
npm start
```

---

# Compiler Backend Setup

Make sure Docker Desktop is installed and running.

```bash id="jq4k77"
cd compilerbackend
npm install
docker build -t compilerbackend .
npm start
```

---

# Environment Variables

## Backend `.env`

```env id="wv1yjp"
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GEMINI_API_KEY=your_gemini_api_key
```

---

# Security Features

* Dockerized isolated execution
* Separate compiler backend
* JWT authentication
* Protected admin APIs
* Temporary file cleanup
* Sandboxed execution environment

---

# Current Limitations

* CI/CD pipeline not implemented yet
* Contest system not implemented
* Limited language support
* No distributed execution currently

---

# Future Improvements

* Contest System
* Real-Time Collaboration
* Leaderboards
* WebSocket-Based Live Verdicts
* Plagiarism Detection
* Kubernetes Deployment
* Multi-language Expansion
* Distributed Judge Workers

---

# Learning Outcomes

This project helped in understanding:

* MERN Stack Architecture
* Dockerized Code Execution
* Microservice-like Backend Separation
* Secure Sandboxed Execution
* JWT Authentication
* Cloudinary Integration
* AI Integration
* System Design Concepts
* Backend Communication

---

---


---

# Author

Nikhil Thakur

GitHub:
https://github.com/Nikhilth123
