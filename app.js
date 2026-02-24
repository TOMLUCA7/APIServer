const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.get("/contact", (req, res) => {
  res.send("Contact page");
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});

// server.listen(port, function () {
//   console.log(`Node server created at port ${port}`);
// });
