import { randomUUID } from "crypto";
import sequelize from "../db.js";

const getRecipes = async () => {
  try {
    const [results] = await sequelize.query("SELECT * FROM recipes");
    return results;
  } catch (error) {
    return [];
  }
};

const getRecipeByDifficulty = async (difficulty) => {
  try {
    const [result] = await sequelize.query(
      "SELECT * FROM recipes WHERE difficulty = :difficulty",
      { replacements: { difficulty } },
    );
    return result;
  } catch (error) {
    return [];
  }
};

const getRecipeByMaxCookingTime = async (maxCookingTime) => {
  try {
    const [result] = await sequelize.query(
      'SELECT * FROM recipes WHERE "cookingTime" = :maxCookingTime',
      { replacements: { maxCookingTime } },
    );
    return result;
  } catch (error) {
    return [];
  }
};

const searchRecipes = async (search) => {
  try {
    const pattern = `%${search}%`;
    const [result] = await sequelize.query(
      "SELECT * FROM recipes WHERE title LIKE :pattern OR description LIKE :pattern",
      { replacements: { pattern } },
    );
    return result;
  } catch (error) {
    return [];
  }
};

const getRecipeById = async (id) => {
  try {
    const [result] = await sequelize.query(
      "SELECT * FROM recipes WHERE id = :id",
      { replacements: { id } },
    );
    return result;
  } catch (error) {
    return [];
  }
};

const getRecipesByUserId = async (userId) => {
  try {
    const [results] = await sequelize.query(
      'SELECT * FROM recipes WHERE "userId" = :userId',
      { replacements: { userId } },
    );
    return results;
  } catch (error) {
    return [];
  }
};

const addRecipe = async (recipe) => {
  const now = new Date().toISOString();
  const newRecipe = {
    ...recipe,
    id: recipe.id ?? randomUUID(),
    createdAt: recipe.createdAt ?? now,
    updatedAt: recipe.updatedAt ?? now,
    isPublic: recipe.isPublic ?? true,
  };
  try {
    const recipeForDb = {
      ...newRecipe,
      ingredients: JSON.stringify(newRecipe.ingredients),
      instructions: JSON.stringify(newRecipe.instructions),
    };
    const [result] = await sequelize.query(
      `INSERT INTO recipes (
        id, 
        title, 
        description, 
        ingredients, 
        instructions, 
        "cookingTime", 
        servings, 
        difficulty, 
        "imageUrl", 
        "isPublic", 
        "userId", 
        "createdAt", 
        "updatedAt"
        ) 
        VALUES (
        :id, 
        :title, 
        :description, 
        :ingredients, 
        :instructions, 
        :cookingTime, 
        :servings, 
        :difficulty, 
        :imageUrl, 
        :isPublic, 
        :userId, 
        :createdAt, 
        :updatedAt) 
        RETURNING *`,
      {
        replacements: {
          id: recipeForDb.id,
          title: recipeForDb.title,
          description: recipeForDb.description,
          ingredients: recipeForDb.ingredients,
          instructions: recipeForDb.instructions,
          cookingTime: recipeForDb.cookingTime,
          servings: recipeForDb.servings,
          difficulty: recipeForDb.difficulty,
          imageUrl: recipeForDb.imageUrl,
          isPublic: recipeForDb.isPublic,
          userId: recipeForDb.userId,
          createdAt: recipeForDb.createdAt,
          updatedAt: recipeForDb.updatedAt,
        },
      },
    );
    return result[0] ?? null;
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

    updateData.updatedAt = new Date().toISOString();

    const fields = Object.keys(updateData);
    if (fields.length === 0) {
      return null;
    }

    const setClause = fields
      .map((field) => `"${field}" = :${field}`)
      .join(", ");

    const replacements = { ...updateData, id };
    const [rows] = await sequelize.query(
      `UPDATE recipes SET ${setClause} WHERE id = :id RETURNING *`,
      { replacements },
    );

    return rows[0] || null;
  } catch (error) {
    console.error("Update error:", error);
    return null;
  }
};

const deleteRecipe = async (id) => {
  try {
    const [result] = await sequelize.query(
      "DELETE FROM recipes WHERE id = :id RETURNING id",
      { replacements: { id } },
    );
    return result.length > 0;
  } catch (error) {
    return null;
  }
};

const getStatistics = async () => {
  try {
    const [totalsResult] = await sequelize.query(
      'SELECT COUNT(*) AS "totalRecipes", AVG("cookingTime") AS "averageCookingTime" FROM recipes',
    );
    const [difficultyResult] = await sequelize.query(
      "SELECT difficulty, COUNT(*) AS count FROM recipes GROUP BY difficulty",
    );

    const recipesByDifficulty = {
      easy: 0,
      medium: 0,
      hard: 0,
    };

    difficultyResult.forEach((row) => {
      recipesByDifficulty[row.difficulty] = Number(row.count);
    });

    const totalRecipes = Number(totalsResult[0]?.totalRecipes) || 0;
    const averageCookingTime = totalsResult[0]?.averageCookingTime
      ? Number(totalsResult[0].averageCookingTime)
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
  getRecipesByUserId,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getStatistics,
};
