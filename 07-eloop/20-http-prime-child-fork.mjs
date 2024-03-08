import http from "http";
import { generateLogString } from "./eloop-utils.mjs";
import { hrtime } from "process";
import { fork } from "child_process";

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

    const child = fork("isprime-child.mjs");
    child.send(num);
    child.on("message", (result) => {
        if (result) {
            res.end(`${num} is prime? true`);
        } else {
            res.end(`${num} is prime? false`);
        }
    });
});

server.listen(3000, "127.0.0.1", () => {
    console.log(`Web server running`);
});
