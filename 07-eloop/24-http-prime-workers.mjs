import http from "http";
import process, { hrtime } from "process";
import { generateLogString } from "./eloop-utils.mjs";
import { isPrime } from "./cpu-intensive.mjs";
import { Worker, isMainThread, parentPort, workerData } from "worker_threads";

if (isMainThread) {
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

        const worker = new Worker("./24-http-prime-workers.mjs", {
            workerData: { num: num },
        });
        worker.on("message", (result) => {
            res.end(`${num} is prime? ${result}`);
        });
    });
    server.listen(3000);

    console.log(`Main thread (server) started with pid ${process.pid}`);
} else {
    const result = isPrime(workerData.num);
    parentPort.postMessage(result);
    process.exit();
}
