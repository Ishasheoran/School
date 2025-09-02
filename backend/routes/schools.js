// import express from "express";
// import multer from "multer";
// import mysql from "mysql2/promise";
// import dotenv from "dotenv";

// dotenv.config();
// const router = express.Router();

// // ✅ MySQL connection
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

// // ✅ Multer setup for image upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/schoolImages");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage });

// // ✅ Add new school
// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     const { name, address, city, state, contact, email } = req.body;
//     const imagePath = req.file ? `uploads/schoolImages/${req.file.filename}` : null;


//     const sql =
//       "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
//     const values = [name, address, city, state, contact, email, imagePath];

//     const [result] = await pool.query(sql, values);

//     res.json({ success: true, message: "School added successfully", id: result.insertId });
//   } catch (err) {
//     console.error("Error inserting school:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // ✅ Get all schools
// router.get("/", async (req, res) => {
//   try {
//     const [rows] = await pool.query("SELECT id, name, address, city, image FROM schools");
//     res.json(rows);
//   } catch (err) {
//     console.error("Error fetching schools:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// export default router;
import express from "express";
import multer from "multer";
import mysql from "mysql2/promise";

const router = express.Router();

// ✅ Railway MySQL connection (using DATABASE_URL)
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL, // 👈 This is your Railway URL
});

// ✅ Multer setup for image upload (will reset on redeploy in Render!)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/schoolImages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ Add new school
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, address, city, state, contact, email } = req.body;
    const imagePath = req.file ? `uploads/schoolImages/${req.file.filename}` : null;

    const sql =
      "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [name, address, city, state, contact, email, imagePath];

    const [result] = await pool.query(sql, values);

    res.json({ success: true, message: "School added successfully", id: result.insertId });
  } catch (err) {
    console.error("Error inserting school:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get all schools
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, address, city, image FROM schools"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching schools:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
