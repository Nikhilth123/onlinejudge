# Online Judge Platform

A full-stack Online Judge platform inspired by coding platforms like LeetCode and Codeforces.
The platform supports secure Dockerized code execution, coding problem management, AI-powered coding assistance, real-time verdict evaluation, and submission tracking.

---

# Features

## User Features

* User Authentication & Authorization
* Solve Coding Problems
* Online Code Editor
* Run Code with Custom Input
* Submit Solutions
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
* Isolated Compiler Backend
* Multiple Language Support
* Compilation Error Handling
* Runtime Error Detection
* Time Limit Exceeded (TLE) Detection
* Automated Test Case Evaluation

---

# Tech Stack

## Frontend

* React
* TypeScript
* Tailwind CSS
* React Router DOM
* Context API

## Main Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication

## Compiler Backend

* Node.js
* Docker
* Sandboxed Code Execution

## AI Integration

* Gemini API

---

# System Architecture

```text
                    +------------------+
                    |    Frontend      |
                    | React + TS       |
                    +------------------+
                              |
                              v
                    +------------------+
                    | Main Backend API |
                    | Express + Mongo  |
                    +------------------+
                              |
         +----------------------------------------+
         |                                        |
         v                                        v
+-------------------+               +----------------------+
| MongoDB Database  |               | Compiler Backend     |
| Users, Problems,  |               | Dockerized Execution |
| Submissions       |               +----------------------+
+-------------------+                           |
                                                 v
                                      +------------------+
                                      | Docker Container |
                                      | Compile & Run    |
                                      +------------------+
```

---

# Project Structure

```bash
onlinejudge/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   └── routes/
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── services/
│   ├── config/
│   └── utils/
│
├── compilerbackend/
│   ├── Dockerfile
│   ├── executors/
│   ├── temp/
│   ├── helpers/
│   └── scripts/
│
└── README.md
```

---

# Architecture Overview

The project is divided into two separate backend services.

## 1. Main Backend

Responsible for:

* Authentication
* Problem Management
* Submission Management
* User Management
* AI Feature APIs

---

## 2. Compiler Backend

Responsible for:

* Code Compilation
* Secure Execution
* Verdict Generation
* Handling Runtime Errors
* Time Limit Handling

The compiler backend is isolated using Docker containers for security and sandboxing.

---

# Code Execution Workflow

1. User writes code in editor
2. Frontend sends request to Main Backend
3. Main Backend forwards execution request to Compiler Backend
4. Compiler Backend creates execution environment
5. Docker container compiles and executes code
6. Output is checked against test cases
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

The platform uses JWT-based authentication.

Features:

* Login
* Signup
* Protected Routes
* Role-Based Authorization

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

```bash
git clone https://github.com/Nikhilth123/onlinejudge.git
cd onlinejudge
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Main Backend Setup

```bash
cd backend
npm install
npm start
```

---

# Compiler Backend Setup

Make sure Docker is installed and running.

```bash
cd compilerbackend
npm install
docker build -t compilerbackend .
npm start
```

---

# Environment Variables

## Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
GEMINI_API_KEY=your_gemini_api_key
```

---

# Security Features

* Dockerized isolated code execution
* JWT Authentication
* Protected admin routes
* Temporary file cleanup
* Separate compiler backend service

---

# Current Limitations

* CI/CD pipeline not implemented yet
* Contest system not implemented
* Limited language support currently

---

# Future Improvements

* Contest System
* Real-Time Collaboration
* WebSocket-Based Live Verdicts
* Leaderboards
* Plagiarism Detection
* Multi-Language Expansion
* CI/CD Automation
* Kubernetes Deployment

---

# Learning Outcomes

This project helped in understanding:

* MERN Stack Development
* Dockerized Code Execution
* Backend Service Separation
* Secure Sandboxed Execution
* JWT Authentication
* AI Integration
* System Design Concepts
* API Communication Between Services

---



---


---

# Author

Nikhil Thakur

GitHub:
https://github.com/Nikhilth123
