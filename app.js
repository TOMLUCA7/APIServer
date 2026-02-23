const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);

  if (req.method === "GET") {
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Welcome to my server!");
    } else if (req.url === "/about") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("About page");
    } else if (req.url === "/contact") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Contact page");
    } else {
      console.log("404");
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Page not found");
    }
  } else {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method Not Allowed");
  }
});

// const port = 3000;
// server.listen(port, function () {
//   console.log(`Node server created at port ${port}`);
// });
