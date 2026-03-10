import Ajv from "ajv";
import addFormats from "ajv-formats";
import recipeSchema from "../data/recipeSchema.js";

const ajv = new Ajv();
addFormats(ajv);
const validateRecipe = ajv.compile(recipeSchema);

function recipeValidation(req, res, next) {
  const recipe = { ...req.body };

  // Convert types for multipart/form-data
  if (typeof recipe.cookingTime === "string")
    recipe.cookingTime = Number(recipe.cookingTime);
  if (typeof recipe.servings === "string")
    recipe.servings = Number(recipe.servings);
  if (typeof recipe.ingredients === "string") {
    try {
      recipe.ingredients = JSON.parse(recipe.ingredients);
    } catch (e) {}
  }
  if (typeof recipe.instructions === "string") {
    try {
      recipe.instructions = JSON.parse(recipe.instructions);
    } catch (e) {}
  }

  const valid = validateRecipe(recipe);
  if (valid) {
    next();
  } else {
    const error = new Error("Recipe Validation Error");
    error.status = 400;
    error.message = validateRecipe.errors[0].message;
    next(error);
  }
}

export default { recipeValidation };
