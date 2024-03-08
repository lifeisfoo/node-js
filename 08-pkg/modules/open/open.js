const process = require("process");
const childProcess = require("child_process");
const { isString } = require("../is-string");
const debug = require("../debug")("open");

const { platform } = process;

const platformCmds = {
    darwin: "open",
    linux: "xdg-open",
    win32: "powershell.exe /c start",
};

debug("platform is " + platform);

function open(target) {
    if (!isString(target)) {
        throw new TypeError("A target is required");
    }
    debug("target resource is " + target);

    const command = platformCmds[platform];
    if (!command) {
        throw new Error(`${platform} is not supported.`);
    }

    const childProcessOptions = {
        stdio: "ignore",
        detached: true,
    };

    const spawnedProc = childProcess.spawn(
        command,
        [target],
        childProcessOptions
    );

    spawnedProc.unref();
    debug(`Spawned process PID is ${spawnedProc.pid}`);
    return spawnedProc;
}

module.exports = open;
