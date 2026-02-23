const http = require("http");

let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  if (req.method === "GET") {
    if (req.url === "/api/users") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(users));
    } else if (req.url.startsWith("/api/users/")) {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const parts = url.pathname.split("/");
      const id = Number(parts[3]);

      const user = users.find((u) => u.id === id);

      if (user) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(user));
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("User not found");
      }
    }
  } else if (req.method === "POST") {
    if (req.url === "/api/users") {
      users.push({
        id: users.length + 1,
        name: "New User",
        email: "newuser@newuser.com",
      });
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("User created");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  }
});

const port = 3000;
server.listen(port, function () {
  console.log(`Node server created at port ${port}`);
});
