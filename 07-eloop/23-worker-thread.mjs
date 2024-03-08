import { isMainThread, workerData, Worker, parentPort } from "worker_threads";
import { PRIME_HUGE, isPrime } from "./cpu-intensive.mjs";

if (isMainThread) {
    console.log(`Main thread pid is ${process.pid}`);
    const interval = setInterval(() => {
        console.log(
            `${new Date().toISOString()} - isprime() is still running in a worker thread..`
        );
    }, 1000);
    const worker = new Worker("./23-worker-thread.mjs", {
        workerData: { num: PRIME_HUGE },
    });
    worker.on("message", (result) => {
        console.log(`${PRIME_HUGE} is prime? ${result}`);
        clearInterval(interval);
    });
} else {
    const result = isPrime(workerData.num);
    parentPort.postMessage(result);
    process.exit();
}
