# 📄 ResumeForge

A full-stack resume builder built with **Angular 17** on the frontend and **Node.js / Express / MySQL** on the backend, secured with **JWT authentication**.

Users can sign up, log in, choose a resume template, fill in their details, and see a live preview as they type.

---

## 🚀 Live Demo

| | Link |
|---|---|
| 🌐 **Live App** | [https://resumeforge-1-p0pl.onrender.com](https://resumeforge-1-p0pl.onrender.com) |
| 🔌 **Backend API** | [https://resumeforge-e3ot.onrender.com/api/health](https://resumeforge-e3ot.onrender.com/api/health) |
| 💻 **Source Code** | [github.com/LateshDev/ResumeForge](https://github.com/LateshDev/ResumeForge) |

> ⚠️ **Note:** The backend runs on Render's free tier, which spins down after periods of inactivity. The **first request may take 30–50 seconds** to respond while the server wakes up — this is normal, not a bug. Subsequent requests will be fast.

**Try it out:**
1. Open the live app link above
2. Click **Sign Up** and create an account
3. Pick a template and start building your resume — changes appear in the live preview instantly

---

## 🛠️ Tech Stack

**Frontend**
- Angular 17 (standalone routing, reactive forms with `FormArray`)
- HTTP interceptor for JWT attachment
- Route guards for protected pages

**Backend**
- Node.js + Express REST API
- JWT-based authentication (bcrypt password hashing)
- MySQL with a JSON column for flexible resume content

**Deployment**
- Frontend & Backend: [Render](https://render.com) (Static Site + Web Service)
- Database: [Aiven](https://aiven.io) (managed MySQL, SSL-enforced)
- Source control: GitHub

---

## 📁 Project Structure

```
ResumeForge/
├── backend/     Express REST API (auth, resumes, templates, DB migrations)
└── frontend/    Angular app (login/signup, dashboard, template picker, editor)
```

---

## 💻 Running It Locally

### Prerequisites
- Node.js 18+ and npm
- MySQL 8+ (or MariaDB) running locally
- Angular CLI: `npm install -g @angular/cli`

### 1. Database setup
```bash
mysql -u root -p < backend/models/schema.sql
```
This creates the `resumeforge` database with `users` and `resumes` tables.
*(In production, these tables are created automatically on server startup — see `backend/config/migrate.js`.)*

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
# edit .env: set your DB credentials and a long random JWT_SECRET
npm run dev        # nodemon, auto-restarts on changes
# or: npm start
```
API runs at `http://localhost:5000`. Health check: `GET http://localhost:5000/api/health`.

### 3. Frontend setup
```bash
cd frontend
npm install
ng serve -o
```
App runs at `http://localhost:4200` and talks to the API via `src/environments/environment.ts`.

---

## 🔗 API Endpoints

| Method | Route                  | Auth | Description               |
|--------|-------------------------|------|----------------------------|
| POST   | `/api/auth/register`    | No   | Create account             |
| POST   | `/api/auth/login`       | No   | Log in, returns JWT        |
| GET    | `/api/auth/me`          | Yes  | Current user profile       |
| GET    | `/api/resumes/templates`| Yes  | List available templates   |
| GET    | `/api/resumes`          | Yes  | List my resumes            |
| POST   | `/api/resumes`          | Yes  | Create a resume            |
| GET    | `/api/resumes/:id`      | Yes  | Get one resume             |
| PUT    | `/api/resumes/:id`      | Yes  | Update a resume            |
| DELETE | `/api/resumes/:id`      | Yes  | Delete a resume            |

Send the JWT in the `Authorization: Bearer <token>` header for protected routes.

---

## ✨ Features

- 🔐 Secure signup/login with hashed passwords and JWT sessions
- 📋 Multiple resume templates to choose from
- ✏️ Live editing with instant preview
- 💾 Save, edit, and delete multiple resumes per user
- 📱 Responsive design

---

## 📚 What This Project Covers

- **Angular:** modules, routing + route guards, reactive forms (`FormArray`), services, HTTP interceptors
- **Node/Express:** REST API design, middleware, controllers, error handling
- **MySQL:** relational schema design with a JSON column for flexible content
- **Auth:** bcrypt password hashing, JWT issuance/verification
- **DevOps:** full deployment pipeline — GitHub → Render (frontend + backend) → Aiven (managed MySQL)


# 👨‍💻 Author
Latesh Padaliya

🎓 B.Tech Computer Science Engineering Student

🌱 Aspiring Full Stack Developer

GitHub: https://github.com/LateshDev

LinkedIn: https://www.linkedin.com/in/latesh-padaliya

⭐ Support
If you like this project, consider giving it a ⭐ on GitHub.
