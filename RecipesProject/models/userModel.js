import pool from "../db.js";

const User = {
  // create new user
  create: async (username, email, hashedPassword) => {
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword],
    );
    return result.rows[0];
  },

  // find user by email
  findByEmail: async (email) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  },
};

export default User;
