import fs from "fs/promises";

const logFh = await fs.open("./access.log", "a");

async function log(msg) {
    await logFh.write(`${msg}\n`);
}

export { log };
