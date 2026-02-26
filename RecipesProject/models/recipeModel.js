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

const addRecipe = async (recipe) => {
  const newRecipe = {
    ...recipe,
    id: nanoid(7),
    createdAt: new Date().toISOString(),
  };
  try {
    const data = await fs.promises.readFile("./data/recipes.json");
    const recipes = JSON.parse(data);
    recipes.push(newRecipe);
    await fs.promises.writeFile("./data/recipes.json", JSON.stringify(recipes));
    return newRecipe;
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
};
