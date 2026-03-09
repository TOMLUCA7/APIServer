import favoriteModel from "../models/favoriteModel.js";
import recipesModel from "../models/recipeModel.js";

const addFavorite = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user.id;

    // Check if recipe exists
    const recipe = await recipesModel.getRecipeById(recipeId);
    if (!recipe || recipe.length === 0) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Check if already favorited
    const alreadyFavorited = await favoriteModel.isFavorited(userId, recipeId);
    if (alreadyFavorited) {
      return res.status(409).json({ error: "Recipe already in favorites" });
    }

    const favorite = await favoriteModel.addFavorite(userId, recipeId);
    if (!favorite) {
      return res.status(400).json({ error: "Failed to add favorite" });
    }

    res.status(201).json({
      success: true,
      message: "Recipe added to favorites",
      favorite,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  addFavorite,
};
