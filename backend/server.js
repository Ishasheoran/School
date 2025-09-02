import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import schoolRoutes from "./routes/schools.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve uploaded images

// Routes
app.use("/api/schools", schoolRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
