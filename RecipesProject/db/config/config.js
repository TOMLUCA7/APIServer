import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    use_env_variable: process.env.DB_CONNECTION,
    dialect: "postgres",
  },
  test: {
    use_env_variable: process.env.DB_CONNECTION,
    dialect: "postgres",
  },
  production: {
    use_env_variable: process.env.DB_CONNECTION,
    dialect: "postgres",
  },
};
