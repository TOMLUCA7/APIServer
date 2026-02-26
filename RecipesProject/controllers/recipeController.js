import recipesModel from "../models/recipeModel.js";

const getRecipes = async (req, res) => {
  try {
    const recipes = await recipesModel.getRecipes();
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
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchRecipes = async (req, res) => {
  try {
    const recipes = await recipesModel.searchRecipes(req.params.search);
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getRecipes,
  getRecipeByDifficulty,
  getRecipeByMaxCookingTime,
  searchRecipes,
};
