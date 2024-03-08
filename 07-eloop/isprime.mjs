#!/usr/bin/env node
import { isPrime } from "./cpu-intensive.mjs";

const num = parseInt(process.argv[2]);
if (isNaN(num)) {
    console.error(`${num} is not a number`);
    process.exit(2);
}

if (isPrime(num)) {
    console.log(`${num} is prime`);
    process.exit(0);
} else {
    console.log(`${num} is not prime`);
    process.exit(1);
}
