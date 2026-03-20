import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks = [], fetchTasks }) => {
  // Safety check (important)
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-10 text-center px-4">
        <p className="text-gray-500 text-sm sm:text-base">
          No tasks found
        </p>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">
          Add your first task 🚀
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          fetchTasks={fetchTasks} // ✅ correctly passed
        />
      ))}
    </div>
  );
};

export default TaskList;