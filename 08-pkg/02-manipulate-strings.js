const { urlify } = require("./modules/string-utils");
const { inspect } = require("util");

const songs = [
    "Guerrilla Radio",
    "Killing in the name",
    "Bullet in the head",
    null,
];

for (const s of songs) {
    try {
        console.log(`${s} -> ${urlify(s)}`);
    } catch (e) {
        console.error(`Skipped non string value: ${inspect(s)}`);
    }
}
