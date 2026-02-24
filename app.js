const express = require("express");
const app = express();
const port = 3000;

// Enable JSON body parsing for POST requests
app.use(express.json());

let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.get("/contact", (req, res) => {
  res.send("Contact page");
});

// User API Routes
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

app.post("/api/users", (req, res) => {
  users.push({
    id: users.length + 1,
    name: "New User",
    email: "newuser@newuser.com",
  });
  res.send("User created");
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
