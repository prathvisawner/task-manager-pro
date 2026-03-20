import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/TaskController.js";

const router = express.Router();

// Get all tasks
router.get("/", getTasks);

// Create a new task
router.post("/", createTask);

// Update a task (title, description, status)
router.put("/:id", updateTask);

// Delete a task
router.delete("/:id", deleteTask);

export default router;