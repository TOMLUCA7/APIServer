import fs from "fs";

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
    const data = await fs.promises.readFile("./data/recipes.json");
    const recipes = JSON.parse(data);
    return recipes.filter((recipe) => recipe.difficulty === difficulty);
  } catch (error) {
    return [];
  }
};

const getRecipeByMaxCookingTime = async (maxCookingTime) => {
  try {
    const data = await fs.promises.readFile("./data/recipes.json");
    const recipes = JSON.parse(data);
    return recipes.filter((recipe) => recipe.cookingTime <= maxCookingTime);
  } catch (error) {
    return [];
  }
};

const searchRecipes = async (search) => {
  try {
    const data = await fs.promises.readFile("./data/recipes.json");
    const recipes = JSON.parse(data);
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
    const data = await fs.promises.readFile("./data/recipes.json");
    const recipes = JSON.parse(data);
    return recipes.find((recipe) => recipe.id === id);
  } catch (error) {
    return [];
  }
};

export default {
  getRecipes,
  getRecipeByDifficulty,
  getRecipeByMaxCookingTime,
  searchRecipes,
  getRecipeById,
};
