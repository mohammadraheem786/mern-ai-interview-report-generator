# 🤖 AI Interview Report Generator

> An AI-powered full stack SaaS application that analyzes your resume against a job description and generates a personalized interview readiness report using RAG + LLM.

🔗 **Live Demo:** [mern-ai-interview-report-generator.vercel.app](https://mern-ai-interview-report-generator.vercel.app)

---

## 📸 Features

- 📄 **Resume Upload** — Upload your resume as a PDF
- 🔍 **Skill Extraction** — Automatically extracts skills from resume and job description
- 📊 **Skill Gap Analysis** — Identifies matched and missing skills
- 🧠 **RAG Pipeline** — Retrieves relevant context from a vector database (ChromaDB)
- 🤖 **AI Report Generation** — Generates structured interview readiness report using Gemini LLM
- 📈 **Readiness Score** — Calculates your interview readiness percentage
- 💪 **Strengths & Weaknesses** — AI-identified strengths and areas to improve
- ❓ **Interview Questions** — Personalized technical and behavioral questions
- 🗺️ **Learning Roadmap** — Suggested learning path for missing skills
- 📥 **PDF Download** — Download your full report as a PDF
- 📚 **Report History** — View and manage all your past reports
- 🔐 **Authentication** — Secure JWT-based auth system

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=JSON%20web%20tokens)

### AI / ML
![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=flat&logo=google&logoColor=white)
![ChromaDB](https://img.shields.io/badge/ChromaDB-FF6B35?style=flat)

### DevOps & Deployment
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-131415?style=flat&logo=railway&logoColor=white)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-4EA94B?style=flat&logo=mongodb&logoColor=white)

---

## 🏗️ Architecture

```
User
 │
 ▼
Frontend (Vercel)
 │  React + Tailwind + Vite
 │
 ▼
Backend (Render)
 │  Node.js + Express + JWT Auth
 │
 ├──► MongoDB Atlas (User data + Reports)
 │
 ├──► ChromaDB on Railway (Vector Store)
 │         │
 │         └── RAG Context Retrieval
 │
 └──► Google Gemini API (LLM)
           │
           └── AI Report Generation
```

---

## 🔄 How It Works

```
1. User uploads resume PDF + job description
        ↓
2. PDF parsed → text extracted
        ↓
3. Skills extracted from resume & job description
        ↓
4. Skill gap analysis → matched & missing skills
        ↓
5. RAG queries built → ChromaDB retrieves relevant context
        ↓
6. Prompt built → Gemini LLM generates structured report
        ↓
7. Report saved to MongoDB
        ↓
8. Frontend renders personalized interview report
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Google Gemini API key
- ChromaDB instance (local Docker or Railway)

### Clone the repo

```bash
git clone https://github.com/mohammadraheem786/mern-ai-interview-report-generator.git
cd mern-ai-interview-report-generator
```

### Backend Setup

```bash
cd Backend
npm install
```

Create `.env` file:
```env
MONGOURI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
CHROMA_AUTH_TOKEN=your_chroma_token
FRONTEND_URL=http://localhost:5173
PORT=5000
```

Start ChromaDB locally:
```bash
docker run -p 8000:8000 chromadb/chroma
```

Ingest data into ChromaDB:
```bash
node src/rag/ingest.js
```

Start backend:
```bash
npm run dev
```

### Frontend Setup

```bash
cd Frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000
```

Start frontend:
```bash
npm run dev
```

---

## 📁 Project Structure

```
├── Backend/
│   ├── src/
│   │   ├── controller/        # Route controllers
│   │   ├── models/            # MongoDB models
│   │   ├── routes/            # Express routes
│   │   ├── middleware/        # Auth middleware
│   │   ├── rag/               # RAG pipeline (ChromaDB)
│   │   ├── prompts/           # LLM prompt builder
│   │   ├── services/          # LLM service (Gemini)
│   │   ├── utils/             # Skill extraction & gap analysis
│   │   ├── parser/            # PDF parser
│   │   └── data/              # RAG dataset
│   └── server.js
│
└── Frontend/
    └── src/
        ├── features/
        │   ├── ai/            # Interview analysis feature
        │   │   ├── components/
        │   │   ├── pages/
        │   │   ├── hooks/
        │   │   └── services/
        │   └── auth/          # Authentication feature
        │       ├── components/
        │       ├── pages/
        │       └── services/
        ├── components/        # Shared components (Navbar)
        └── utils/             # Utility functions
```

---

## 🌐 Deployment

| Service | Platform | Purpose |
|---------|----------|---------|
| Frontend | Vercel | React app hosting |
| Backend | Render | Node.js API server |
| Vector DB | Railway | ChromaDB hosting |
| Database | MongoDB Atlas | User data & reports |

---

## 🤝 Connect

Built by **Mohammad Raheem**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/mohammadraheem786)
