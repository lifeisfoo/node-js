const EventEmitter = require("events");

function getTimeString() {
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds()}`;
    return time;
}

class Clock extends EventEmitter {}
const clock = new Clock({ captureRejections: true });

clock.on("tick", async () => {
    throw new Error("Broken listener");
});
clock.on("error", (err) => console.log(`Got ${err}`));

setInterval(() => {
    clock.emit("tick");
    console.log(`Post tick at ${getTimeString()}`);
}, 1000);
