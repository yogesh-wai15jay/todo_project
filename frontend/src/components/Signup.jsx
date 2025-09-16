// src/components/Signup.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup({ setIsLoggedIn, setUsername, setShowDashboard }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/signup", {
        username: usernameInput,
        password,
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        setUsername(usernameInput);
        setShowDashboard(true); // ✅ auto open dashboard after signup
        alert("Signup successful!");
        navigate("/");
      } else {
        alert("Signup successful but no token received.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error signing up");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#4B0020]">
      <div className="p-6 bg-rose-50 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
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
          onClick={handleSignup}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Signup;
