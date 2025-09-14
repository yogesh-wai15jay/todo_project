import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-[#4B0020] text-white flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-1 items-center justify-center text-center px-6 w-full">
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg">
            WaiJay's Todo ✅
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Stay organized, boost your productivity, and keep track of your
            tasks effortlessly. With{" "}
            <span className="font-semibold">WaiJay's Todo</span>, you’ll
            never miss a deadline again.
          </p>

          {/* If NOT logged in → Show only login/signup */}
          {!isLoggedIn ? (
            <div className="space-x-4">
              <Link
                to="/login"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg shadow-md font-semibold hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-3 bg-white text-purple-600 rounded-lg shadow-md font-semibold hover:bg-gray-100"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            // If logged in → Show success + dashboard link
            <>
              <p className="mt-4 text-lg font-semibold">
                🎉 You are logged in.{" "}
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowDashboard((prev) => !prev);
                  }}
                  className="underline hover:text-yellow-300 cursor-pointer"
                >
                  {showDashboard ? "Hide Dashboard" : "Show Dashboard"}
                </Link>
                .
              </p>

              {/* Dashboard Section (toggle visible) */}
              {showDashboard && (
                <div className="bg-white text-gray-800 w-full py-12 mt-8 rounded-t-2xl shadow-lg">
                  <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
                    <Link
                      to="/addtodo"
                      className="p-6 bg-blue-100 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105 text-center"
                    >
                      <h3 className="text-xl font-bold mb-2">➕ Add a New Todo</h3>
                      <p className="text-gray-600">
                        Create a new task, set priority and due date.
                      </p>
                    </Link>
                    <Link
                      to="/todolist"
                      className="p-6 bg-purple-100 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105 text-center"
                    >
                      <h3 className="text-xl font-bold mb-2">📋 Your Todos</h3>
                      <p className="text-gray-600">
                        View, edit, and manage all your tasks.
                      </p>
                    </Link>
                  </div>
                </div>
              )}

              {/* Profile Card (always visible) */}
              <div className="bg-white text-gray-800 w-full py-12 shadow-inner">
                <div className="max-w-4xl mx-auto grid grid-cols-1 px-6">
                  <Link
                    to="/profile"
                    className="p-6 bg-green-100 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105 text-center"
                  >
                    <h3 className="text-xl font-bold mb-2">👤 Your Profile</h3>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 bg-[#3B060A] text-gray-300 text-sm">
        © {new Date().getFullYear()} WaiJay's Todo. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
