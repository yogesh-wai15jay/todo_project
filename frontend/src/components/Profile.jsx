import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ clear saved token
    alert("You have been logged out!");
    navigate("/"); // ✅ redirect to landing page
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) return <p className="text-center mt-8">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-[#4B0020] flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-rose-50 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <p className="text-lg mb-2">
          <span className="font-semibold">Username:</span> {profile.username}
        </p>
        <p className="text-lg mb-6">
          <span className="font-semibold">Completed Todos:</span>{" "}
          {profile.completedTodos}
        </p>

      </div>
    </div>
  );
};

export default Profile;
