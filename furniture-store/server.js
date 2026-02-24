import express from "express";

const app = express();
const PORT = 3000;

// exercise 1
app.get("/", (req, res) => {
  res.send("Server is up and running smoothly");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
