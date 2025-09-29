# ✅ WaiJay's Todo App  

A simple **React + Node.js Todo Application** with authentication (Login/Signup), task management, and a clean responsive UI.  

---

## 🚀 Features  

- **Authentication**:  
  - Signup & Login with username and password  
  - JWT-based authentication (stored in `localStorage`)  
  - Logout functionality  

- **Navbar (Global)**:  
  - Before Login → shows `Login` & `Signup`  
  - After Login → shows `Dashboard` & `User Profile (with Logout)`  

- **Landing Page**:  
  - Before Login → only Hero section + paragraph  
  - After Login → Hero + Congratulations message  
  - Clicking **Dashboard** → shows AddTodo & TodoList options  

- **Todos**:  
  - Add new tasks with priority/due date  
  - View/manage tasks in TodoList page  

- **UI**:  
  - Built with **React + Tailwind CSS**  
  - Mobile-friendly, responsive design  
  - Navbar & Footer with consistent theme  

---

## 🛠️ Tech Stack  

**Frontend**  
- React (Vite)  
- React Router DOM  
- Tailwind CSS  

**Backend (assumed running separately)**  
- Node.js / Express  
- MongoDB (or your chosen DB)  
- JWT Authentication  

---

## 📂 Project Structure 

src/
│── App.jsx
│── index.js
│
└── components/
│── Navbar.jsx
│── LandingPage.jsx
│── Login.jsx
│── Signup.jsx
│── Profile.jsx
│── Addtodo.jsx
│── TodoList.jsx

---

## ⚙️ Setup Instructions  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```
### 2️⃣ Install dependencies
```bash
npm install
```
### 3️⃣ Start development server
```bash
npm run dev
```

App will be available at:
http://localhost:5173/

---

Authentication API (Backend)

This frontend expects a backend running on http://localhost:3000
 with routes:

. POST /auth/signup → Create new user, return JWT token

. POST /auth/login → Login user, return JWT token

. GET /auth/me → Get current user (using JWT token in Authorization header)

Example Authorization header:
Authorization: Bearer <your_token_here>

---

Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
