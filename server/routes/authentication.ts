import express from 'express';
import jwt from 'jsonwebtoken';
import { User, Todo } from '../db';
import { authenticateJWT } from '../middleware/jwt';

const router = express.Router();
const SECRET = 'your_jwt_secret'; // Match the secret used in middleware/jwt.ts

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        res.status(403).json({ message: 'User already exists' });
    } 
    else {
        const newUser = new User({ username, password });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'User created successfully', token });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    } 
    else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
});

// ✅ Profile route
router.get("/me", authenticateJWT, async (req, res) => {
  try {
    const userId = (req as any).user.id || (req as any).user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const completedCount = await Todo.countDocuments({
      userId,
      completed: true,
    });

    res.json({
      username: user.username,
      completedTodos: completedCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
});

export default router;