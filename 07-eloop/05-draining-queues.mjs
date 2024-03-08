setTimeout(() => {
    console.log(`[timeout] 1`);
}, 0);
setImmediate(() => {
    console.log(`[immediate] 1`);
});
setTimeout(() => {
    console.log(`[timeout] 2`);
}, 0);
setImmediate(() => {
    console.log(`[immediate] 2`);
});
setTimeout(() => {
    console.log(`[timeout] 3`);
}, 0);
setImmediate(() => {
    console.log(`[immediate] 3`);
});
