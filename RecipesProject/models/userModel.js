import pool from "../db.js";

const User = {
  // create new user
  create: async (username, email, hashedPassword) => {
    const [result] = await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
    );
    return result.insertId;
  },

  // find user by email
  findByEmail: async (email) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  },
};

export default User;
