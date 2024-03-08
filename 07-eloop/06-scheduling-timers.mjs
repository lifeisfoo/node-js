setTimeout(() => {
    console.log(`[timeout 0]`);
}, 0);
setImmediate(() => {
    console.log(`[immediate 0]`);
    setTimeout(() => {
        console.log(`[timeout] scheduled from immediate 0`);
    }, 0);
    setImmediate(() => {
        console.log(`[immediate] scheduled from immediate 0`);
    });
    let i = 0;
    while (i < 10000000) {
        i++;
    }
});
