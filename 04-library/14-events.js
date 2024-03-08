const http = require("http");

const host = "127.0.0.1";
const port = 3000;

const server = http.createServer({ keepAliveTimeout: 50000 });
server.on("connection", () => console.log("connection"));
server.on("request", (req, res) => {
    console.log("request");
    res.end("Hello from the server");
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
