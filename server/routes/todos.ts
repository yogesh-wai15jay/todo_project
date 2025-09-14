import express from 'express';
import { Todo } from '../db';
import { authenticateJWT } from '../middleware/jwt';

const router = express.Router();


// Test GET route for /todo/create
router.get('/create', (req, res) => {
  res.json({ message: 'GET /todo/create is working. Use POST for creating todos.' });
});

// Add a new todo (protected route)
router.post('/create', authenticateJWT, async (req, res) => {
  console.log('POST /todo/create called');
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('User:', (req as any).user);
  const { title, description, priority, dueDate } = req.body;

  try {
    const newTodo = new Todo({
      title,
      description,
      completed: false,
      priority,
      dueDate,
      userId: (req as any).user.id || (req as any).user._id, // Support both id and _id
    });
    await newTodo.save();
    res.json({ message: 'Todo created successfully', todo: newTodo });
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo', error });
  }
});


// Update a todo
router.put("/:id", authenticateJWT, async (req, res) => {
  console.log('PUT /todo/:id route hit');
  const { title, description, priority, dueDate, completed } = req.body;
  const user = (req as any).user;
  const todoId = req.params.id;
  const userId = user.id || user._id;
  console.log('--- UPDATE TODO DEBUG LOG ---');
  console.log('Todo ID:', todoId);
  console.log('User:', user);
  console.log('Query:', { _id: todoId, userId });
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId, userId },
      { title, description, priority, dueDate, completed },
      { new: true }
    );
    if (!updatedTodo) {
      console.log('Todo not found for update.');
      return res.status(404).json({ message: "Todo not found" });
    }
    console.log('Todo updated:', updatedTodo);
    res.json({ message: "Todo updated", todo: updatedTodo });
  } catch (error) {
    console.log('Error updating todo:', error);
    res.status(500).json({ message: "Error updating todo", error });
  }
});

// Delete a todo
router.delete("/:id", authenticateJWT, async (req, res) => {
  try {
    const deleted = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: (req as any).user.id || (req as any).user._id,
    });
    if (!deleted) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
});


// ✅ Get todos only for logged-in user
router.get("/todos", authenticateJWT, async (req, res) => {
  try {
    const userId = (req as any).user.id || (req as any).user._id;
    const todos = await Todo.find({ userId }); // filter by user ID
    res.json({ todos });
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
});

// Search a Todo by title or description
router.get("/todos/search", authenticateJWT, async (req, res) => {
  const { query } = req.query;

  try {
    const todos = await Todo.find({
      userId: (req as any).user.id || (req as any).user._id,
      $or: [
        { title: { $regex: query as string, $options: "i" } },
        { description: { $regex: query as string, $options: "i" } },
      ],
    });

    res.json({ todos });
  } catch (error) {
    res.status(500).json({ message: "Error searching todos", error });
  }
});


export default router;
