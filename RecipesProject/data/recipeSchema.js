const recipeSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string", minLength: 3, maxLength: 100 },
    description: { type: "string", minLength: 10, maxLength: 500 },
    ingredients: {
      type: "array",
      items: { type: "string" },
      minItems: 1,
      uniqueItems: true,
    },
    instructions: {
      type: "array",
      items: { type: "string" },
      minItems: 1,
      uniqueItems: true,
    },
    cookingTime: { type: "number", minimum: 1, maximum: 1000 },
    servings: { type: "number", minimum: 1, maximum: 1000 },
    difficulty: { type: "string", enum: ["easy", "medium", "hard"] },
    rating: { type: "number", minimum: 1, maximum: 5 },
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
