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

const getMyRecipes = async (req, res) => {
  try {
    const recipes = await recipesModel.getRecipesByUserId(req.user.id);
    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ error: "No recipes found for this user" });
    }
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addRecipe = async (req, res) => {
  try {
    const timestamp = new Date().toISOString();
    const imageUrl = req.file?.path || req.body.imageUrl;

    const recipePayload = {
      ...req.body,
      userId: req.user.id,
      imageUrl: imageUrl,
      createdAt: timestamp,
      updatedAt: timestamp,
      isPublic: req.body.isPublic ?? true,
    };
    const recipe = await recipesModel.addRecipe(recipePayload);
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
    const existingRecipe = await recipesModel.getRecipeById(req.params.id);
    if (!existingRecipe) {
      return res.status(404).json({ error: "No recipe found by this id" });
    }

    // Ownership check
    if (existingRecipe.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Unauthorized: You do not own this recipe" });
    }

    const updateData = { ...req.body };
    
    // Protected fields that should not be updated
    delete updateData.id;
    delete updateData.userId;
    delete updateData.createdAt;

    if (req.file?.path) {
      updateData.imageUrl = req.file.path;
    }

    const recipe = await recipesModel.updateRecipe(req.params.id, updateData);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const existingRecipe = await recipesModel.getRecipeById(req.params.id);
    if (!existingRecipe) {
      return res.status(404).json({ error: "No recipe found by this id" });
    }

    if (existingRecipe.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Unauthorized: You do not own this recipe" });
    }

    const success = await recipesModel.deleteRecipe(req.params.id);
    res.status(200).json(`Recipe deleted successfully ${req.params.id}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStatistics = async (req, res) => {
  try {
    const statistics = await recipesModel.getStatistics();
    if (!statistics) {
      return res.status(404).json({ error: "No statistics found" });
    }
    res.status(200).json(statistics);
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
  getMyRecipes,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getStatistics,
};
