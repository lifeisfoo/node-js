const EventEmitter = require("events");

function getTimeString() {
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds()}`;
    return time;
}

class Clock extends EventEmitter {}

const clock = new Clock();

clock.on("tick", () => {
    console.log(`[1] The clock ticked ${getTimeString()}`);
});
clock.on("tick", () => {
    console.log(`[2] The clock ticked ${getTimeString()}`);
});
clock.on("tick", () => {
    console.log(`[3] The clock ticked ${getTimeString()}`);
});

setInterval(() => {
    clock.emit("tick");
    console.log(`Post tick at ${getTimeString()}`);
}, 1000);
