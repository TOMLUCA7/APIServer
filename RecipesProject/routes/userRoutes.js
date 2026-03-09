import express from "express";
import userController from "../controllers/userController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/favorites", verifyToken, userController.getFavorites);
router.post("/favorites/:recipeId", verifyToken, userController.addFavorite);
router.delete(
  "/favorites/:recipeId",
  verifyToken,
  userController.deleteFavorite,
);

export default router;
