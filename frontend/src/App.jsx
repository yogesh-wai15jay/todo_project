import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import Login from './components/Login';
import Addtodo from './components/Addtodo';
import Profile from './components/Profile';
import TodoList from './components/TodoList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addtodo" element={<Addtodo />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/todolist" element={<TodoList />} />                         
        {/* We'll add more routes later */}
      </Routes>
    </Router>
  );
}

export default App;