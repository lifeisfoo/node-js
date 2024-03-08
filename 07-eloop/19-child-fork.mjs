import { fork } from "child_process";
import { PRIME_HUGE } from "./cpu-intensive.mjs";

const interval = setInterval(() => {
    console.log(
        `${new Date().toISOString()} - isprime() is still running in another process..`
    );
}, 1000);

const child = fork("isprime-child.mjs");
child.send(PRIME_HUGE);
child.on("message", (result) => {
    console.log(`${PRIME_HUGE} is prime? ${result}`);
    clearInterval(interval);
});
