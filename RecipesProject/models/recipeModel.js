import fs from "fs";
import { nanoid } from "nanoid";
import pool from "../db.js";

const getRecipes = async () => {
  try {
    const [data] = await pool.query("SELECT * FROM recipes");
    return data;
  } catch (error) {
    return [];
  }
};

const getRecipeByDifficulty = async (difficulty) => {
  try {
    const [data] = await pool.query(
      "SELECT * FROM recipes WHERE difficulty = ?",
      [difficulty],
    );
    return data;
  } catch (error) {
    return [];
  }
};

const getRecipeByMaxCookingTime = async (maxCookingTime) => {
  try {
    const [data] = await pool.query(
      "SELECT * FROM recipes WHERE cookingTime <= ?",
      [maxCookingTime],
    );
    return data;
  } catch (error) {
    return [];
  }
};

const searchRecipes = async (search) => {
  try {
    const [data] = await pool.query(
      "SELECT * FROM recipes WHERE title LIKE ? OR description LIKE ?",
      [`%${search}%`, `%${search}%`],
    );
    return data;
  } catch (error) {
    return [];
  }
};

const getRecipeById = async (id) => {
  try {
    const [data] = await pool.query("SELECT * FROM recipes WHERE id = ?", [id]);
    return data;
  } catch (error) {
    return [];
  }
};

const addRecipe = async (recipe) => {
  const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");
  const newRecipe = {
    ...recipe,
    id: nanoid(7),
    createdAt,
  };
  try {
    const recipeForDb = {
      ...newRecipe,
      ingredients: JSON.stringify(newRecipe.ingredients),
      instructions: JSON.stringify(newRecipe.instructions),
    };
    const [data] = await pool.query("INSERT INTO recipes SET ?", recipeForDb);
    return data;
  } catch (error) {
    throw error;
  }
};

// TODO: fix update recipe
const updateRecipe = async (id, recipe) => {
  try {
    const [data] = await pool.query("SELECT * FROM recipes WHERE id = ?", [id]);
    const recipeIndex = data.findIndex((recipe) => recipe.id === id);
    if (recipeIndex === -1) {
      return null;
    }
    data[recipeIndex] = { ...data[recipeIndex], ...recipe };
    const recipeForDb = {
      ...data[recipeIndex],
      ingredients: JSON.stringify(data[recipeIndex].ingredients),
      instructions: JSON.stringify(data[recipeIndex].instructions),
    };
    await pool.query("UPDATE recipes SET ? WHERE id = ?", [recipeForDb, id]);
    return data[recipeIndex];
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
