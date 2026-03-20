import { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/tasks";

export default function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await axios.post(API, { title, description });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="flex flex-col sm:flex-row gap-3 w-full mb-6"
    >
      {/* Title Input */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="
          w-full
          border border-gray-300
          p-3
          rounded-xl
          text-sm sm:text-base
          focus:outline-none
          focus:ring-2 focus:ring-indigo-400
          shadow-sm
        "
        required
      />

      {/* Description Input */}
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description (optional)"
        className="
          w-full
          border border-gray-300
          p-3
          rounded-xl
          text-sm sm:text-base
          focus:outline-none
          focus:ring-2 focus:ring-indigo-400
          shadow-sm
        "
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="
          w-full sm:w-auto
          bg-indigo-500 text-white
          px-6 py-3
          rounded-xl
          text-sm sm:text-base
          hover:bg-indigo-600
          active:scale-95
          transition-all duration-200
          shadow-md
        "
      >
        Add Task
      </button>
    </form>
  );
}