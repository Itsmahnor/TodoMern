# ANSWERS.md

## 1. How to run

**Prerequisites:** Node.js (v18+), npm

```bash
# Clone the repo and install dependencies
git clone <your-repo-url>
cd <project-folder>
npm install

# Install frontend dependencies
cd Frontend
npm install
npm run build
cd ..

# Start the server (serves both API and built frontend)
node app.js
```

Open http://localhost:8001 in your browser.

> No `.env` needed — the MongoDB Atlas URI is hardcoded in `Conn/conn.js`.
> The database is hosted on MongoDB Atlas, so no local MongoDB setup is required.

---

## 2. Stack choice

**Why this stack:**
- **React + Vite** on the frontend: fast dev server, component-based UI, easy state management with Redux for auth
- **Express.js** on the backend: minimal, well-documented, easy to wire REST routes quickly
- **MongoDB Atlas + Mongoose**: schema flexibility for a todo/notes app, free hosted tier means no local DB setup, and Mongoose makes relational-style references (user → tasks) simple
- **Tailwind CSS**: utility-first classes make responsive adjustments fast without writing custom CSS

**A worse choice would be:** A Python + Django stack. Django's ORM is excellent, but its templating model fights React-style SPAs, and the setup overhead (virtual environments, migrations, settings files) is unnecessary complexity for a small CRUD app. Django shines for content-heavy sites with server-side rendering, not for JSON API backends serving a React SPA.

---

## 3. One real edge case

**File:** `Frontend/src/Components/Todo.jsx`, the `useEffect` block (around line 60)

```js
if (isLoggedIn) fetchTasks();
```

**What it handles:** If the user is *not* logged in (e.g. they land on `/tasks` directly without signing in), the fetch is skipped entirely. Without this guard, `axios.get` would fire with `id = null`, sending a request to `/api/list/gettask/null`. The backend would either throw a Mongoose CastError (invalid ObjectId) or return an empty array, but it would still generate a noisy error toast every time the component mounts or `refresh` changes — even on a fresh page load before the user has done anything.

With the guard in place, no request fires, no error is shown, and the UI stays clean until the user authenticates.

---

## 4. AI usage

**Tool used:** Claude

- **Asked:** Help make the Todo, SignIn, and SignUp components responsive without touching logic.
  - **Given:** Targeted Tailwind class changes — `px-4` on wrappers, `w-full max-w-md` replacing fixed widths, `grid-cols-1 sm:grid-cols-2`, `break-words`, `pr-16` on cards.
  - **What I changed:** The AI initially suggested adding a separate `@media` CSS block for the textarea `rows` attribute, but `rows` is an HTML attribute, not a CSS property — it can't be changed with media queries. I kept it as a static `rows="3"` instead, which is a reasonable default for both mobile and desktop.


---

## 5. Honest gap

**The gap:** Authentication is fragile. The user's ID is stored in `sessionStorage`, which means:
- Closing the tab logs the user out (no "remember me")
- There is no JWT or token validation on protected API routes — anyone who knows a valid MongoDB user `_id` can read, add, or delete that user's tasks by hitting the API directly

**What I'd fix with another day:**
1. Switch to `localStorage` with a signed JWT (using `jsonwebtoken`) returned on signin
2. Add an Express middleware that verifies the JWT on every `/api/list/*` route before trusting the `id` in the request body
3. Remove the user `id` from the request body entirely for delete/update — derive it from the verified token instead, so a logged-in user can only touch their own data