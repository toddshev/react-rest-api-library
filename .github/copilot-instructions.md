# AI Coding Agent Instructions - React REST API Library

## Project Overview
A full-stack learning project: **React 19 frontend** (Vite) + **Express.js backend** (Node.js) with Sequelize ORM + SQLite database. Two separate applications requiring two localhost instances: port 5000 (API), port 5173 (client).

---

## Architecture & Data Flow

### Backend (`/api`)
- **Entry point**: `app.js` - Express setup with middleware chain: Morgan logging → CORS → routes
- **Database**: Sequelize ORM with SQLite, config in `config/config.json` (dev/prod settings)
- **Models**: `User` (hasMany Course), `Course` (belongsTo User) - defined in `/models`
- **Authentication**: HTTP Basic Auth (base64 encoded email:password) in `middleware/auth-user.js`
- **Routes**: Centralized in `routes/routes.js` - all endpoints prefixed `/api`

### Frontend (`/client`)
- **Entry point**: `src/main.jsx` wraps App in BrowserRouter + UserProvider
- **Routing**: React Router v7 in `App.jsx` with private route protection
- **State Management**: `UserContext` (auth user + signIn/signOut actions) via `context/UserContext.jsx`
- **API Communication**: Centralized in `utils/apiHelper.js` - wraps fetch with Basic Auth header encoding

### Data Flow for User Actions
1. **Sign In**: UserSignIn component → signIn action → api() helper calls `/api/users` GET with Basic Auth → UserContext stores user + cookie
2. **Courses**: Courses component → api() GET `/api/courses` → displays with User info (populated via Sequelize include)
3. **Protected Routes**: PrivateRoute component checks `authUser` from context; redirects to signin if missing

---

## Development Workflows

### Starting Development
```bash
# Terminal 1: Backend (port 5000)
cd api
npm install
npm start

# Terminal 2: Frontend (port 5173)
cd client
npm install
npm run dev
```

### Building for Production
```bash
# Client build (Vite)
cd client
npm run build

# Note: Backend `npm start` uses nodemon (auto-reload)
```

### Seeding Database
```bash
cd api
npm run seed
```
Seeds data from `seed/data.json` using `seed/database.js` context setup.

### Testing API Routes
- Postman collection available: `api/RESTAPI.postman_collection.json`
- HTTP file for quick testing: `api/tests.http`

---

## Key Patterns & Conventions

### Error Handling
- **Backend**: Global error handler (app.js) + asyncHandler middleware wraps route handlers
- **Sequelize Errors**: Caught explicitly for validation/constraint errors → 400; others → 500
- **Frontend**: Try-catch in signIn; components handle null responses (e.g., forbidden/error routes)

### Authentication & Authorization
- Only endpoint requiring auth: `GET /api/users` (returns current user details)
- Course CRUD: POST/PUT/DELETE check `req.currentUser` from auth middleware
- Frontend: PrivateRoute component gate-keeps `/courses/:id/update` and `/courses/create`
- Passwords stored as bcrypt hashes; never sent/stored in cookies (only user data + password for local re-auth)

### Validation
- Sequelize model validators (notNull, notEmpty, emailFormat, etc.)
- Validation errors return as array: `{ errors: ["message1", "message2"] }`

### API Calls
- All frontend API calls use `apiHelper.js` with signature: `api(path, method, body, credentials)`
- Credentials object: `{ emailAddress, password }` → converted to Base64 header
- Hardcoded API base: `http://localhost:5000/api`

### Database Associations
- User → Course: one-to-many (User.hasMany Course)
- Course queries use `include: [{ model: User, attributes: [...] }]` for populated responses
- Timestamps excluded from responses with `attributes: { exclude: ['createdAt', 'updatedAt'] }`

---

## Critical Files Reference

| File | Purpose |
|------|---------|
| [api/routes/routes.js](api/routes/routes.js) | All REST endpoints (GET/POST/PUT/DELETE) |
| [client/context/UserContext.jsx](client/context/UserContext.jsx) | Auth state + actions (signIn/signOut) |
| [client/utils/apiHelper.js](client/utils/apiHelper.js) | Fetch wrapper with Basic Auth encoding |
| [api/middleware/auth-user.js](api/middleware/auth-user.js) | Basic Auth verification + user loading |
| [api/models/user.js](api/models/user.js), [course.js](api/models/course.js) | Sequelize model definitions |
| [client/components/PrivateRoute.jsx](client/components/PrivateRoute.jsx) | Route protection logic |

---

## Debugging Tips
- **CORS errors**: Check if both servers are running; client at 5173, API at 5000
- **Auth failures**: Verify base64 encoding in apiHelper; check bcrypt comparison in auth-user.js
- **404 on API**: All routes must be prefixed with `/api` (configured in app.js)
- **Database issues**: Check config.json env, run seed if models missing, verify SQLite file exists

---

## Deviations from Standard Practices
- **No JWT/session tokens**: Uses HTTP Basic Auth per-request (simpler, less secure)
- **Cookies store user data, not just session ID**: Includes encrypted password for re-auth
- **No dedicated error handling component**: App.jsx routes to /error, /forbidden, /notfound pages
- **All Sequelize sync on startup**: No separate migrations in practice (though migration files exist)
