import { spawn } from "child_process";

const ls = spawn("ls");

ls.stdout.on("data", (data) => {
    console.log(`ls stdout ${data}`);
});
ls.stderr.on("data", (data) => {
    console.error(`ls stderr: ${data}`);
});
ls.on("close", (code) => {
    if (code !== 0) {
        console.log(`ls process exited with code ${code}`);
    }
});
