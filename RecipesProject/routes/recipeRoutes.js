import express from "express";
import recipesController from "../controllers/recipeController.js";
import recipesValidation from "../middlewares/recipesValidation.js";
import verifyToken from "../middlewares/authMiddleware.js";
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
  verifyToken,
  recipesValidation.recipeValidation,
  recipesController.addRecipe,
);

router.put(
  "/:id",
  verifyToken,
  recipesValidation.recipeValidation,
  recipesController.updateRecipe,
);

router.delete("/:id", verifyToken, recipesController.deleteRecipe);

export default router;
