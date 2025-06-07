import { spawn } from "child_process";

const ls = spawn("ls", ["*.mjs"], { shell: true }); // https://nodejs.org/api/deprecations.html#DEP0190
const grep = spawn("grep", ["http"]);

ls.stdout.on("data", (data) => {
    grep.stdin.write(data);
});

ls.stderr.on("data", (data) => {
    console.error(`ls stderr: ${data}`);
});

ls.on("close", (code) => {
    if (code !== 0) {
        console.log(`ls process exited with code ${code}`);
    }
    grep.stdin.end();
});

grep.stdout.on("data", (data) => {
    console.log(data.toString());
});

grep.stderr.on("data", (data) => {
    console.error(`grep stderr: ${data}`);
});

grep.on("close", (code) => {
    if (code !== 0) {
        console.log(`grep process exited with code ${code}`);
    }
});
