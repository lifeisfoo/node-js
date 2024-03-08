import fs from "fs/promises";

const logFh = await fs.open("./access.log", "a");
const logStream = logFh.createWriteStream();

const log = function (msg) {
    console.log(msg);
    logStream.write(`${msg}\n`);
};

export { log };
