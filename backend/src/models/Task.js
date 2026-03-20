import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Task", taskSchema);