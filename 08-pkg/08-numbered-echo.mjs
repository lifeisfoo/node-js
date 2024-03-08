import { readFileLines } from "./modules/read-file-lines.mjs";
import printLines from "./modules/print-lines-numbers.mjs";

const file = process.argv[2];
const lines = await readFileLines(file);
printLines(lines);
