import express from "express";
import {
  getRecipes,
  getRecipeByDifficulty,
  getRecipeByMaxCookingTime,
  searchRecipes,
} from "../controllers/recipeController.js";
const router = express.Router();

router.get("/", getRecipes);
router.get("/difficulty/:difficulty", getRecipeByDifficulty);
router.get("/maxCookingTime/:maxCookingTime", getRecipeByMaxCookingTime);
router.get("/search/:search", searchRecipes);
