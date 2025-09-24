// TodoList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const priorityColors = {
  Low: "bg-green-200/70 text-green-800",
  Normal: "bg-yellow-200/70 text-yellow-800",
  High: "bg-red-200/70 text-red-800",
};

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
  });

  const fetchTodos = async () => {
    try {
      const res = await fetch("http://localhost:3000/todo/todos", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setTodos(data.todos || []);
    } catch (error) {}
  };

  const fetchComments = async (todoId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/comments/todos/${todoId}/comments`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await res.json();
      setComments(data.comments || []);
    } catch (error) {}
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        `http://localhost:3000/comments/todos/${selectedTodo._id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ text: newComment }),
        }
      );
      setNewComment("");
      fetchComments(selectedTodo._id);
    } catch (error) {}
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchTodos();
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:3000/todo/todos/search?query=${encodeURIComponent(
          searchQuery
        )}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await res.json();
      setTodos(data.todos || []);
    } catch (error) {}
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/todo/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchTodos();
    } catch (error) {}
  };

  const handleToggleComplete = async (todo) => {
    try {
      await fetch(`http://localhost:3000/todo/${todo._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ ...todo, completed: !todo.completed }),
      });
      fetchTodos();
    } catch (error) {}
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3000/todo/${editingTodo._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editForm),
      });
      setEditingTodo(null);
      setEditForm({ title: "", description: "", priority: "Low", dueDate: "" });
      fetchTodos();
    } catch (error) {}
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-transparent flex flex-col">

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="max-w-2xl w-full">
          <h2 className="text-white font-bold mb-4">Your Todos</h2>

          {/* Search */}
          <form onSubmit={handleSearch} className="text-white flex gap-2 mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search todos..."
              className="flex-grow px-3 py-2 border rounded-lg"
            />
            <button
              type="submit"
              className="bg-blue-600/70 text-white px-4 rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </form>

          {/* Todo list */}
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className={`p-4 rounded-lg shadow flex-col md:flex-row items-center justify-between ${
                  todo.completed ? "bg-green-50/70" : "bg-rose-50/70"
                }`}
              >
                <div>
                  <h3
                    className={`font-semibold text-lg ${
                      todo.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {todo.title}
                  </h3>
                  <p
                    className={`text-gray-600 ${
                      todo.completed ? "line-through" : ""
                    }`}
                  >
                    {todo.description}
                  </p>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      priorityColors[todo.priority] ||
                      "bg-gray-200/70 text-gray-800"
                    }`}
                  >
                    Priority: {todo.priority}
                  </span>
                  <br />
                  {todo.dueDate && (
                    <span className="ml-2 text-xs text-gray-500">
                      Due Date: {new Date(todo.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <span className="flex gap-2">
                  <button
                    className={`px-3 py-1 rounded text-white ${
                      todo.completed
                        ? "bg-gray-500/70 hover:bg-gray-600"
                        : "bg-green-600/70 hover:bg-green-700"
                    }`}
                    onClick={() => handleToggleComplete(todo)}
                  >
                    {todo.completed ? "Undo" : "Mark Complete"}
                  </button>
                  <button
                    className="px-3 py-1 bg-blue-500/70 text-white rounded hover:bg-blue-600"
                    onClick={() => {
                      setSelectedTodo(todo);
                      fetchComments(todo._id);
                    }}
                  >
                    View
                  </button>
                  <button
                    className="px-3 py-1 bg-yellow-500/70 text-white rounded hover:bg-yellow-600"
                    onClick={() => {
                      setEditingTodo(todo);
                      setEditForm({
                        title: todo.title,
                        description: todo.description,
                        priority: todo.priority,
                        dueDate: todo.dueDate
                          ? todo.dueDate.split("T")[0]
                          : "",
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500/70 text-white rounded hover:bg-red-600"
                    onClick={() => handleDelete(todo._id)}
                  >
                    Delete
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ✅ Modal for View (BLUR only, no black background) */}
      {selectedTodo && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-rose-50/70 w-full max-w-lg p-6 rounded-xl shadow-xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setSelectedTodo(null)}
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedTodo.title}</h2>
            <p className="text-gray-600 mb-4">{selectedTodo.description}</p>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                priorityColors[selectedTodo.priority] ||
                "bg-gray-200/70 text-gray-800"
              }`}
            >
              {selectedTodo.priority}
            </span>
            {selectedTodo.dueDate && (
              <p className="text-sm text-gray-500 mt-2">
                Due: {new Date(selectedTodo.dueDate).toLocaleDateString()}
              </p>
            )}

            <hr className="my-4" />

            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            <ul className="space-y-2 mb-4">
              {comments.length === 0 && (
                <li className="text-gray-500">No comments yet.</li>
              )}
              {comments.map((c) => (
                <li key={c._id} className="p-2 border rounded bg-gray-50/70">
                  <p className="text-sm">{c.text}</p>
                  <span className="text-xs text-gray-500">
                    by {c.userId?.username || "Unknown"}
                  </span>
                </li>
              ))}
            </ul>

            <form onSubmit={handleAddComment} className="flex gap-2 mt-4">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-grow px-3 py-2 border rounded-lg"
                required
              />
              <button
                type="submit"
                className="bg-blue-600/70 text-white px-4 rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ✅ Modal for Edit (BLUR only) */}
      {editingTodo && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-rose-50/70 w-full max-w-lg p-6 rounded-xl shadow-xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setEditingTodo(null)}
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">Edit Todo</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Priority</label>
                <select
                  value={editForm.priority}
                  onChange={(e) =>
                    setEditForm({ ...editForm, priority: e.target.value })
                  }
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
                  value={editForm.dueDate}
                  onChange={(e) =>
                    setEditForm({ ...editForm, dueDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="w-full bg-green-600/70 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingTodo(null)}
                  className="w-full bg-gray-400/80 text-white font-semibold py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
