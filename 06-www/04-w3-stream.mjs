import http from "http";
import fs from "fs/promises";
import mimeMap from "./media-types.mjs";
import { extname } from "path";

const host = "127.0.0.1";
const port = 3000;
const root = "files";

const server = http.createServer();
server.on("request", async (req, res) => {
    const [isGET, isHEAD] = [req.method === "GET", req.method === "HEAD"];
    if (!isGET && !isHEAD) {
        res.statusCode = 405;
        res.end();
        return;
    }

    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    const file = `${root}${pathname}`;
    console.log(`Requested ${file} file`);

    let fh;
    try {
        fh = await fs.open(file);
    } catch (e) {
        console.error(e);
        res.statusCode = 404;
        res.end();
        return;
    }

    const mimeType = mimeMap.get(extname(pathname));
    if (mimeType) {
        res.setHeader("Content-Type", mimeType);
    }

    if (isHEAD) {
        const fileStat = await fh.stat();
        res.setHeader("Content-Length", fileStat.size);
        res.statusCode = 200;
        res.end();
        await fh.close();
        return;
    }

    const fileStream = fh.createReadStream();
    fileStream.on("data", (chunk) => res.write(chunk));
    fileStream.on("end", () => res.end());
    fileStream.on("error", (e) => {
        console.error(e);
        res.statusCode = 500;
        res.end();
    });
});

server.listen(port, host, () => {
    console.log(`Web server running at http://${host}:${port}/`);
});
