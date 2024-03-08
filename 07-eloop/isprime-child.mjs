import { isPrime } from "./cpu-intensive.mjs";

process.on("message", (msg) => {
    const result = isPrime(msg);
    process.send(result);
    process.exit();
});
