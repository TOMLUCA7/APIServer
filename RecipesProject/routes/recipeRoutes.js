import express from "express";
import recipesController from "../controllers/recipeController.js";
import recipesValidation from "../middlewares/recipesValidation.js";
import verifyToken from "../middlewares/authMiddleware.js";
import {
  upload,
  normalizeMultipart,
  uploadToCloudinary,
} from "../middlewares/uploadMiddleware.js";
const router = express.Router();

router.get("/", recipesController.getRecipes);
router.get("/difficulty/:difficulty", recipesController.getRecipeByDifficulty);
router.get(
  "/maxCookingTime/:maxCookingTime",
  recipesController.getRecipeByMaxCookingTime,
);
router.get("/search/:search", recipesController.searchRecipes);

router.get("/statistics", recipesController.getStatistics);

router.get("/my-recipes", verifyToken, recipesController.getMyRecipes);

router.get("/:id", recipesController.getRecipeById);

router.post(
  "/",
  verifyToken,
  upload.single("image"),
  normalizeMultipart,
  recipesValidation.recipeValidation,
  uploadToCloudinary,
  recipesController.addRecipe,
);

router.put(
  "/:id",
  verifyToken,
  upload.single("image"),
  normalizeMultipart,
  recipesValidation.recipeValidation,
  uploadToCloudinary,
  recipesController.updateRecipe,
);

router.delete("/:id", verifyToken, recipesController.deleteRecipe);

export default router;
