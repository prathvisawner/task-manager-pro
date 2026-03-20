import { useEffect, useState } from "react";
import * as api from "../api/taskApi";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.getTasks();

      // Safety check (important)
      if (res && res.data) {
        setTasks(Array.isArray(res.data) ? res.data : []);
      } else {
        setTasks([]);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err.message);
      setError(err.message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, fetchTasks, loading, error };
}