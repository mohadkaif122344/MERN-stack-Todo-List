📝 MERN Stack Todo List

A full-stack Todo List app built with the MERN stack, featuring authentication and Todo CRUD operations.

🚀 Features

- User signup, login, and logout
- JWT authentication with cookies and localStorage
- Protected frontend routes
- Add, view, update, and delete Todos
- Delete multiple Todos
- React + Vite frontend
- Node.js + Express + MongoDB backend

🛠️ Tech Stack

- React 19
- Vite
- React Router
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CSS

📂 Project Structure

MERN-stack-Todo-List-main/
├── backend/
│   ├── db/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── style/
│       ├── App.jsx
│       └── main.jsx
└── README.md

🧭 Frontend Routes

Route| Access
"/"| Protected
"/add"| Protected
"/update/:id"| Protected
"/signup"| Public
"/login"| Public

🌐 API Endpoints

Authentication

POST /api/users/signup
POST /api/users/login
POST /api/users/logout
GET  /api/users/profile

Todos

POST   /api/todos/add-task
GET    /api/todos/task
GET    /api/todos/task/:id
PUT    /api/todos/update-task/:id
DELETE /api/todos/delete/:id
DELETE /api/todos/delete-multiple



⚙️ Setup

Backend

cd backend
npm install

Create "backend/.env":

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the server:

npm run server

Backend URL:

http://localhost:3000

Frontend

cd frontend
npm install
npm run dev

Frontend URL:

http://localhost:5173

🔮 Future Improvements

- Secure Todo APIs with JWT middleware
- Add user-specific Todos
- Add search and filtering
- Add validation and loading states
- Add pagination
- Deploy the application

👨‍💻 Author

Mohad Kaif

GitHub:
https://github.com/mohadkaif122344

Repository:
https://github.com/mohadkaif122344/MERN-stack-Todo-List

