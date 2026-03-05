import dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

pool
  .connect()
  .then((client) => {
    console.log("✅ Success: Connected to PostgreSQL database!");
    console.log(`Connected to: ${process.env.DB_NAME}`);
    client.release();
  })
  .catch((err) => {
    console.error("❌ Error: Could not connect to PostgreSQL:", err.message);
  });

export default pool;
