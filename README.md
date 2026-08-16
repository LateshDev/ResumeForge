# ResumeForge
A full-stack resume builder: **Angular 17** frontend + **Node/Express + MySQL** backend, with JWT authentication.

```
ResumeForge/
├── backend/     Express REST API (auth, resumes, templates)
└── frontend/    Angular app (login/signup, dashboard, template picker, editor)
```

This is a real, runnable source tree — `node_modules` are **not** included (as with any repo), so you install
dependencies with `npm install` the first time, same as pulling down any GitHub project.

## Prerequisites
- Node.js 18+ and npm
- MySQL 8+ (or MariaDB) running locally
- Angular CLI: `npm install -g @angular/cli`

## 1. Database setup
```bash
mysql -u root -p < backend/models/schema.sql
```
This creates the `resumeforge` database with `users` and `resumes` tables.

## 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
# edit .env: set DB_PASSWORD and a long random JWT_SECRET
npm run dev        # nodemon, auto-restarts on changes
# or: npm start
```
API runs at `http://localhost:5000`. Health check: `GET http://localhost:5000/api/health`.

### API endpoints
| Method | Route                  | Auth | Description             |
|--------|-------------------------|------|--------------------------|
| POST   | /api/auth/register      | No   | Create account           |
| POST   | /api/auth/login         | No   | Log in, returns JWT      |
| GET    | /api/auth/me            | Yes  | Current user profile     |
| GET    | /api/resumes/templates  | Yes  | List available templates |
| GET    | /api/resumes            | Yes  | List my resumes          |
| POST   | /api/resumes            | Yes  | Create a resume          |
| GET    | /api/resumes/:id        | Yes  | Get one resume           |
| PUT    | /api/resumes/:id        | Yes  | Update a resume          |
| DELETE | /api/resumes/:id        | Yes  | Delete a resume          |

Send the JWT as `Authorization: Bearer <token>`.

## 3. Frontend setup
```bash
cd frontend
npm install
ng serve -o
```
App runs at `http://localhost:4200` and talks to the API via `src/environments/environment.ts`
(`apiUrl: 'http://localhost:5000/api'`).

## 4. Using the app
1. Sign up at `/signup`.
2. You're logged in automatically (JWT stored in `localStorage`) and land on `/dashboard`.
3. Click **+ New Resume** → pick a template → fill in the form → **Save Resume**.
4. Edit or delete resumes from the dashboard.

## Notes on "working live"
This working source code for both apps. Because it runs in your own environment
against your own MySQL instance, there's no way for me to host a live public URL from here — but everything
above is copy-pasteable and will run locally exactly as described. To deploy for real:
- **Backend**: any Node host (Render, Railway, EC2, etc.) + a managed MySQL instance (PlanetScale, RDS, etc.). Set the env vars from `.env.example`.
- **Frontend**: `ng build` then host `dist/resumeforge-frontend` on Netlify/Vercel/S3, pointing `environment.prod.ts`'s `apiUrl` at your deployed backend.

## Tech covered
- Angular: modules, routing + route guards, reactive forms (FormArray), services, HTTP interceptor
- Node/Express: REST API, middleware, controllers
- MySQL: relational schema with a JSON column for flexible resume content
- Auth: bcrypt password hashing, JWT issuance/verification

# 👨‍💻 Author
Latesh Padaliya

🎓 B.Tech Computer Science Engineering Student

🌱 Aspiring Full Stack Developer

GitHub: https://github.com/LateshDev

LinkedIn: https://www.linkedin.com/in/latesh-padaliya

⭐ Support
If you like this project, consider giving it a ⭐ on GitHub.
