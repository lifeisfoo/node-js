import { readFileLines, encoding } from "./modules/read-file-lines.mjs";

const file = process.argv[2];
const lines = await readFileLines(file);
console.log(`${file} (${encoding}) is ${lines.length} lines long`);
