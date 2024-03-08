import http from "http";
import { generateLogString } from "./eloop-utils.mjs";
import { hrtime } from "process";
import { spawn } from "child_process";

const server = http.createServer();
server.on("request", async (req, res) => {
    const startTime = hrtime.bigint();

    const { searchParams, pathname } = new URL(
        req.url,
        `http://${req.headers.host}`
    );
    const num = parseInt(searchParams.get("num"));
    res.on("finish", () => {
        console.log(generateLogString(req, res, pathname, startTime));
    });

    const proc = spawn("node", ["isprime.mjs", num]);
    proc.on("close", (code) => {
        if (code !== 0) {
            res.end(`${num} is prime? false`);
        } else {
            res.end(`${num} is prime? true`);
        }
    });
});

server.listen(3000, "127.0.0.1", () => {
    console.log(`Web server running`);
});
