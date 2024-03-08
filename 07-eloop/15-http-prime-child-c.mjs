import http from "http";
import { generateLogString } from "./eloop-utils.mjs";
import { hrtime } from "process";
import { exec } from "child_process";

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

    exec(`./isprime ${num}`, (error, stdout, stderr) => {
        if (error) {
            res.end(`${num} is prime? false`);
        } else {
            res.end(`${num} is prime? true`);
        }
    });
});

server.listen(3000, "127.0.0.1", () => {
    console.log(`Web server running`);
});
