import http from "http";
import process, { hrtime } from "process";
import { generateLogString } from "./eloop-utils.mjs";
import { isPrime } from "./cpu-intensive.mjs";
import { Worker, isMainThread, parentPort } from "worker_threads";
import { availableParallelism } from "os";

const numCPUs = availableParallelism();

if (isMainThread) {
    const workerPool = [];
    for (let i = 0; i < numCPUs; i++) {
        workerPool.push(new Worker("./25-http-prime-workers-pool.mjs"));
    }
    console.log(`Created ${workerPool.length} worker threads`);

    const server = http.createServer();
    server.on("request", (req, res) => {
        const startTime = hrtime.bigint();

        const { searchParams, pathname } = new URL(
            req.url,
            `http://${req.headers.host}`
        );
        const num = parseInt(searchParams.get("num"));
        res.on("finish", () => {
            console.log(generateLogString(req, res, pathname, startTime));
        });

        const wk = workerPool.pop();
        if (wk) {
            const listener = (result) => {
                wk.off("message", listener);
                workerPool.push(wk);
                res.end(`${num} is prime? ${result}`);
            };
            wk.on("message", listener);
            wk.postMessage(num);
        } else {
            res.statusCode = 503;
            res.end();
        }
    });
    server.listen(3000);
    console.log(`Main thread (server) started with pid ${process.pid}`);
} else {
    parentPort.on("message", (msg) => {
        const result = isPrime(msg);
        parentPort.postMessage(result);
    });
}
