// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Addtodo from "./components/Addtodo";
import Profile from "./components/Profile";
import TodoList from "./components/TodoList";
import Navbar from "./components/Navbar";
import Toaster from "./components/Sonner";

// Removed RootLayout for minimal Sonner test

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);

  // ✅ Check token at first load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);

      // Try fetching user details (username) for profile icon
      fetch("https://todo-project-eight-sandy.vercel.app/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.username) setUsername(data.username);
        })
        .catch(() => {});
    }
  }, []);

  return (
    <Router>
      <Toaster />
      {/* ✅ Navbar always visible, reacts to auth state */}
      <Navbar
        isLoggedIn={isLoggedIn}
        username={username}
        onToggleDashboard={() => setShowDashboard(true)} // always open dashboard
        setIsLoggedIn={setIsLoggedIn}
        setUsername={setUsername}
        setShowDashboard={setShowDashboard}
      />
      <div className="mt-16">
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                isLoggedIn={isLoggedIn}
                showDashboard={showDashboard}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup
                setIsLoggedIn={setIsLoggedIn}
                setUsername={setUsername}
                setShowDashboard={setShowDashboard}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                setIsLoggedIn={setIsLoggedIn}
                setUsername={setUsername}
                setShowDashboard={setShowDashboard}
              />
            }
          />
          <Route path="/addtodo" element={<Addtodo />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/todolist" element={<TodoList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
