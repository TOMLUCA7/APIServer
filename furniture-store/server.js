import express from "express";

const app = express();
const PORT = 3000;

// exericse 2
const store = [
  { name: "table", inventory: 3, price: 800 },
  { name: "chair", inventory: 16, price: 120 },
  { name: "couch", inventory: 1, price: 1200 },
  { name: "picture frame", inventory: 31, price: 70 },
];

// exercise 1
app.get("/", (req, res) => {
  res.send("Server is up and running smoothly");
});

// exericse 6
app.get("/sale", (req, res) => {
  const isAdmin = req.query.admin === "true";
  if (isAdmin) {
    res.send(store.inventory > 10 && store.price / 2);
  } else {
    res.status(403).send({ error: "Not authorized" });
  }
});

// exercise 2
app.get("/priceCheck/:name", (req, res) => {
  const name = req.params.name;
  const item = store.find((i) => i.name === name);

  if (item) {
    res.send({ price: item.price });
  } else {
    res.status(404).send({ error: "Item not found" });
  }
});

// exercise 4
app.get("/buy/:name", (req, res) => {
  const name = req.params.name;
  const item = store.find((i) => i.name === name);

  if (item.inventory > 0) {
    item.inventory -= 1;
    res.send(item);
  } else {
    res.status(404).send({ error: "Item out of stock" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
