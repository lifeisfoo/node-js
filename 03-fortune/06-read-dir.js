const fs = require("fs");

fs.readdir("./data", (err, files) => {
    if (err) {
        console.log("Error while reading data directory");
        return;
    }
    console.log(files);
});
