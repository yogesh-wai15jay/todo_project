// AddTodo.jsx
import React, { useState } from "react";

const AddTodo = ({ onTodoAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = { title, description, priority, dueDate };

    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const res = await fetch("http://localhost:3000/todo/create", {
        method: "POST",
        headers,
        body: JSON.stringify(newTodo),
      });

      let data = {};
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        try {
          data = await res.json();
        } catch (jsonErr) {
          console.error("Failed to parse response JSON", jsonErr);
        }
      }

      if (!res.ok) {
        console.error("Add todo error:", data.message || res.statusText);
        alert(data.message || "Failed to add todo");
        return;
      }

      if (typeof onTodoAdded === 'function') {
        onTodoAdded(); // refresh todos in TodoList
      } else {
        alert('Todo added successfully');
      }
      setTitle("");
      setDescription("");
      setPriority("Low");
      setDueDate("");
    } catch (error) {
      // Only alert if the todo was not actually added
      console.error("Error adding todo:", error);
      // Optionally, you can check if the todo was added by other means before alerting
      alert(error.message || "Error adding todo");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Add New Todo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            rows={3}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
