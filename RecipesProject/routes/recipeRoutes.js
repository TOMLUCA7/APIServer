import express from "express";
import recipesController from "../controllers/recipeController.js";
import recipesValidation from "../middlewares/recipesValidation.js";
const router = express.Router();

router.get("/", recipesController.getRecipes);
router.get("/difficulty/:difficulty", recipesController.getRecipeByDifficulty);
router.get(
  "/maxCookingTime/:maxCookingTime",
  recipesController.getRecipeByMaxCookingTime,
);
router.get("/search/:search", recipesController.searchRecipes);

router.get("/statistics", recipesController.getStatistics);

router.get("/:id", recipesController.getRecipeById);

router.post(
  "/",
  recipesValidation.recipeValidation,
  recipesController.addRecipe,
);
router.put(
  "/:id",
  recipesValidation.recipeValidation,
  recipesController.updateRecipe,
);
router.delete("/:id", recipesController.deleteRecipe);

export default router;
