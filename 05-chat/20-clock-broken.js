const EventEmitter = require("events");

function getTimeString() {
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds()}`;
    return time;
}

class Clock extends EventEmitter {}
const clock = new Clock();

clock.on("tick", () => {
    console.log(`The clock ticked ${getTimeString()}`);
});
clock.on("error", (err) => console.log(`Got ${err}`));

setInterval(() => {
    clock.emit("tick");
    console.log(`Post tick at ${getTimeString()}`);
}, 1000);

setTimeout(() => {
    clock.emit("error", new Error("An error"));
}, 3000);
