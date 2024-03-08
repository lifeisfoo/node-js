const http = require("http");

const host = "127.0.0.1";
const port = 3000;

const server = http.createServer({ keepAliveTimeout: 50000 }, (req, res) => {
    res.end("Keeping the connection alive!");
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
