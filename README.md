AI-BLOG

AI-BLOG is a full-stack AI-powered blogging platform built using React, Node.js, TypeScript, PostgreSQL (Supabase), and Groq AI.
It supports role-based access control, custom JWT authentication, and a fully responsive UI, deployed on Vercel.

🚀 Features
🧠 AI-Powered Blog Generation

AI content generation using Groq SDK
Powered by LLaMA-3.3-70B-Versatile
Fast, scalable, and cost-efficient AI inference

👥 Role-Based Access Control (RBAC)

Admin – full access (users, blogs, roles)
User – read , create & comment on blogs

Protected backend routes using role validation

🔐 Custom Authentication (JWT)

Own authentication system (no third-party auth)

JWT-based access & refresh tokens
Secure password hashing
Role-aware authorization middleware

📱 Fully Responsive Design

Mobile-first responsive UI
Works seamlessly on desktop, tablet, and mobile
Clean and modern UI/UX

🧩 Full-Stack Architecture

Strong separation between frontend & backend
Type-safe backend using TypeScript
Scalable REST API design

🛠 Tech Stack
Frontend

React
TypeScript
Tailwind 
Axios 

Backend

Node.js
Express.js
TypeScript
JWT Authentication
Role-based middleware

Database

PostgreSQL
Supabase (Database & hosting)

AI Integration

Groq SDK
LLaMA-3.3-70B-Versatile model

Deployment

Vercel (Frontend & API)
Supabase (PostgreSQL database)

🧠 AI Integration (Groq)

The app uses Groq’s LLaMA model for generating blog content.

AI Model Used

llama-3.3-70b-versatile

📦 Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/krish-maurya/AI-BLOG.git
cd AI-BLOG

2️⃣ Install Dependencies
# frontend
cd client
npm install

# backend
cd ../server
npm install

🔐 Environment Variables

Create a .env file inside the server folder:

PORT=5000
DATABASE_URL=your_supabase_postgres_url
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key

▶️ Run Locally
Backend
npm run dev

Frontend
npm run dev

📁 Project Structure
AI-BLOG/
│
├── client/            # React frontend
├── server/            # Node + Express backend
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   └── index.ts
│
├── README.md
└── .env

🛡️ Security Practices

JWT-based authentication
Role-based route protection
Secure password hashing
Environment variable protection
Backend validation & error handling

🌐 Deployment

Frontend & API: Vercel
Database: Supabase (PostgreSQL)
CI/CD handled automatically by Vercel

🤝 Contribution

Contributions, issues, and feature requests are welcome!
Feel free to fork the repo and submit a PR.

📄 License

MIT License © 2026
Built with ❤️ by Krish Maurya
