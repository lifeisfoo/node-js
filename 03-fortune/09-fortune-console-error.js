const fs = require("fs");

const QUOTES_DIR = "./data";

fs.readdir(QUOTES_DIR, (err, files) => {
    if (err) {
        console.error(`Error while reading ${QUOTES_DIR} directory`);
        process.exitCode = 1;
        return;
    }

    const randomIdx = Math.floor(Math.random() * files.length);
    const quoteFile = `${QUOTES_DIR}/${files[randomIdx]}`;

    fs.readFile(quoteFile, "utf-8", (err, data) => {
        if (err) {
            console.error(`Error while reading ${quoteFile} file`);
            process.exitCode = 1;
            return;
        }
        console.log(data.toString());
    });
});
