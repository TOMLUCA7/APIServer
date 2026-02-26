import fs from "fs";
import nanoid from "nanoid";

import { recipes } from "../data/recipes.js";

const getRecipes = async () => {
  try {
    const data = await fs.promises.readFile("../data/recipes.js");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};
