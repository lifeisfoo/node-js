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
    // ["text/html", "application/xml;q=0.9", ...]
    const acceptList = req.headers.accept.split(",");
    // ["text/html", "application/xml", ...]
    const acceptedTypes = acceptList.map((a) => a.split(";")[0]);

    const acceptJson = acceptedTypes.includes("application/json");
    const acceptText = acceptedTypes.includes("text/plain");
    const acceptAnyText = acceptedTypes.includes("text/*");
    const acceptAnyType = acceptedTypes.includes("*/*");

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
