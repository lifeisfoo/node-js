import { PRIME_MED, isPrimeAsync } from "./cpu-intensive.mjs";
import { hrtime } from "process";

let lastTime = hrtime.bigint();
const interval = setInterval(() => {
    const now = hrtime.bigint();
    const duration = (now - lastTime) / BigInt(1e6);
    console.log(`[interval] ${duration}ms passed since last one`);
}, 500);

isPrimeAsync(PRIME_MED, function (res) {
    console.log(`${PRIME_MED} is prime? ${res}`);
    clearInterval(interval);
});
