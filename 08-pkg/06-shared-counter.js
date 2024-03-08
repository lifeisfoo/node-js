const counter1 = require("./modules/shared-counter");
const counter2 = require("./modules/shared-counter");

counter1.inc();
counter2.inc();

console.log(counter1.val());
