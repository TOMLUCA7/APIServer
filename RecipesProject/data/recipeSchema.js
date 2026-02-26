const recipeSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string", maxLength: 30 },
    description: { type: "string", maxLength: 500 },
    ingredients: { type: "array", items: { type: "string" } },
    instructions: { type: "array", items: { type: "string" } },
    cookingTime: { type: "number" },
    servings: { type: "number" },
    difficulty: { type: "string" },
    rating: { type: "number" },
    createdAt: { type: "string", format: "date-time" },
  },
  required: [
    "title",
    "description",
    "ingredients",
    "instructions",
    "cookingTime",
    "servings",
    "difficulty",
    "rating",
  ],
  additionalProperties: false,
};

export default recipeSchema;
