import express from "express";

const app = express();
const PORT = 3000;

app.get("/sanity", (req, res) => {
  res.status(200).send("Server is up and running");
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
