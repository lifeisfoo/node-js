import { isPrime } from "./cpu-intensive.mjs";
import { parentPort } from "worker_threads";

parentPort.on("message", (msg) => {
    const result = isPrime(msg);
    parentPort.postMessage(result);
});
