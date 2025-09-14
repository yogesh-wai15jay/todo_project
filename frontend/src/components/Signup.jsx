import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ for redirecting after signup

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/signup", {
        username,
        password,
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token); // ✅ save token
        alert("Signed up successfully!");
        navigate("/"); // ✅ redirect to landing page
      } else {
        alert("Signup successful but no token received.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error signing up");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
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
