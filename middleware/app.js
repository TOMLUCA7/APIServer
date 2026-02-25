import express from "express";

const app = express();
const PORT = 3000;

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

// exericse 1
app.use(requestCounter);

// exericse 1
app.get("/", (req, res) => {
  res.send({ message: "Welcome!", requestCount: req.requestCount });
});

app.post("/about", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
