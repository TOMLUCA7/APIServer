import express from "express";
import { logger } from "./middlewares/logger.js";
import cors from "cors";
import recipeRouter from "./routes/recipeRoutes.js";
import authRouter from "./routes/authRoutes.js";

import sequelize from "./db.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello World!, this is recipe API");
});

app.use("/auth", authRouter);
app.use("/recipes", recipeRouter);

app.all(/^(.*)$/, (req, res) => {
  res.status(404).send("Page not found");
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to database:", error);
  }
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
  testConnection();
});
