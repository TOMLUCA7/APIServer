import sequelize from "../db.js";

const User = {
  // create new user
  create: async (username, email, hashedPassword) => {
    const [rows] = await sequelize.query(
      "INSERT INTO users (username, email, password) VALUES (:username, :email, :hashedPassword) RETURNING *",
      { replacements: { username, email, hashedPassword } },
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
};

export default User;
