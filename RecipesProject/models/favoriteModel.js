import { randomUUID } from "crypto";
import sequelize from "../db.js";

const addFavorite = async (userId, recipeId) => {
  try {
    const id = randomUUID();
    const now = new Date().toISOString();
    const [result] = await sequelize.query(
      `INSERT INTO 
        user_favorites 
        (id, 
        "userId", 
        "recipeId", 
        "createdAt", 
        "updatedAt")
       VALUES 
        (:id, 
        :userId, 
        :recipeId, 
        :createdAt, 
        :updatedAt)
       RETURNING *`,
      {
        replacements: {
          id,
          userId,
          recipeId,
          createdAt: now,
          updatedAt: now,
        },
      },
    );
    return result[0] ?? null;
  } catch (error) {
    throw error;
  }
};

const isFavorited = async (userId, recipeId) => {
  try {
    const [result] = await sequelize.query(
      `SELECT * FROM user_favorites WHERE "userId" = :userId AND "recipeId" = :recipeId`,
      { replacements: { userId, recipeId } },
    );
    return result.length > 0;
  } catch (error) {
    return false;
  }
};

const deleteFavorite = async (userId, recipeId) => {
  try {
    const [result] = await sequelize.query(
      `DELETE FROM user_favorites 
       WHERE "userId" = :userId AND "recipeId" = :recipeId 
       RETURNING *`,
      { replacements: { userId, recipeId } },
    );
    return result.length > 0;
  } catch (error) {
    throw error;
  }
};

export default {
  addFavorite,
  isFavorited,
  deleteFavorite,
};
