const http = require("http");

const host = "127.0.0.1";
const port = 3000;

function resJson(res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Benvenuto nella biblioteca HTTP" }));
}

function resText(res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Benvenuto nella biblioteca HTTP");
}

const server = http.createServer((req, res) => {
    const acceptJson = req.headers.accept === "application/json";
    const acceptText = req.headers.accept === "text/plain";
    const acceptAnyText = req.headers.accept === "text/*";
    const acceptAnyType = req.headers.accept === "*/*";

    if (acceptJson) {
        resJson(res);
    } else if (acceptText || acceptAnyText || acceptAnyType) {
        resText(res);
    } else {
        res.statusCode = 406;
        res.end();
    }
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
