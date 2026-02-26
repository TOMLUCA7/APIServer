import express from "express";
import recipesController from "../controllers/recipeController.js";
import { recipeValidation } from "../middlewares/recipesValidation.js";
const router = express.Router();

router.get("/", recipesController.getRecipes);
router.get("/difficulty/:difficulty", recipesController.getRecipeByDifficulty);
router.get(
  "/maxCookingTime/:maxCookingTime",
  recipesController.getRecipeByMaxCookingTime,
);
router.get("/search/:search", recipesController.searchRecipes);
router.get("/:id", recipesController.getRecipeById);

router.post("/", recipeValidation, recipesController.addRecipe);

export default router;
