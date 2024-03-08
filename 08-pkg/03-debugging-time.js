const debug = require("./modules/debug")("03");

debug(`Script started at ${new Date().toISOString()}`);
setTimeout(() => {
    // doing something...

    debug(`Script ended at ${new Date().toISOString()}`);
}, 1000);
