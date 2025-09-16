// src/components/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = ({ isLoggedIn, showDashboard }) => {
  return (
    <div className="min-h-screen bg-[#4B0020] text-white flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-1 items-center justify-center text-center px-6 w-full mt-20">
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg">
            Organize today 🌈 <br /> So tomorrow feels lighter
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Stay organized, boost your productivity, and keep track of your
            tasks effortlessly. With{" "}
            <span className="font-semibold">WaiJay's Todo</span>, you’ll never
            miss a deadline again.
          </p>

          {/* After login → show congratulations + dashboard if toggled */}
          {isLoggedIn && (
            <>
              <p className="mt-6 text-lg">
                <span className="font-bold">Congratulations!!</span> 🎉 You are
                logged in...
              </p>

              {showDashboard && (
                <div className="w-full py-12 mt-8">
                  <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
                    <Link
                      to="/addtodo"
                      className="p-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg text-center transition transform hover:scale-105"
                    >
                      <h3 className="text-xl font-bold mb-2">
                        ➕ Add a New Todo
                      </h3>
                      <p>Create a new task, set priority and due date.</p>
                    </Link>
                    <Link
                      to="/todolist"
                      className="p-6 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg text-center transition transform hover:scale-105"
                    >
                      <h3 className="text-xl font-bold mb-2">📋 Your Todos</h3>
                      <p>View, edit, and manage all your tasks.</p>
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-4 bg-[#3B060A] text-gray-300 text-sm">
        © {new Date().getFullYear()} WaiJay's Todo. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
