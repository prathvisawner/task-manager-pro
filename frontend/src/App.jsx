import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

// Dynamic API (deploy ready)
const API =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch(API);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-white to-indigo-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10">
          🚀 Task Manager
        </h1>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500 mb-4">Loading...</p>
        )}

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Form */}
          <div className="lg:col-span-1 bg-white/70 backdrop-blur rounded-2xl p-4 shadow-md">
            <TaskForm fetchTasks={fetchTasks} />
          </div>

          {/* List */}
          <div className="md:col-span-1 lg:col-span-2">
            <TaskList
              tasks={tasks}
              fetchTasks={fetchTasks}   // ✅ FIXED
            />
          </div>

        </div>
      </div>
    </div>
  );
}