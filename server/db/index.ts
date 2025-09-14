import mongoose from 'mongoose';

    // A blueprint for a user
    const userSchema = new mongoose.Schema({
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    });

    // A blueprint for Todo schema
    const todoSchema = new mongoose.Schema({
      title: String,
      description: String,
      completed: { type: Boolean, default: false },
      priority: { type: String, enum: ["Low", "Normal", "High"], default: "Low" },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      dueDate: { type: Date }, // due date field added
    });

    // New Comment schema
    const commentSchema = new mongoose.Schema({
      text: { type: String, required: true }, // comment content
      todoId: { type: mongoose.Schema.Types.ObjectId, ref: "Todo", required: true }, // link to Todo
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // who wrote it
      createdAt: { type: Date, default: Date.now },
    });

    export const User = mongoose.model('User', userSchema);
    export const Todo = mongoose.model('Todo', todoSchema);
    export const Comment = mongoose.model("Comment", commentSchema);