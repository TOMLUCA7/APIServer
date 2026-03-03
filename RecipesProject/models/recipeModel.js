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

const updateRecipe = async (id, recipe) => {
  try {
    const updateData = { ...recipe };
    if (updateData.ingredients) {
      updateData.ingredients = JSON.stringify(updateData.ingredients);
    }
    if (updateData.instructions) {
      updateData.instructions = JSON.stringify(updateData.instructions);
    }

    const [result] = await pool.query("UPDATE recipes SET ? WHERE id = ?", [
      updateData,
      id,
    ]);

    if (result.affectedRows === 0) {
      return null;
    }
    const [data] = await pool.query("SELECT * FROM recipes WHERE id = ?", [id]);
    return data[0];
  } catch (error) {
    return null;
  }
};

const deleteRecipe = async (id) => {
  try {
    const [data] = await pool.query("SELECT * FROM recipes WHERE id = ?", [id]);
    if (data.length === 0) {
      return null;
    }
    await pool.query("DELETE FROM recipes WHERE id = ?", [id]);
    return true;
  } catch (error) {
    return null;
  }
};

const getStatistics = async () => {
  try {
    const [totalsRows] = await pool.query(
      "SELECT COUNT(*) AS totalRecipes, AVG(cookingTime) AS averageCookingTime FROM recipes",
    );
    const [difficultyRows] = await pool.query(
      "SELECT difficulty, COUNT(*) AS count FROM recipes GROUP BY difficulty",
    );

    const recipesByDifficulty = {
      easy: 0,
      medium: 0,
      hard: 0,
    };

    difficultyRows.forEach((row) => {
      recipesByDifficulty[row.difficulty] = row.count;
    });

    const totalRecipes = totalsRows[0].totalRecipes ?? 0;
    const averageCookingTime = totalsRows[0].averageCookingTime
      ? Number(totalsRows[0].averageCookingTime)
      : 0;

    return {
      totalRecipes,
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
