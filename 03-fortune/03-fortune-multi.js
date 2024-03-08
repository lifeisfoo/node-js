const quotes = [
  `Any app that can be written in JavaScript,
  will eventually be written in JavaScript.
                              -- Jeff Atwood.
  `,
  `JavaScript is the only language that I'm aware of
  that people feel they don't need to learn before
  they start using it.
                              -- Douglas Crockford
  `,
  `Code never lies, comments sometimes do.
                              -- Anonymous
  `,
];

const randomIdx = Math.floor(Math.random() * quotes.length);

console.log(quotes[randomIdx]);
