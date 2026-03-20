import React, { useState } from "react";

export default function TaskItem({ task, fetchTasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [loading, setLoading] = useState(false);

  // Save edited task
  const saveTask = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      setLoading(true);
      await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      setIsEditing(false);
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    } finally {
      setLoading(false);
    }
  };

  // Toggle status
  const toggleStatus = async () => {
    try {
      setLoading(true);
      await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: task.status === "pending" ? "completed" : "pending",
        }),
      });
      fetchTasks();
    } catch (err) {
      console.error("Error toggling status:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const deleteTask = async () => {
    try {
      setLoading(true);
      await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
        method: "DELETE",
      });
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">

      {/* Task Info */}
      <div className="flex-1 w-full">
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        ) : (
          <>
            <h3
              className={`font-semibold ${
                task.status === "completed"
                  ? "line-through text-gray-400"
                  : "text-gray-800"
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-gray-500 wrap-break-word">
                {task.description}
              </p>
            )}
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 w-full sm:w-auto">
        {isEditing ? (
          <>
            <button
              onClick={saveTask}
              disabled={loading}
              className="flex-1 sm:flex-none px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 sm:flex-none px-4 py-2 bg-gray-400 text-white rounded-lg"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={toggleStatus}
              disabled={loading}
              className="flex-1 sm:flex-none px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              {task.status === "pending" ? "Complete" : "Undo"}
            </button>
            <button
              onClick={deleteTask}
              disabled={loading}
              className="flex-1 sm:flex-none px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 sm:flex-none px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
}