import express from "express";

const app = express();
const PORT = 3000;

const resources = [1, 2, 3, 4, 5];

app.use(express.json());

// exericse 1, logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  console.log(`[${timestamp}] ${method} ${url}`);
  next();
});

app.use;

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
  if (!resources.includes(id)) {
    const error = new Error("ID not found");
    error.status = 404;
    return next(error);
  }
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
  res.send({ id: resources, name: `User ${resources}` });
});

app.post("/users", (req, res) => {
  const id = req.body.id;
  if (!id) {
    res.status(400).send({ message: "Invalid ID: must be a number" });
    return;
  }
  resources.push(id);
  res.send({ id, name: `User ${id}` });
});

// exericse 2
app.get("/users/:id", validateId, checkIdExists, (req, res) => {
  const id = parseInt(req.params.id);
  res.send({ id, name: `User ${id}` });
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
