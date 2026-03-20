import axios from "axios";

const API = "https://your-backend-name.onrender.com/api/tasks";

export const getTasks = () => axios.get(API);
export const addTask = (data) => axios.post(API, data);
export const deleteTask = (id) => axios.delete(`${API}/${id}`);
export const toggleTask = (id) => axios.patch(`${API}/${id}`);