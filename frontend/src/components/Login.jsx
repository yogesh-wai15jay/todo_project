// src/components/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Login({ setIsLoggedIn, setUsername, setShowDashboard }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://todo-project-eight-sandy.vercel.app/auth/login", {
        username: usernameInput,
        password,
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        setUsername(usernameInput);
        setShowDashboard(true); // ✅ auto open dashboard after login
        toast("Login successful!");
        navigate("/");
      } else {
        toast("No token received. Please try again.");
      }
    } catch (error) {
      toast(error.response?.data?.message || "Error logging in");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent">
      <div className="p-6 bg-rose-50/70 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          className="w-full px-3 py-2 mb-3 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded-lg"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600/70 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
