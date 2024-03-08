import fs from "fs/promises";

const QUOTES_DIR = process.argv[2];

try {
    const files = await fs.readdir(QUOTES_DIR, { withFileTypes: true });
    const txtFiles = files
        .filter((f) => f.isFile() && f.name.endsWith(".txt"))
        .map((f) => f.name);

    const randomIdx = Math.floor(Math.random() * txtFiles.length);
    const quoteFile = `${QUOTES_DIR}/${txtFiles[randomIdx]}`;

    const data = await fs.readFile(quoteFile, "utf-8");
    console.log(data.toString());
} catch (err) {
    console.error(`Error: ${err.message}`);
    process.exitCode = 1;
}
