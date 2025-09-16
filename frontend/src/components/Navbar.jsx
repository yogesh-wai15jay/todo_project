// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({
  isLoggedIn,
  username,
  onToggleDashboard,
  setIsLoggedIn,
  setUsername,
  setShowDashboard,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername("");
    setShowDashboard(false);
    setDropdownOpen(false);
    navigate("/"); // back to landing
  };

  const handleDashboardClick = () => {
    if (onToggleDashboard) onToggleDashboard();
    navigate("/");
  };

  return (
    <nav className="w-full bg-[#3B060A] py-4 px-6 flex justify-between items-center shadow-lg fixed top-0 left-0 z-50">
      <h1
        className="text-2xl font-bold text-white cursor-pointer"
        onClick={() => navigate("/")}
      >
        WaiJay's Todo
      </h1>

      <div className="flex items-center gap-6 relative">
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="text-lg font-medium text-white hover:text-yellow-300 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-lg font-medium text-white hover:text-yellow-300 transition"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={handleDashboardClick}
              className="text-lg font-medium text-white hover:text-yellow-300 transition"
            >
              Dashboard
            </button>

            {/* Profile Button with Dropdown */}
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-10 h-10 flex items-center justify-center bg-rose-50 text-black font-bold rounded-full shadow hover:bg-green-600 hover:text-white transition"
            >
              {username ? username[0].toUpperCase() : "👤"}
            </button>

            {dropdownOpen && (
              <div className="absolute top-12 right-0 bg-white text-black rounded-lg shadow-lg w-40 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  Your Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
