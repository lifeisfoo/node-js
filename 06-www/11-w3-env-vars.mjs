import http from "http";
import fs from "fs/promises";
import mimeMap from "./media-types.mjs";
import { extname } from "path";
import { log } from "./logger.mjs";
import { createGzip } from "zlib";
import { hrtime } from "process";
import { exitIfNotDir } from "./w3-utils.mjs";

const host = process.env.WEB_HOST || "127.0.0.1";
const port = process.env.WEB_PORT || 3000;
const root = process.env.WEB_ROOT || "files";

await exitIfNotDir(root);

const server = http.createServer();
server.on("request", async (req, res) => {
    const startTime = hrtime.bigint();

    const [isGET, isHEAD] = [req.method === "GET", req.method === "HEAD"];
    if (!isGET && !isHEAD) {
        res.statusCode = 405;
        res.end();
        return;
    }

    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    const file = `${root}${pathname}`;

    res.on("finish", () => {
        const endTime = hrtime.bigint();
        const duration = (endTime - startTime) / BigInt(1e6);
        const timestamp = new Date().toISOString();
        const ip = req.socket.remoteAddress;
        const httpDetails = `"${req.method} ${pathname}" ${res.statusCode}`;
        log(`${ip} - ${timestamp} ${httpDetails} - ${duration}ms`);
    });

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

    res.setHeader("Content-Encoding", "gzip");
    const fileStream = fh.createReadStream();
    const gzipTransform = createGzip();
    const handleStreamError = (err) => {
        console.error(err);
        fileStream.destroy();
        gzipTransform.destroy();
        res.statusCode = 500;
    };
    fileStream
        .on("error", handleStreamError)
        .pipe(gzipTransform)
        .on("error", handleStreamError)
        .pipe(res);
});

server.listen(port, host, () => {
    console.log(`Web server running at http://${host}:${port}/`);
});
