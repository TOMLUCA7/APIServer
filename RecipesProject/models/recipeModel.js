import { nanoid } from "nanoid";
import pool from "../db.js";

const getRecipes = async () => {
  try {
    const result = await pool.query("SELECT * FROM recipes");
    return result.rows;
  } catch (error) {
    return [];
  }
};

const getRecipeByDifficulty = async (difficulty) => {
  try {
    const result = await pool.query(
      "SELECT * FROM recipes WHERE difficulty = $1",
      [difficulty],
    );
    return result.rows;
  } catch (error) {
    return [];
  }
};

const getRecipeByMaxCookingTime = async (maxCooking_time) => {
  try {
    const result = await pool.query(
      "SELECT * FROM recipes WHERE cooking_time <= $1",
      [maxCooking_time],
    );
    return result.rows;
  } catch (error) {
    return [];
  }
};

const searchRecipes = async (search) => {
  try {
    const result = await pool.query(
      "SELECT * FROM recipes WHERE title LIKE $1 OR description LIKE $2",
      [`%${search}%`, `%${search}%`],
    );
    return result.rows;
  } catch (error) {
    return [];
  }
};

const getRecipeById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM recipes WHERE id = $1", [
      id,
    ]);
    return result.rows;
  } catch (error) {
    return [];
  }
};

const addRecipe = async (recipe) => {
  const newRecipe = {
    ...recipe,
    id: nanoid(7),
    created_at: new Date().toISOString(),
  };
  try {
    const recipeForDb = {
      ...newRecipe,
      ingredients: JSON.stringify(newRecipe.ingredients),
      instructions: JSON.stringify(newRecipe.instructions),
    };
    const result = await pool.query(
      "INSERT INTO recipes (id, title, description, cooking_time, difficulty, ingredients, instructions, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        recipeForDb.id,
        recipeForDb.title,
        recipeForDb.description,
        recipeForDb.cooking_time,
        recipeForDb.difficulty,
        recipeForDb.ingredients,
        recipeForDb.instructions,
        recipeForDb.created_at,
      ],
    );
    return result.rows[0];
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

    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    const setClause = fields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");
    values.push(id);

    const result = await pool.query(
      `UPDATE recipes SET ${setClause} WHERE id = $${values.length} RETURNING *`,
      values,
    );

    return result.rows[0] || null;
  } catch (error) {
    console.error("Update error:", error);
    return null;
  }
};

const deleteRecipe = async (id) => {
  try {
    const result = await pool.query("DELETE FROM recipes WHERE id = $1", [id]);
    return result.rowCount > 0;
  } catch (error) {
    return null;
  }
};

const getStatistics = async () => {
  try {
    const totalsResult = await pool.query(
      "SELECT COUNT(*) AS totalRecipes, AVG(cookingTime) AS averageCookingTime FROM recipes",
    );
    const difficultyResult = await pool.query(
      "SELECT difficulty, COUNT(*) AS count FROM recipes GROUP BY difficulty",
    );

    const recipesByDifficulty = {
      easy: 0,
      medium: 0,
      hard: 0,
    };

    difficultyResult.rows.forEach((row) => {
      recipesByDifficulty[row.difficulty] = Number(row.count);
    });

    const totalRecipes = Number(totalsResult.rows[0].totalrecipes) || 0;
    const averageCookingTime = totalsResult.rows[0].averagecookingtime
      ? Number(totalsResult.rows[0].averagecookingtime)
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
