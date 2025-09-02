// db.js
import mysql from "mysql2/promise";

let connection;

async function initDB() {
  if (!connection) {
    connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log("✅ Connected to Railway MySQL");
  }
  return connection;
}

export default initDB;
