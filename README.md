# 📝 MERN Stack Todo List

## LIVE LINK: | https://mern-stack-todo-list-psi.vercel.app |

<img width="1913" height="840" alt="Screenshot 2026-09-30 145323" src="https://github.com/user-attachments/assets/2edf9dcf-f7f4-4952-bd37-cf8ffff73544" />

<img width="1916" height="830" alt="Screenshot 2026-09-30 150711" src="https://github.com/user-attachments/assets/605f046c-fa11-4cb8-ac68-5750a5a42b57" />

<img width="1901" height="827" alt="Screenshot 2026-09-30 150701" src="https://github.com/user-attachments/assets/69e720e0-b891-4ec3-ba0b-99a7d75eb09f" />


A full-stack **Todo List application** built with the MERN stack.  
The application includes user authentication and complete Todo CRUD functionality with a responsive interface.

## 🚀 Features

### 🔐 Authentication
- User Signup
- User Login
- User Logout
- JWT Authentication
- Password Hashing with bcryptjs
- Protected Routes
- Authentication using Cookies & LocalStorage

### ✅ Todo Management
- Add Todo
- View All Todos
- View Single Todo
- Update Todo
- Delete Todo
- Delete Multiple Todos
- Responsive Todo List

### 🎨 Frontend
- React 19
- Vite
- React Router
- Axios
- React Hot Toast
- Responsive CSS

### ⚙️ Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- REST APIs

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React 19 | Frontend |
| Vite | Development & Build Tool |
| React Router | Routing |
| Axios | API Requests |
| Node.js | Backend Runtime |
| Express.js | REST API |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcryptjs | Password Hashing |
| CSS | Styling |

---

## 📂 Project Structure

```text
MERN-stack-Todo-List/
│
├── backend/
│   ├── db/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── style/
│       ├── App.jsx
│       └── main.jsx
│
└── README.md
```

### 🧭 Frontend Routes
```
Route	Access
/	Protected
/add	Protected
/update/:id	Protected
/signup	Public
/login	Public
```
### 🌐 API Endpoints
Authentication
```
POST /api/users/signup
POST /api/users/login
POST /api/users/logout
GET  /api/users/profile
```
Todos

```
POST   /api/todos/add-task
GET    /api/todos/task
GET    /api/todos/task/:id
PUT    /api/todos/update-task/:id
DELETE /api/todos/delete/:id
DELETE /api/todos/delete-multiple
```

### ⚙️ Installation & Setup

1. Clone Repository
```
git clone https://github.com/mohadkaif122344/MERN-stack-Todo-List.git
cd MERN-stack-Todo-List
```
3. Backend Setup
```
cd backend
npm install
```

Create a .env file inside the backend folder:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
Start the backend:

npm run server

Backend:
```
http://localhost:3000
3. Frontend Setup
```
Open a new terminal:
```
cd frontend
npm install
```
Create .env inside the frontend folder:
```
VITE_BACKEND_URL=http://localhost:3000
```
Start the frontend:
```
npm run dev
```
Frontend:
```
http://localhost:5173
```
### 🔒 Environment Variables

Backend
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
Frontend
```
VITE_BACKEND_URL=your_backend_url
```
Never upload .env files or secret keys to GitHub.
