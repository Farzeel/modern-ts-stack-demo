

---

```markdown
# 📝 Notes App – Modern TypeScript Stack Demo

A full‑stack notes application built with a **modern, TypeScript‑first** stack.  
This project demonstrates end‑to‑end type safety, high performance, and industry‑best practices.


📦 **Repository:** [modern-ts-stack-demo](https://github.com/farzeel/modern-ts-stack-demo)

---

## 🚀 Tech Stack

| Layer          | Technology                                                                                  |
|----------------|---------------------------------------------------------------------------------------------|
| Runtime        | [Bun](https://bun.sh) – fast JavaScript runtime & package manager                           |
| Frontend       | [Next.js](https://nextjs.org) (App Router) – React framework with server components         |
| Backend API    | [Hono](https://hono.dev) – lightweight, edge‑ready web framework                            |
| ORM / Query    | [Drizzle ORM](https://orm.drizzle.team) – type‑safe SQL query builder                       |
| Database       | [PostgreSQL](https://www.postgresql.org) – relational database                              |
| Validation     | [Zod](https://zod.dev) – schema validation                                                  |
| Testing        | Bun test, Jest, React Testing Library                                                       |
| Deployment     | Vercel (frontend), Fly.io / Railway (backend)                                               |

---

## ✨ Features

- ✅ **Create, Read, Update, Delete** notes
- ✅ Full **TypeScript** support across frontend, backend, and shared types
- ✅ **Server Components** in Next.js for optimal data fetching
- ✅ **Zod validation** on all API endpoints
- ✅ **Drizzle migrations** for version‑controlled schema changes
- ✅ **Unit & integration tests** for API and UI
- ✅ **Docker Compose** for local PostgreSQL setup
- ✅ **CI/CD pipeline** with GitHub Actions (testing + deployment)

---

## 🧱 Project Structure

```
notes-app/
├── backend/               # Hono API
│   ├── src/
│   │   ├── db/            # Drizzle schema & client
│   │   ├── routes/        # Hono routers
│   │   └── index.ts       # App entry point
│   ├── test/              # Unit & integration tests
│   ├── drizzle.config.ts
│   └── package.json
├── frontend/              # Next.js app
│   ├── app/               # App Router pages
│   ├── components/        # React components
│   ├── lib/               # API client & types
│   └── package.json
├── shared/                # (optional) shared types & schemas
├── docker-compose.yml
├── .github/workflows/     # CI/CD pipeline
└── README.md
```

---

## 🛠️ Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.0+)
- [Docker](https://docker.com) (optional, for PostgreSQL)
- Node.js (if you prefer, but Bun is recommended)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/modern-ts-stack-demo.git
cd modern-ts-stack-demo
```

### 2. Set up the database

Using Docker:

```bash
docker-compose up -d postgres
```

This starts PostgreSQL on `localhost:5432` with database `notes_app`.

Alternatively, use your own PostgreSQL instance and update the connection string.

### 3. Backend setup

```bash
cd backend
bun install
```

Create a `.env` file in the `backend` folder:

```env
DATABASE_URL=postgresql://postgres:yourPassword@localhost:5432/dbName
PORT=3001
```

Run migrations:

```bash
bun run generate
bun run migrate
```

Start the API server:

```bash
bun run dev
```

The API will be available at `http://localhost:3001`.

### 4. Frontend setup

```bash
cd ../frontend
bun install
```

Create a `.env.local` file in the `frontend` folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Start the Next.js development server:

```bash
bun run dev
```

Visit `http://localhost:3000` to see the app.

---

## 🔌 API Endpoints

All endpoints are prefixed with `/api`.

| Method | Endpoint       | Description                | Request Body                     |
|--------|----------------|----------------------------|----------------------------------|
| GET    | `/notes`       | Get all notes              | –                                |
| GET    | `/notes/:id`   | Get a single note          | –                                |
| POST   | `/notes`       | Create a new note          | `{ title, content }`             |
| PATCH  | `/notes/:id`   | Update a note              | `{ title?, content? }`           |
| DELETE | `/notes/:id`   | Delete a note              | –                                |

---

## 🧪 Testing

### Backend Tests

- **Unit tests** – isolated route tests with mocked database  
  ```bash
  cd backend
  bun test --test-folder test/unit
  ```

- **Integration tests** – run against a real PostgreSQL database (uses `notes_app_test`)  
  ```bash
  # Ensure DATABASE_URL points to the test database
  bun test --test-folder test/integration
  ```

### Frontend Tests

- **Unit tests** – components tested with Jest & React Testing Library  
  ```bash
  cd frontend
  bun test   # or npm test if using Jest
  ```

---





---

## 📄 License

MIT

---

## 👤 Author

Your Name – [GitHub](https://github.com/farzeel)

---

## 🙌 Acknowledgements

Built with modern tools to demonstrate type safety, performance, and developer experience.

```

---

