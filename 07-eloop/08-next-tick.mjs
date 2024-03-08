setImmediate(() => {
    console.log("first immediate");
    Promise.resolve()
        .then(() => {
            console.log("then 1");
            return;
        })
        .then(() => {
            console.log("then 2");
        });
    queueMicrotask(() => {
        console.log("queueMicrotask");
    });
    process.nextTick(() => {
        console.log("next tick");
    });
});
setImmediate(() => {
    console.log("last immediate");
});
