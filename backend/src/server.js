import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import taskRoutes from "./routes/TaskRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

// Routes
app.use("/api/tasks", taskRoutes);

// ✅ FIXED PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));