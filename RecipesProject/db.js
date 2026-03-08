import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Success: Connected to PostgreSQL database!");
    console.log(`Connected to: ${process.env.DB_NAME}`);
  })
  .catch((err) => {
    console.error("❌ Error: Could not connect to PostgreSQL:", err.message);
  });

export default sequelize;
