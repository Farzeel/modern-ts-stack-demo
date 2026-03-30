# 📝 Notes App – Modern TypeScript Stack Demo

A full-stack notes application built with a **modern, TypeScript-first** stack.  
This project demonstrates end-to-end type safety, high performance, and industry-best practices.

📦 **Repository:** [modern-ts-stack-demo](https://github.com/farzeel/modern-ts-stack-demo)

---

## 🚀 Tech Stack

| Layer          | Technology                                                                                   |
|----------------|----------------------------------------------------------------------------------------------|
| **Runtime** | [Bun](https://bun.sh) – Fast JavaScript runtime & package manager                            |
| **Frontend** | [Next.js](https://nextjs.org) (App Router) – React framework with server components          |
| **Backend API**| [Hono](https://hono.dev) – Lightweight, edge-ready web framework                             |
| **ORM / Query**| [Drizzle ORM](https://orm.drizzle.team) – Type-safe SQL query builder                        |
| **Database** | [PostgreSQL](https://www.postgresql.org) – Relational database                               |
| **Validation** | [Zod](https://zod.dev) – Schema validation                                                   |
| **Testing** | Bun test, Jest, React Testing Library                                                        |
|  (Backend)                                                |

---

## ✨ Features

- ✅ **CRUD Operations:** Create, Read, Update, Delete notes.
- ✅ **Full Type Safety:** Shared TypeScript types across Frontend and Backend.
- ✅ **Next.js App Router:** Optimized data fetching with Server Components.
- ✅ **Zod Validation:** Strict schema validation for all API requests.
- ✅ **Database Migrations:** Version-controlled schema changes via Drizzle.
- ✅ **Dockerized:** Simple local database setup with Docker Compose.

---

## 🧱 Project Structure

```text
notes-app/
├── backend/               # Hono API
│   ├── src/
│   │   ├── db/            # Drizzle schema & client
│   │   ├── routes/        # Hono routers
│   │   └── index.ts       # App entry point
│   ├── drizzle.config.ts
│   └── package.json
├── frontend/              # Next.js app
│   ├── app/               # App Router pages
│   ├── components/        # React components
│   └── package.json
├── docker-compose.yml
└── README.md

