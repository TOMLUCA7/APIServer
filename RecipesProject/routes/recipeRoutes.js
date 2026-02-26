import express from "express";
import recipesController from "../controllers/recipeController.js";
const router = express.Router();

router.get("/", recipesController.getRecipes);
router.get("/difficulty/:difficulty", recipesController.getRecipeByDifficulty);
router.get(
  "/maxCookingTime/:maxCookingTime",
  recipesController.getRecipeByMaxCookingTime,
);
router.get("/search/:search", recipesController.searchRecipes);
router.get("/:id", recipesController.getRecipeById);

export default router;
