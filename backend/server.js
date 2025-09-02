// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import schoolRoutes from "./routes/schools.js";

// dotenv.config();
// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static("uploads")); // serve uploaded images

// // Routes
// app.use("/api/schools", schoolRoutes);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
import express from "express";
import initDB from "./db.js";

const app = express();
app.use(express.json());

app.get("/test-db", async (req, res) => {
  try {
    const db = await initDB();
    const [rows] = await db.execute("SELECT NOW() as currentTime");
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB Error");
  }
});

app.listen(7000, () => console.log("🚀 Server running on port 7000"));
