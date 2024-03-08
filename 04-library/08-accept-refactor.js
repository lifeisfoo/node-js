const http = require("http");
const { getAcceptedTypes, resText, resJson } = require("./utils");

const host = "127.0.0.1";
const port = 3000;

const data = {
    json: JSON.stringify({ message: "Benvenuto nella biblioteca HTTP" }),
    text: "Benvenuto nella biblioteca HTTP",
};
const server = http.createServer((req, res) => {
    const accepts = getAcceptedTypes(req);
    if (accepts.json) {
        resJson(res, data.json);
    } else if (accepts.textPlain || accepts.text || accepts.any) {
        resText(res, data.text);
    } else {
        res.statusCode = 406;
        res.end();
    }
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
