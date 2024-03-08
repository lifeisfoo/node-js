import cluster from "cluster";
import http from "http";
import { availableParallelism } from "os";
import process, { hrtime } from "process";
import { generateLogString } from "./eloop-utils.mjs";
import { isPrime } from "./cpu-intensive.mjs";

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code) => {
        console.log(`worker ${worker.process.pid} exited with code ${code}`);
    });
} else {
    const server = http.createServer();
    server.on("request", (req, res) => {
        const startTime = hrtime.bigint();

        const { searchParams, pathname } = new URL(
            req.url,
            `http://${req.headers.host}`
        );
        const num = parseInt(searchParams.get("num"));
        res.on("finish", () => {
            const logMsg = generateLogString(req, res, pathname, startTime);
            console.log(`${process.pid} - ${logMsg}`);
        });

        const primeRes = isPrime(num);
        res.end(`${num} is prime? ${primeRes}`);
    });
    server.listen(3000);

    console.log(`Worker ${process.pid} started`);
}
