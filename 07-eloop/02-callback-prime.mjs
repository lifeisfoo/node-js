import { PRIME_BIG, isPrime } from "./cpu-intensive.mjs";

function calcPrime(num, cb) {
    const isNumPrime = isPrime(num);
    cb(isNumPrime);
}
console.log("Script started");

calcPrime(PRIME_BIG, (res) => {
    console.log(`${PRIME_BIG} is prime? ${res}`);
});

console.log("Script ended");
