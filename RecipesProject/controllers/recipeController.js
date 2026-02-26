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
      return res
        .status(404)
        .json({ error: "No recipes found by this difficulty" });
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
      return res
        .status(404)
        .json({ error: "No recipes found by this max cooking time" });
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
      return res.status(404).json({ error: "No recipes found by this search" });
    }
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipe = await recipesModel.getRecipeById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: "No recipe found by this id" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addRecipe = async (req, res) => {
  try {
    const recipe = await recipesModel.addRecipe(req.body);
    if (!recipe) {
      return res.status(400).json({ error: "Failed to add recipe" });
    }
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const recipe = await recipesModel.updateRecipe(req.params.id, req.body);
    if (!recipe) {
      return res.status(404).json({ error: "No recipe found by this id" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getRecipes,
  getRecipeByDifficulty,
  getRecipeByMaxCookingTime,
  searchRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
};
