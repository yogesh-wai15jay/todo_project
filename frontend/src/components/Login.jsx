import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ for redirection

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token); // Save token
        alert("Login successful!");
        navigate("/"); // ✅ redirect to landing page
      } else {
        alert("No token received. Please try again.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error logging in");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
