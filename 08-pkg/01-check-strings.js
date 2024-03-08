const { isString } = require("./modules/is-string");

const toCheck = [
    "a string",
    2,
    { prop: "I'm an object" },
    function () {},
    true,
];

for (const str of toCheck) {
    console.log(isString(str));
}
