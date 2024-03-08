import fs from "fs/promises";

const fh = await fs.open("06-stream-flowing-paused.mjs");
const fileStream = fh.createReadStream();

console.log(`Is Readable flowing? ${fileStream.readableFlowing}`);
console.log("Waiting 2 seconds before adding the data event listener...");

setTimeout(() => {
    console.log(`Is Readable flowing? ${fileStream.readableFlowing}`);
    fileStream.on("data", (chunk) => console.log(chunk));
    console.log(`Is Readable flowing? ${fileStream.readableFlowing}`);
}, 2000);
