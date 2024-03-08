import { readFile } from "node:fs/promises";
const encoding = "utf-8";
const separator = "\n";

async function readFileLines(filePath, sep = separator, enc = encoding) {
    const fileContent = await readFile(filePath, { encoding: enc });
    const lines = fileContent.split(sep);
    return lines;
}

export { readFileLines, separator, encoding };
export default readFileLines;
