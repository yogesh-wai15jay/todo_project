import express from "express";
import { authenticateJWT } from "../middleware/jwt";
import { Comment } from "../db";

const router = express.Router();
const SECRET = "your-secret-key"; // same as authentication.ts


// ✅ Add a new comment to a todo
router.post("/todos/:todoId/comments", authenticateJWT, async (req, res) => {
  const { todoId } = req.params;
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "Comment text is required" });
  }

  try {
    const newComment = new Comment({
      text,
      todoId,
      userId: (req as any).user.id || (req as any).user._id, // logged-in user’s ID
    });

    await newComment.save();
    res.json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
});

// ✅ Get all comments for a todo
router.get("/todos/:todoId/comments", authenticateJWT, async (req, res) => {
  const { todoId } = req.params;

  try {
    const comments = await Comment.find({ todoId }).populate("userId", "username");
    res.json({ comments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
});

export default router;
