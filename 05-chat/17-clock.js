const EventEmitter = require("events");

function getTimeString() {
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds()}`;
    return time;
}

class Clock extends EventEmitter {}

const clock = new Clock();

clock.on("tick", () => {
    console.log(`The clock ticked: ${getTimeString()}`);
});

setInterval(() => {
    clock.emit("tick");
}, 1000);
