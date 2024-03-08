import { execFile } from "child_process";

execFile("node", ["isprime.mjs", 3], (error, stdout, stderr) => {
    if (error) {
        console.log("The number is NOT prime");
    } else {
        console.log("The number is prime");
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});
