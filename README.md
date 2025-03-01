# 🏆 Kanban Board

A feature-rich Kanban Board application built with **React, Redux, Node.js, Express, and MongoDB**. It allows users to manage tasks seamlessly with drag-and-drop functionality, authentication, and a visually appealing UI.

---

## 🚀 Features

✅ User Authentication (JWT-based)  
✅ Create, Edit & Delete Lists  
✅ Add, Update & Remove Tasks  
✅ Drag & Drop Task Management  
✅ Dynamic Loading with Skeleton UI  
✅ Responsive & Modern UI

---

## 🛠 Tech Stack

### **Frontend**

- React.js
- Vite
- Redux Toolkit (State Management)
- @hello-pangea/dnd (Drag-and-Drop Support)
- react-icons (for icons)
- react-loading-skeleton (Loading Placeholder)

### **Backend**

- Node.js
- Express.js
- MongoDB (Mongoose ORM)
- JSON Web Token (JWT) Authentication

---

## 🚀 Deployment

- **Frontend:** [Kanban Board App](https://lucky-bombolone-29aff8.netlify.app/)
- **Backend:** [Kanban Board Server](https://kanban-board-server-mocha.vercel.app/)

---

## 📦 Installation & Setup

### **1️⃣ Clone the repository**

```sh
git clone https://github.com/souravpl8092/kanban-board.git
cd kanban-board
```

### **2️⃣ Install dependencies**

#### **Frontend**

```sh
cd client
npm install
```

#### **Backend**

```sh
cd server
npm install
```

---

## ⚙️ Configuration

### **1️⃣ Backend Environment Variables**

Create a `.env` file in the `server/` directory and configure the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### **2️⃣ Frontend Environment Variables**

Create a `.env` file in the `client/` directory and configure the following:

```env
VITE_API_URL=http://localhost:5000
```

---

## 🚀 Running the Project

### **1️⃣ Start Backend**

```sh
cd server
npm run dev
```

### **2️⃣ Start Frontend**

```sh
cd client
npm run dev
```

The frontend will be accessible at `http://localhost:5173`

---

## 📂 Folder Structure

```
kanban-board/
├── client/                 # Frontend (React + Redux)
│   ├── public/             # Static assets
│   ├── src/                # Source code
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── redux/          # Redux store & slices
│   │   ├── styles/         # Global styles
│   │   ├── utils/          # Helper functions
│   │   ├── App.tsx         # Root component
│   │   ├── main.tsx        # Entry point
│   ├── package.json        # Frontend dependencies
│
├── server/                 # Backend (Node.js + Express)
│   ├── controllers/        # API request handlers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Authentication & validation
│   ├── config/             # Environment config
│   ├── server.js           # Express server setup
│   ├── package.json        # Backend dependencies
│
└── README.md               # Project documentation
```

---

## 🎯 API Endpoints

### 🔐 Authentication

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| POST   | /api/auth/signup | Register a new user |
| POST   | /api/auth/login  | Login user          |

### 📌 Lists

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| GET    | /api/lists     | Fetch all lists   |
| POST   | /api/lists     | Create a new list |
| PUT    | /api/lists/:id | Update a list     |
| DELETE | /api/lists/:id | Delete a list     |

### 📝 Tasks

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| GET    | /api/tasks         | Fetch all tasks   |
| POST   | /api/tasks         | Create a new task |
| PATCH  | /api/tasks/:id     | Update a task     |
| PUT    | /api/tasks/reorder | Reorder tasks     |
| DELETE | /api/tasks/:id     | Delete a task     |

---

## 🎨 UI Components

- **LoadingCard** - Displays a skeleton while lists load
- **TaskCard** - Represents an individual task
- **AddTask / EditTask** - Modals for managing tasks
- **AddList / EditList** - Modals for managing lists
- **Navbar** - Navigation bar
- **Tooltip** - Custom tooltip component

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit a pull request.

## 📜 License

This project is licensed under the MIT License.

---

Made with ❤️ by [Sourav Paul](https://github.com/souravpl8092) 🚀

---
