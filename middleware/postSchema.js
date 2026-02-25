// exericse 3
export const postSchema = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 5, maxLength: 100 },
    content: { type: "string", minLength: 10, maxLength: 1000 },
    authorId: { type: "integer" },
  },
  required: ["title", "content", "authorId"],
  additionalProperties: false,
};

// exericse 3
export const commentsSchema = {
  type: "object",
  properties: {
    content: { type: "string", minLength: 5, maxLength: 500 },
    email: { type: "string", format: "email" },
    postId: { type: "integer" },
  },
  required: ["content", "email", "postId"],
  additionalProperties: false,
};
