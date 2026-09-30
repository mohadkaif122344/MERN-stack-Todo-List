import express from "express";
import Todo from "../models/todo.js";
import authMiddleware from "../middleware/auth.js";

export const router = express.Router();

router.post("/add-task", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const todo = await Todo.create({
      title,
      description,
      user: req.user._id,
    });
    res.status(201).json({
      success: true,
      message: "Task added successfully",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/task", authMiddleware, async (req, res) => {
  try {
    const todolist = await Todo.find({
      user: req.user._id,
    });
    res.json({
      success: true,
      data: todolist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/task/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    res.json({
      success: true,
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.put("/update-task/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatetodo = await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      {
        title,
        description,
      },
      {
        new: true,
      },
    );
    if (!updatetodo) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    res.json({
      success: true,
      message: "Task updated successfully",
      data: updatetodo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/delete-multiple", authMiddleware, async (req, res) => {
  try {
    const { ids } = req.body;
    await Todo.deleteMany({
      _id: {
        $in: ids,
      },
      user: req.user._id,
    });
    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
