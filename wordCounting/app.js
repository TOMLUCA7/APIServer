import express from "express";

const app = express();
const PORT = 3000;

const wordCounter = {
  hello: 1,
  world: 2,
};

app.use(express.json());

// exericse 1
app.get("/sanity", (req, res) => {
  res.status(200).send("Server is up and running");
});

// exericse 2
app.get("/words/:word", (req, res) => {
  const word = req.params.word;

  if (wordCounter[word]) {
    res.send({ count: wordCounter[word] });
  } else {
    res.send({ count: 0 });
  }
});

// exericse 3
app.post("/words", (req, res) => {
  const word = req.body.word;

  if (!word) {
    return res.status(400).send({ error: "Missing 'word' in request body" });
  }

  if (wordCounter[word]) {
    wordCounter[word] += 1;
  } else {
    wordCounter[word] = 1;
  }

  res.send({ text: `Added ${word}`, currentCount: wordCounter[word] });
});

// exericse 4
app.post("/words/:sentence", (req, res) => {
  const sentence = req.params.sentence;
  const SplitSentenceToWords = sentence.split(" ");
  let numNewWords = 0;
  let numOldWords = 0;
  for (const word of SplitSentenceToWords) {
    if (wordCounter[word]) {
      wordCounter[word] += 1;
      numOldWords += 1;
    } else {
      wordCounter[word] = 1;
      numNewWords += 1;
    }
  }
  res.send({
    text: `Added ${numNewWords} words, ${numOldWords} already existed`,
    currentCount: wordCounter,
  });
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
