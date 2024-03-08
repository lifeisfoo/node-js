import { exec } from "child_process";

exec("./isprime.mjs 3", (error, stdout, stderr) => {
    if (error) {
        console.log("The number is NOT prime");
    } else {
        console.log("The number is prime");
    }
});
