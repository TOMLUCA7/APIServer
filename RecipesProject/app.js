import express from "express";
import { logger } from "./middlewares/logger.js";
import cors from "cors";
import recipeRouter from "./routes/recipeRoutes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello World!, this is recipe API");
});

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
