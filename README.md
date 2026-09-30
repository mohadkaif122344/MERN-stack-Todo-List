# 📝 MERN Stack Todo List

## LIVE LINK: | https://mern-stack-todo-list-psi.vercel.app/login |


<img width="1912" height="832" alt="Screenshot 2026-09-29 225804" src="https://github.com/user-attachments/assets/27e67647-84d1-4742-bef4-958a5d7a6f6d" />

<img width="1910" height="822" alt="Screenshot 2026-09-29 225754" src="https://github.com/user-attachments/assets/a869fe32-bdf4-4d96-b315-34a3bb913efb" />


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
