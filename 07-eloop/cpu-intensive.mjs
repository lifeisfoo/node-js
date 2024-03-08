function isPrime(num) {
    if (num < 2) {
        return false;
    }
    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

function factorial(n) {
    return n != 1 ? n * factorial(n - 1) : 1;
}

const PRIME_SMALL = 65537;
const PRIME_MED = 999331;
const PRIME_BIG = 39916801;
const PRIME_HUGE = 2971215073;
const PRIME_ENOR = 87178291199;

function isPrimeAsync(num, cb) {
    process.nextTick(() => {
        if (num < 2) {
            return cb(false);
        }
        isPrimeRecursive(num, 2, cb);
    });
}

function isPrimeRecursive(n, i, cb) {
    if (i >= n) {
        return cb(true);
    }
    if (n % i === 0) {
        return cb(false);
    }
    setImmediate(isPrimeRecursive.bind(null, n, i + 1, cb));
}

export {
    isPrime,
    factorial,
    PRIME_SMALL,
    PRIME_MED,
    PRIME_BIG,
    PRIME_HUGE,
    PRIME_ENOR,
    isPrimeAsync,
};
