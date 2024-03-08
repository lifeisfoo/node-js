const quotes = require("./quotes.json");

const randomIdx = Math.floor(Math.random() * quotes.length);

console.log(quotes[randomIdx]);
