function debugFactory(tag) {
    const enabled = process.env.DEBUG;

    function debug(msg) {
        if (!enabled) {
            return;
        }
        console.log(`[${tag}] ${msg}`);
    }
    return debug;
}
module.exports = debugFactory;
