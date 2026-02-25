import express from "express";
import { body, validationResult } from "express-validator";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { postSchema, commentsSchema } from "./postSchema.js";
const ajv = new Ajv();
addFormats(ajv);

const app = express();
const PORT = 3000;

const resources = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];

const posts = [
  { id: 1, title: "Post 1", content: "Content 1", authorId: 1 },
  { id: 2, title: "Post 2", content: "Content 2", authorId: 2 },
];

app.use(express.json());

// exericse 1, logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  console.log(`[${timestamp}] ${method} ${url}`);
  next();
});

// exericse 1
let totalRequests = 0;

// exericse 1
const requestCounter = (req, res, next) => {
  totalRequests++;
  req.requestCount = totalRequests;

  console.log(`Request #${req.requestCount}: ${req.method} ${req.url}`);

  next();
};

// exericse 2
const validateId = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (!id) {
    const error = new Error("Invalid ID: must be a number");
    error.status = 400;
    return next(error);
  }
  next();
};

// exericse 3
const validatePost = (req, res, next) => {
  const validate = ajv.compile(postSchema);
  if (!validate(req.body)) {
    return res.status(400).json({ errors: validate.errors });
  }
  next();
};

// exericse 2
const checkIdExists = (req, res, next) => {
  const id = parseInt(req.params.id);
  const resource = resources.find((r) => r.id === id);
  if (!resource) {
    const error = new Error("ID not found");
    error.status = 404;
    return next(error);
  }
  req.resource = resource;
  next();
};

// exericse 1
app.use(requestCounter);

// exericse 1
app.get("/", (req, res) => {
  res.send({ message: "Welcome!", requestCount: req.requestCount });
});

// exericse 1
app.post("/about", (req, res) => {});

// exericse 2
app.get("/users", (req, res) => {
  res.send(resources);
});

// exericse 2
app.post("/users", (req, res) => {
  const { id, name } = req.body;
  if (!id || typeof id !== "number") {
    res.status(400).send({ message: "Invalid ID: must be a number" });
    return;
  }
  const newUser = { id: resources.length + 1, name };
  resources.push(newUser);
  res.status(201).send(newUser);
});

// exericse 3 - AJV validation
app.post("/posts", validatePost, (req, res) => {
  res
    .status(201)
    .json({ message: "Post created successfully", data: req.body });
});

// exericse 3
app.get("/posts", (req, res) => {
  res.send(posts);
});

// exericse 3
const validateComment = (req, res, next) => {
  const validate = ajv.compile(commentsSchema);
  if (!validate(req.body)) {
    return res.status(400).json({ errors: validate.errors });
  }
  next();
};

// exericse 3
app.post("/comments", validateComment, (req, res) => {
  res.status(201).json({ message: "Comment added", data: req.body });
});

// exericse 2
app.get("/users/:id", validateId, checkIdExists, (req, res) => {
  res.send(req.resource);
});

// POST /posts/:postId/comments
app.post("/posts/:postId/comments", (req, res) => {
  res.status(201).json({ message: "Comment added", data: req.body });
});
// exericse 2
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message || "Internal Server Error",
      status: status,
    },
  });
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
