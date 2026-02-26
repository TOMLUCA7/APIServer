import recipesModel from "../models/recipeModel.js";

const getRecipes = async (req, res) => {
  try {
    const recipes = await recipesModel.getRecipes();
    if (!recipes) {
      return res.status(404).json({ error: "No recipes found" });
    }
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecipeByDifficulty = async (req, res) => {
  try {
    const recipes = await recipesModel.getRecipeByDifficulty(
      req.params.difficulty,
    );
    if (!recipes) {
      return res.status(404).json({ error: "No recipes found" });
    }
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecipeByMaxCookingTime = async (req, res) => {
  try {
    const recipes = await recipesModel.getRecipeByMaxCookingTime(
      req.params.maxCookingTime,
    );
    if (!recipes) {
      return res.status(404).json({ error: "No recipes found" });
    }
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchRecipes = async (req, res) => {
  try {
    const recipes = await recipesModel.searchRecipes(req.params.search);
    if (!recipes) {
      return res.status(404).json({ error: "No recipes found" });
    }
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getRecipes,
  getRecipeByDifficulty,
  getRecipeByMaxCookingTime,
  searchRecipes,
};
