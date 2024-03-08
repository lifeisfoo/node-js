import http from "http";
import fs from "fs/promises";

const host = "127.0.0.1";
const port = 3000;
const root = "files";

const server = http.createServer();
server.on("request", async (req, res) => {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    const file = `${root}${pathname}`;
    console.log(`Requested ${file} file`);
    try {
        const data = await fs.readFile(file);
        res.end(data);
    } catch (e) {
        console.error(e);
        res.statusCode = 404;
        res.end();
    }
});

server.listen(port, host, () => {
    console.log(`Web server running at http://${host}:${port}/`);
});
