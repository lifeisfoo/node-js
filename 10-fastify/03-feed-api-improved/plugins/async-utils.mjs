async function asyncUtils(fastify, opts) {
    fastify.decorate("waitAndCountFulfilled", async function (proms) {
        const promsSettled = await Promise.allSettled(proms);
        return promsSettled.filter((r) => r.status === "fulfilled").length;
    });
}

asyncUtils[Symbol.for("skip-override")] = true;
export default asyncUtils;
