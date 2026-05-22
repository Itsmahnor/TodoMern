# TodoMern# 📝 TodoMern — Full Stack Todo App

A full-stack todo application built with the MERN stack. Users can sign up, log in, and manage their personal tasks — all data persists in the cloud via MongoDB Atlas.

---

## 🚀 How to Run

### Prerequisites
- Node.js v18+
- npm

### Steps

```bash
# 1. Clone the repository
git clone url
cd TodoMern

# 2. Install backend dependencies
npm install

# 3. Build the frontend
cd Frontend
npm install
npm run build
cd ..

# 4. Start the server
node app.js
```

Open **http://localhost:8001** in your browser.

> No local MongoDB setup needed — the app connects to MongoDB Atlas automatically.

---

## ✨ Features

- 🔐 User authentication (Sign Up / Sign In)
- ✅ Create, view, update, and delete todos
- ☁️ Data persists in MongoDB Atlas across sessions
- 📱 Fully responsive — works on mobile and desktop
- 🔒 User-specific tasks — each user only sees their own data

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, Tailwind CSS, Redux |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| HTTP Client | Axios |

---

