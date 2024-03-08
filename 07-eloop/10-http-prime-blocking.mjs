import http from "http";
import { isPrime } from "./cpu-intensive.mjs";
import { generateLogString } from "./eloop-utils.mjs";
import { hrtime } from "process";

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

    const primeRes = isPrime(num);

    res.end(`${num} is prime? ${primeRes}`);
});

server.listen(3000, "127.0.0.1", () => {
    console.log(`Web server running`);
});
