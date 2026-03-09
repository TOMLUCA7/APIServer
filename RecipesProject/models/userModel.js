import crypto from "crypto";
import sequelize from "../db.js";

const User = {
  // create new user
  create: async (username, email, hashedPassword, firstName, lastName) => {
    const id = crypto.randomUUID();
    const [rows] = await sequelize.query(
      `INSERT INTO users (
        id, 
        username, 
        email, 
        password, 
        "firstName", 
        "lastName", 
        "createdAt", 
        "updatedAt"
        ) 
       VALUES (
        :id, 
        :username, 
        :email, 
        :hashedPassword, 
        :firstName, 
        :lastName, 
        :createdAt, 
        :updatedAt
        ) 
       RETURNING *`,
      {
        replacements: {
          id,
          username,
          email,
          hashedPassword,
          firstName,
          lastName,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    );
    return rows?.[0] ?? null;
  },

  // find user by email
  findByEmail: async (email) => {
    const [rows] = await sequelize.query(
      "SELECT * FROM users WHERE email = :email",
      {
        replacements: { email },
      },
    );
    return rows?.[0] ?? null;
  },

  // find user by id
  findById: async (id) => {
    const [rows] = await sequelize.query(
      `SELECT 
        id, 
        username, 
        email, 
        "firstName", 
        "lastName", 
        "createdAt", 
        "updatedAt" 
      FROM users 
      WHERE id = :id`,
      {
        replacements: { id },
      },
    );
    return rows?.[0] ?? null;
  },
};

export default User;
