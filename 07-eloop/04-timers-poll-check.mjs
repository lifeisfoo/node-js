import fs from "fs";
import { isPrime } from "./cpu-intensive.mjs";

console.log("running the script...");

fs.readFile("./number.txt", { encoding: "utf-8" }, (err, data) => {
    const numToCheck = Number.parseInt(data);
    console.log(`Number to check: ${numToCheck}`);

    const primeRes = isPrime(numToCheck);

    setTimeout(() => {
        console.log(`[timeout] ${numToCheck} is prime? ${primeRes}`);
    }, 0);
    setImmediate(() => {
        console.log(`[immediate] ${numToCheck} is prime? ${primeRes}`);
    });
});
