import { PRIME_HUGE, isPrime } from "./cpu-intensive.mjs";
import { fork } from "child_process";

if (process.argv[2] === "child") {
    process.on("message", (msg) => {
        const result = isPrime(msg);
        process.send(result);
        process.exit();
    });
} else {
    const interval = setInterval(() => {
        console.log(
            `${new Date().toISOString()} - isprime() is still running in another process..`
        );
    }, 1000);
    const child = fork("21-self-fork.mjs", ["child"]);
    child.send(PRIME_HUGE);
    child.on("message", (result) => {
        console.log(`${PRIME_HUGE} is prime? ${result}`);
        clearInterval(interval);
    });
}
