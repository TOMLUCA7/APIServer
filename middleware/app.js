import express from "express";

const app = express();
const PORT = 3000;

const resources = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
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
  const newUser = { id, name };
  resources.push(newUser);
  res.status(201).send(newUser);
});

// exericse 2
app.get("/users/:id", validateId, checkIdExists, (req, res) => {
  res.send(req.resource);
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
