import express from "express";
import userController from "../controllers/userController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/favorites/:recipeId", verifyToken, userController.addFavorite);

export default router;
