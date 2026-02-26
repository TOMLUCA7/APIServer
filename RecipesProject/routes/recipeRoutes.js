import express from "express";
import recipesModel from "../models/recipeModel.js";
const router = express.Router();

router.get("/", recipesModel.getRecipes);
router.get("/difficulty/:difficulty", recipesModel.getRecipeByDifficulty);
router.get(
  "/maxCookingTime/:maxCookingTime",
  recipesModel.getRecipeByMaxCookingTime,
);
router.get("/search/:search", recipesModel.searchRecipes);

export default router;
