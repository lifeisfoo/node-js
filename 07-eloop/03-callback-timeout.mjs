import { PRIME_BIG, isPrime } from "./cpu-intensive.mjs";

function calcPrime(num, cb) {
    setTimeout(() => {
        const isNumPrime = isPrime(num);
        cb(isNumPrime);
    }, 1000);
}
console.log("Script started");

calcPrime(PRIME_BIG, (res) => {
    console.log(`${PRIME_BIG} is prime? ${res}`);
});

console.log("Script ended (?)");
