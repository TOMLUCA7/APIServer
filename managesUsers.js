const express = require("express");
const app = express();
const port = 3000;

let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

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

app.listen(port, () => {
  console.log(`User API running at http://localhost:${port}`);
});
