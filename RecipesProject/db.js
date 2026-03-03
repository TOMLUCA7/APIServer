import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const testConnection = async () => {
  try {
    const connection = await pool.promise().getConnection();
    console.log("✅ Success: Connected to MySQL database!");
    connection.release();
  } catch (err) {
    console.error("❌ Error: Could not connect to MySQL:", err.message);
  }
};

testConnection();

export default pool.promise();
