const http = require("http");

const server = http.createServer((req, res) => {
    res.end("Benvenuto nella biblioteca HTTP");
});

server.listen(3000, () => {
    console.log("Server running");
});
