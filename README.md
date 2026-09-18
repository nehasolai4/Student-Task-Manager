# StudyFlow — Student Task Management Application

A full-stack task management application designed specifically for students to organize assignments, exams, projects, and personal tasks in one place.

StudyFlow provides task management, priorities, due dates, filtering, search, progress tracking, and a responsive dashboard with light and dark modes.

## 🚀 Live Demo

**Frontend:** `https://studyflow04.netlify.app/`

**Backend API:** `https://student-task-manager-uwsb.onrender.com`

---

## ✨ Features

### Task Management

* Create new tasks
* Edit existing tasks
* Delete tasks with confirmation
* Mark tasks as completed or pending
* Persistent task storage using MongoDB

### Organization

* Categorize tasks:

  * Assignment
  * Exam
  * Project
  * Personal
* Set priority:

  * Low
  * Medium
  * High
* Add due dates
* Automatically identify overdue pending tasks

### Search & Filtering

* Search tasks by title or description
* Filter by:

  * All
  * Pending
  * Completed
  * High Priority

### Dashboard

* Total task count
* Pending task count
* Completed task count
* High-priority task count
* Overall completion percentage
* Visual progress indicator
* Upcoming task overview

### UI & UX

* Clean student-focused dashboard
* Responsive layout
* Light mode
* Dark mode
* Task completion visual feedback
* Delete confirmation dialog
* Form validation
* Loading and error states

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript (JSX)
* Tailwind CSS

### Backend

* Node.js
* Express.js
* JavaScript

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Netlify — Frontend
* Render — Backend
* MongoDB Atlas — Database

---

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │      StudyFlow      │
                    │   React Frontend    │
                    │     Netlify         │
                    └──────────┬──────────┘
                               │
                               │ HTTP / REST API
                               ▼
                    ┌─────────────────────┐
                    │    Express.js       │
                    │      Backend        │
                    │       Render        │
                    └──────────┬──────────┘
                               │
                               │ Mongoose
                               ▼
                    ┌─────────────────────┐
                    │    MongoDB Atlas    │
                    │     Task Data       │
                    └─────────────────────┘
```

### Application Flow

```text
User
 │
 ▼
React UI
 │
 ▼
Task Service
 │
 ▼
REST API
 │
 ▼
Express Routes
 │
 ▼
Mongoose Model
 │
 ▼
MongoDB Atlas
```

---

## 📁 Project Structure

```text
student-task-manager/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── services/
│   │   │   └── taskService.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── models/
│   │   └── Task.js
│   │
│   ├── routes/
│   │   └── tasks.js
│   │
│   ├── middleware/
│   │
│   ├── controllers/
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd student-task-manager
```

### 2. Setup the backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
```

Start the backend:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

### 3. Setup the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at the local Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

---

## 🔌 API Endpoints

Base URL:

```text
/api/tasks
```

| Method | Endpoint                  | Description       |
| ------ | ------------------------- | ----------------- |
| GET    | `/api/tasks`              | Get all tasks     |
| POST   | `/api/tasks`              | Create a task     |
| PUT    | `/api/tasks/:id`          | Update a task     |
| PATCH  | `/api/tasks/:id/complete` | Toggle completion |
| DELETE | `/api/tasks/:id`          | Delete a task     |

### Example Task

```json
{
  "title": "Complete DAA Assignment",
  "description": "Finish the graph algorithms section",
  "category": "Assignment",
  "priority": "High",
  "dueDate": "2026-09-25",
  "completed": false
}
```

---

## 🗄️ Database Model

Each task contains:

| Field         | Type    | Description                            |
| ------------- | ------- | -------------------------------------- |
| `title`       | String  | Task title                             |
| `description` | String  | Additional details                     |
| `category`    | String  | Assignment, Exam, Project, or Personal |
| `priority`    | String  | Low, Medium, or High                   |
| `dueDate`     | Date    | Task deadline                          |
| `completed`   | Boolean | Completion status                      |
| `createdAt`   | Date    | Creation timestamp                     |
| `updatedAt`   | Date    | Last update timestamp                  |

MongoDB Atlas is used for persistent storage, with Mongoose handling schema definition and database operations.

---

## 🔐 Environment Variables

The backend requires:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
```

**Never commit `.env` files or database credentials to GitHub.**

---

## 🎯 Design Approach

StudyFlow was designed around a simple student workflow:

```text
Create
  ↓
Organize
  ↓
Prioritize
  ↓
Complete
  ↓
Track Progress
```

The dashboard provides an overview of academic workload while allowing users to quickly search, filter, edit, complete, or remove tasks.

The application intentionally keeps the interface focused on the most useful student productivity features rather than adding unnecessary complexity.

---

## 🚧 Future Improvements

Potential future enhancements include:

* User authentication and personal task accounts
* Multiple dashboard views
* Calendar-based task visualization
* Notifications and reminders
* Drag-and-drop task organization
* More detailed productivity analytics
* Mobile-focused improvements

---

## 👩‍💻 Author

**Neha S**

Built as a full-stack development project demonstrating:

* React frontend development
* REST API development
* MongoDB database integration
* CRUD operations
* Responsive UI design
* API integration
* Application deployment
