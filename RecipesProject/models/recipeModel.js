import fs from "fs";
import { nanoid } from "nanoid";

const getRecipes = async () => {
  try {
    const data = await fs.promises.readFile("./data/recipes.json");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const getRecipeByDifficulty = async (difficulty) => {
  try {
    const recipes = await getRecipes();
    return recipes.filter((recipe) => recipe.difficulty === difficulty);
  } catch (error) {
    return [];
  }
};

const getRecipeByMaxCookingTime = async (maxCookingTime) => {
  try {
    const recipes = await getRecipes();
    return recipes.filter((recipe) => recipe.cookingTime <= maxCookingTime);
  } catch (error) {
    return [];
  }
};

const searchRecipes = async (search) => {
  try {
    const recipes = await getRecipes();
    return recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(search.toLowerCase()) ||
        recipe.description.toLowerCase().includes(search.toLowerCase()),
    );
  } catch (error) {
    return [];
  }
};

const getRecipeById = async (id) => {
  try {
    const recipes = await getRecipes();
    return recipes.find((recipe) => recipe.id === id);
  } catch (error) {
    return [];
  }
};

const addRecipe = async (recipe) => {
  const newRecipe = {
    ...recipe,
    id: nanoid(7),
    createdAt: new Date().toISOString(),
  };
  try {
    const recipes = await getRecipes();
    recipes.push(newRecipe);
    await fs.promises.writeFile("./data/recipes.json", JSON.stringify(recipes));
    return newRecipe;
  } catch (error) {
    return null;
  }
};

const updateRecipe = async (id, recipe) => {
  try {
    const recipes = await getRecipes();
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);
    if (recipeIndex === -1) {
      return null;
    }
    recipes[recipeIndex] = { ...recipes[recipeIndex], ...recipe };
    await fs.promises.writeFile("./data/recipes.json", JSON.stringify(recipes));
    return recipes[recipeIndex];
  } catch (error) {
    return null;
  }
};

const deleteRecipe = async (id) => {
  try {
    const recipes = await getRecipes();
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);
    if (recipeIndex === -1) {
      return null;
    }
    recipes.splice(recipeIndex, 1);
    await fs.promises.writeFile("./data/recipes.json", JSON.stringify(recipes));
    return true;
  } catch (error) {
    return null;
  }
};

const getStatistics = async () => {
  const recipesByDifficulty = {};
  let totalCookingTime = 0;
  try {
    const recipes = await getRecipes();

    recipes.forEach((recipe) => {
      const diff = recipe.difficulty;

      if (!recipesByDifficulty[diff]) {
        recipesByDifficulty[diff] = 0;
      }
      recipesByDifficulty[diff]++;
    });

    for (const recipe of recipes) {
      totalCookingTime += recipe.cookingTime;
    }

    const averageCookingTime =
      recipes.length > 0 ? totalCookingTime / recipes.length : 0;

    return {
      totalRecipes: recipes.length,
      recipesByDifficulty,
      averageCookingTime,
    };
  } catch (error) {
    return null;
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
  deleteRecipe,
  getStatistics,
};
